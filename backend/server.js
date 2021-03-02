import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import colors from "colors";
import db from "./config/db.js";
import errorHandler from "./middleware/errorHandler.js";

// Route Files
import productRoutes from "./routes/products.js";
import usersRoutes from "./routes/users.js";
import orderRoutes from "./routes/orders.js";
import uploadRoutes from "./routes/uploads.js";

dotenv.config();

// Connecting to Database
db();

const app = express();

app.use("/public", express.static("public"));
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Mount Routers
app.use("/api/products", productRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res, next) => {
  return res.send(process.env.PAYPAL_CLIENT_ID);
});

// Routes not found
app.use("*", (req, res, next) => {
  return res.status(404).json({
    message: `Route: ${req.originalUrl} not found on the server`,
  });
});

// Error Handler Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(5000, () => {
  console.log(
    `Server is running on PORT ${PORT} in ${process.env.NODE_ENV} mode`.yellow
      .bold
  );
});

// Handling unhandled rejections
process.on("unhandledRejection", function (err) {
  console.log(err.message.red.bold);
  server.close(() => process.exit(1));
});

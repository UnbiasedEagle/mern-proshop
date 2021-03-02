import dotenv from "dotenv";
import colors from "colors";
import products from "./data/products.js";
import users from "./data/users.js";
import User from "./models/User.js";
import Product from "./models/Product.js";
import Order from "./models/Order.js";
import db from "./config/db.js";

dotenv.config({ path: "../.env" });

// Connecting To Database
db();

const importData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    await Order.deleteMany();
    const createdUsers = await User.create(users);
    const adminUserId = createdUsers[2]._id;
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUserId };
    });
    await Product.create(sampleProducts);
    console.log("Data imported...".green.inverse);
    process.exit(0);
  } catch (err) {
    console.log(err.message.red.bold);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    console.log("Data removed...".red.inverse);
    process.exit(0);
  } catch (err) {
    console.log(err.message.red.bold);
    process.exit(1);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}

import express from "express";
import {
  getProducts,
  getProduct,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
} from "../controllers/products.js";
import { protect, admin } from "../middleware/auth.js";
const router = express.Router();

router.route("/:id/reviews").post(protect, createProductReview);

router.route("/").get(getProducts).post(protect, admin, createProduct);

router
  .route("/:id")
  .get(getProduct)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;

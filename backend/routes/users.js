import express from "express";
import {
  deleteUser,
  getUser,
  getUserProfile,
  getUsers,
  login,
  registerUser,
  updateUser,
  updateUserProfile,
} from "../controllers/users.js";
import { admin, protect } from "../middleware/auth.js";

const router = express.Router();

router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.route("/").post(registerUser).get(protect, admin, getUsers);

router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUser)
  .put(protect, admin, updateUser);

router.route("/login").post(login);

export default router;

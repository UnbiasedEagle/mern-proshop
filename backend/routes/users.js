import express from 'express';
import {
  authUser,
  deleteUser,
  getUser,
  getUserProfile,
  getUsers,
  registerUser,
  updateUser,
  updateUserProfile,
} from '../controllers/users.js';
import { admin, protect } from '../middleware/auth.js';
const router = express.Router();

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUser)
  .put(protect, admin, updateUser);
router.route('/login').post(authUser);

router.route('/').post(registerUser).get(protect, admin, getUsers);

export default router;

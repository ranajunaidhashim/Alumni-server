import express from 'express';
import {
  listUsers,
  updateUser,
  deleteUser
} from '../controllers/user.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = express.Router();

// list all users
router.get('/', authenticate, listUsers);

// update a user (name, email, type, password)
router.put('/:id', authenticate, updateUser);

// delete a user
router.delete('/:id', authenticate, deleteUser);

export default router;

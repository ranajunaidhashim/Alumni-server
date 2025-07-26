import express from 'express';
import { login, signup, logout } from '../controllers/auth.controller.js';
// import { authenticate } from '../middlewares/auth.middleware.js';

const router = express.Router();
// router.get('/logout', authenticate, logout);

router.post('/login', login);
router.post('/signup', signup);
router.post('/logout', logout);

export default router;
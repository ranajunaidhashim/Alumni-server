import express from 'express';
import { getCounts } from '../controllers/dashboard.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Admin‑only summary counts
router.get('/counts', authenticate, getCounts);

export default router;

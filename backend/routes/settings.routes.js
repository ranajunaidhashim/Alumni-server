import express from 'express';
import { getSettings } from '../controllers/settings.controller.js';

const router = express.Router();
router.get('/', getSettings);
export default router;

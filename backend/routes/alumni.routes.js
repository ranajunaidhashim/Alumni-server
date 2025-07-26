import express from 'express';
import multer from 'multer';
import {
  updateAlumnusStatus,
  deleteAlumnus,
  alumniList,
  updateAccount,
  alumnus
} from '../controllers/alumni.controller.js';
import { avatarUpload } from '../utils/file-upload.js';

const router = express.Router();
// const avatarUpload = multer(uploadConfig.avatar);

router.get('/', alumniList);
router.get('/:id', alumnus);
router.put('/status', updateAlumnusStatus);
router.delete('/:id', deleteAlumnus);

router.put('/account', avatarUpload.single('avatar'), updateAccount);

export default router;
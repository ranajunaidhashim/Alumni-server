import express from 'express';
import multer from 'multer';
import { listGallery, addGallery, deleteGallery } from '../controllers/gallery.controller.js';
import { galleryUpload } from '../utils/file-upload.js';

const router = express.Router();

router.get('/', listGallery);
router.post('/', galleryUpload.single('image'), addGallery);
router.delete('/:id', deleteGallery);

export default router;

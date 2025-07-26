import express from 'express';
import {
  listCareers,
  addCareer,
  updateCareer,
  deleteCareer
} from '../controllers/career.controller.js';

const router = express.Router();

router.get('/', listCareers);
router.post('/', addCareer);
router.put('/:id', updateCareer);
// router.put('/', updateCareer);
router.delete('/:id', deleteCareer);

export default router;
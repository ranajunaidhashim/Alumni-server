import express from 'express';
import {
  listCourses,
  addCourse,
  updateCourse,
  deleteCourse
} from '../controllers/course.controller.js';

const router = express.Router();

router.get('/', listCourses);
router.post('/', addCourse);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);

export default router;
import express from 'express';
import {
  listForums,
  addForum,
  updateForum,
  deleteForum,
  listComments,
  addComment,
  updateComment,
  deleteComment
} from '../controllers/forum.controller.js';

const router = express.Router();

router.get('/', listForums);
router.post('/', addForum);
router.put('/:id', updateForum);
router.delete('/:id', deleteForum);

router.get('/:topicId/comments', listComments);
router.post('/:topicId/comments', addComment);
router.put('/comments/:id', updateComment);
router.delete('/comments/:id', deleteComment);

export default router;

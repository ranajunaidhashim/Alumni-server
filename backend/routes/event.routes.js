import express from 'express';
import {
  listEvents,
  addEvent,
  updateEvent,
  deleteEvent,
  participateEvent,
  checkParticipation,
  upcomingEvents
} from '../controllers/event.controller.js';

const router = express.Router();

router.get('/', listEvents);
router.post('/', addEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);
router.post('/participate', participateEvent);
router.post('/participation-check', checkParticipation);
router.get('/upcoming-events', upcomingEvents);

export default router;
import { ForumTopic, Career, Event, AlumnusBio } from '../models/Index.js';
import { Op } from 'sequelize';

export async function getCounts(req, res, next) {
  try {
    const [ forumCount, jobCount, eventCount, upEventCount, alumniCount ] = await Promise.all([
      ForumTopic.count(),
      Career.count(),
      Event.count(),
      Event.count({ where: { schedule: { [Op.gte]: new Date() } } }),
      AlumnusBio.count()
    ]);
    res.json({
      forums: forumCount,
      jobs: jobCount,
      events: eventCount,
      upevents: upEventCount,
      alumni: alumniCount
    });
  } catch (err) {
    next(err);
  }
}

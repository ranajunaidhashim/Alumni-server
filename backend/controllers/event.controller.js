import { Op,literal } from 'sequelize';
import { Event, EventCommit } from '../models/Index.js';

export async function listEvents(req, res, next) {
    try {
        const events = await Event.findAll({ include: { model: EventCommit, as: 'commits' }, order: [['schedule', 'DESC']] });
        res.json(events);
    } catch (err) { next(err); }
}
export async function addEvent(req, res, next) {
    try { res.status(201).json(await Event.create(req.body)); } catch (err) { next(err); }
}
export async function updateEvent(req, res, next) {
    try { await Event.update(req.body, { where: { id: req.params.id } }); res.json({ message: 'Updated' }); } catch (err) { next(err); }
}
export async function deleteEvent(req, res, next) {
    try { await Event.destroy({ where: { id: req.params.id } }); res.json({ message: 'Deleted' }); } catch (err) { next(err); }
}
export async function participateEvent(req, res, next) {
    try { await EventCommit.create(req.body); res.json({ message: 'Participated' }); } catch (err) { next(err); }
}
export async function checkParticipation(req, res, next) {
    try {
        const exists = await EventCommit.findOne({ where: req.body });
        res.json({ participated: !!exists });
    } catch (err) { next(err); }
}
export async function upcomingEvents(req, res, next) {
  try { res.json(await Event.findAll({ where: { schedule: { [Op.gte]: literal('CURRENT_TIMESTAMP') } }, order: [['schedule', 'ASC']] })); } catch (err) { next(err); }
}
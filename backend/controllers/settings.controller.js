import { SystemSetting } from '../models/Index.js';

export async function getSettings(req, res, next) {
  try { res.json(await SystemSetting.findAll()); } catch (err) { next(err); }
}

import bcrypt from 'bcrypt';
import { User, AlumnusBio } from '../models/Index.js';

export async function listUsers(req, res, next) {
  try {
    const users = await User.findAll({ order: [['name','ASC']] });
    res.json(users);
  } catch (err) { next(err); }
}

export async function updateUser(req, res, next) {
  try {
    const { name, email, type, password } = req.body;
    const updates = { name, email, type };
    if (password) {
      updates.password = await bcrypt.hash(password, 10);
    }
    await User.update(updates, { where: { id: req.params.id } });
    res.json({ message: 'User updated' });
  } catch (err) { next(err); }
}

export async function deleteUser(req, res, next) {
  try {
    const id = req.params.id;
    // if this user is an alumnus, delete their bio first
    const user = await User.findByPk(id);
    if (user.alumnus_id) {
      await AlumnusBio.destroy({ where: { id: user.alumnus_id } });
    }
    await User.destroy({ where: { id } });
    res.json({ message: 'User deleted' });
  } catch (err) { next(err); }
}

import bcrypt from 'bcrypt';
import path from 'path';
import { AlumnusBio, User } from '../models/Index.js';

export async function alumniList(req, res, next) {
  try {
    const list = await AlumnusBio.findAll({ order: [['name', 'ASC']] });
    res.json(list);
  } catch (err) {
    next(err);
  }
}

export async function alumnus(req, res, next) {
  try {
    const record = await AlumnusBio.findOne({ where: { id: req.params.id } });
    res.json(record);
  } catch (err) {
    next(err);
  }
}

export async function updateAlumnusStatus(req, res, next) {
  try {
    await AlumnusBio.update(
      { status: req.body.status },
      { where: { id: req.body.id } }
    );
    res.json({ message: 'Status updated' });
  } catch (err) {
    next(err);
  }
}

export async function deleteAlumnus(req, res, next) {
  try {
    await AlumnusBio.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
}

export async function updateAccount(req, res, next) {
  console.log("update acccccccccc");
  try {
    console.log("SERVER");
    // parse integers
    const alumnusId = parseInt(req.body.alumnus_id, 10);
    const userId = parseInt(req.body.user_id, 10);

    // Build bio update payload
    const bioData = {
      name: req.body.name,
      email: req.body.email,
      gender: req.body.gender,
      batch: req.body.batch,
      course_id: parseInt(req.body.course_id, 10),
      connected_to: req.body.connected_to,
    };
    if (req.file) {
      const fullPath = req.file.path;
      const relPath = path.relative(process.cwd(), fullPath);
      bioData.avatar = relPath.replace(/\\/g, '/');
    }

    // Update alumnus_bio row
    await AlumnusBio.update(bioData, { where: { id: alumnusId } });

    // Build user update payload
    const userData = { name: req.body.name, email: req.body.email };
    if (req.body.password) {
      const hashed = await bcrypt.hash(req.body.password, 10);
      userData.password = hashed;
    }

    // Update users row
    await User.update(userData, { where: { id: userId } });

    res.json({ message: 'Account updated successfully' });
  } catch (err) {
    next(err);
  }
}

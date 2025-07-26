import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, AlumnusBio } from '../models/Index.js';

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.json({ loginStatus: false, Error: 'Invalid credentials' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.json({ loginStatus: false, Error: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id, role: user.type }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token, { httpOnly: true });
    // return legacy response shape
    res.json({
      loginStatus: true,
      userId: user.id,
      userType: user.type,
      userName: user.name,
      alumnus_id: user.alumnus_id
    });
  } catch (err) {
    next(err);
  }
}

export async function signup(req, res, next) {
  try {
    const { name, email, password, userType, course_id } = req.body;
    // check for existing email
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.json({ email: existing.email });
    const hashed = await bcrypt.hash(password, 10);
    let user;
    if (userType === 'alumnus') {
      const bio = await AlumnusBio.create({ name, email, course_id });
      user = await User.create({ name, email, password: hashed, userType, alumnus_id: bio.id });
    } else {
      user = await User.create({ name, email, password: hashed, userType });
    }
    // return legacy response
    res.json({ message: 'Signup Successful', userId: user.id, signupStatus: true });
  } catch (err) {
    next(err);
  }
}

export function logout(req, res) {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
}

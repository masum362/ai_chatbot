import jwt from 'jsonwebtoken';
import { findUser } from '../services/user.services.js';

export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await findUser(decoded.email);

    if (!user) {
      return res.status(400).json({ message: 'Invalid token' });
    }

    delete user._doc.password
    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
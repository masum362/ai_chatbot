import jwt from "jsonwebtoken";
import { findUserById } from "../services/user.services.js";
import redisClient from "../services/redis.service.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await findUserById(decoded.id);

    if (!user) {
      return res.status(400).json({ message: "Invalid user" });
    }

    const isBlacklisted = await redisClient.get(token);

    if (isBlacklisted) {
      return res.status(400).json({ message: "Invalid user" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

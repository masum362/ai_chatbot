import UserModel from "../model/user.model.js";
import { validationResult } from "express-validator";
import * as userServices from "../services/user.services.js";

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await userServices.createUser(req.body);
    const token = await user.generateToken();
    delete user._doc.password;
    return res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await userServices.findUser(email);

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isValid = await user.comparePassword(password);

    if (!isValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = await user.generateToken();
    delete user._doc.password;
    return res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  return res.json({ user: req.user });
};

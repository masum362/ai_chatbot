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
    return res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

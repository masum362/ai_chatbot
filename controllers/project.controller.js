import * as projectServices from "../services/project.services.js";
import { validationResult } from "express-validator";

export const createProject = async (req, res) => {
  console.log('called');
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name } = req.body;
  const userId = req.userId;
  console.log(req.userId);

  try {
    const project = await projectServices.createProject(name, userId);
    return res.status(200).json(project);
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.status(400).json({ message: "Project already exists" });
    }
    return res.status(500).json({ message: error.message });
  }
};

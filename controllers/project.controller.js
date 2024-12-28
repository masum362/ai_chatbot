import * as projectServices from "../services/project.services.js";
import { validationResult } from "express-validator";

export const createProject = async (req, res) => {
  console.log("called");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name } = req.body;
  const userId = req.userId;

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

export const getUserProjects = async (req, res) => {
  const userId = req.userId;
  try {
    const projects = await projectServices.getUserProjects(userId);
    return res.status(200).json(projects);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const addUserToProject = async (req, res) => {
  const { projectId, users } = req.body;
  console.log({projectId, users});
  const userId = req.userId;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const project = await projectServices.addUserToProject(projectId, users,userId);
    return res.status(200).json(project);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getProjectById = async (req, res) => {
  const projectId = req.params.id;
  const userId = req.userId;

  try {
    const project = await projectServices.getProjectById(projectId, userId);
    return res.status(200).json(project);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
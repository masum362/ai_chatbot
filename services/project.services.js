import mongoose from "mongoose";
import projectModel from "../model/project.model.js";

export const createProject = (name, userId) => {
  const project = new projectModel({
    name,
    users: [userId],
  });
  return project.save();
};

export const getUserProjects = (userId) => {
  return projectModel.find({ users: userId }).populate("users");
};

export const addUserToProject = async (projectId, users, userId) => {
  if (!projectId) {
    throw new Error("Project Id is required");
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid User Id");
  }

  if (!users || users.some((user) => !mongoose.Types.ObjectId.isValid(user))) {
    throw new Error("Invalid User Id");
  }

  const project = await projectModel.findOne({
    _id: projectId,
  });
  if (!project) {
    throw new Error("Project not found");
  }

  const isAlreadyUserExist = project.users.includes(userId);

  if (!isAlreadyUserExist) {
    throw new Error("Not Authorized");
  }

  const updatedProject = await projectModel
    .findOneAndUpdate(
      {
        _id: projectId,
      },
      {
        $addToSet: {
          users: {
            $each: users,
          },
        },
      },
      {
        new: true,
      }
    )
    .populate("users");

  return updatedProject;
};

export const getProjectById = (projectId, userId) => {
  if (userId) {
    return projectModel
      .findOne({
        _id: projectId,
        users: userId,
      })
      .populate("users");
  }

  return projectModel
    .findOne({
      _id: projectId,
    })
    .populate("users");
};

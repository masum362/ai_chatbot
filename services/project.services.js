import projectModel from "../model/project.model.js";

export const createProject = (name, userId) => {
  const project = new projectModel({
    name,
    users: [userId],
  });
  return project.save();
};

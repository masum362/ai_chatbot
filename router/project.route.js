import { Router } from "express";
import * as projectControllers from "../controllers/project.controllers.js";
import { protect } from "../middleware/auth.middleware.js";
import { body } from "express-validator";

const router = Router();

router.get("/all", protect, projectControllers.getUserProjects);
router.get("/get-project/:id", protect, projectControllers.getProjectById);

router.post(
  "/create",
  body("name")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),
  protect,
  projectControllers.createProject
);

router.post(
  "/add-users",
  body("projectId").isString().withMessage("Project Id is required"),
  body("users").isArray().withMessage("Users must be an array of user Ids"),
  protect,
  projectControllers.addUserToProject
);

export default router;

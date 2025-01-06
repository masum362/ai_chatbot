import { Router } from "express";
import { body } from "express-validator";
import * as userControllers from "../controllers/user.controllers.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/all", protect, userControllers.getAllUsers);
router.post(
  "/register",
  body("name")
    .isLength({ min: 3 })
    .withMessage("name must be at least 3 characters long"),
  body("username")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long"),
  body("email").isEmail().withMessage("Invalid email"),
  body("password")
    .isLength({ min: 3 })
    .withMessage("Password must be at least 3 characters long"),
  userControllers.register
);

router.post(
  "/login",
  body("email").isEmail().withMessage("Invalid email"),
  body("password")
    .isLength({ min: 3 })
    .withMessage("Password must be at least 3 characters long"),
  userControllers.loginUser
);

router.get("/user", protect, userControllers.getUser);
router.get("/logout", protect, userControllers.logOutUser);

export default router;

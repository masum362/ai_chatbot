import { Router } from "express";
import * as aiControllers from "../controllers/ai.controllers.js";
import { body } from "express-validator";

const router = Router();

router.get(
  "/search",
  aiControllers.generateResponse
);

export default router;
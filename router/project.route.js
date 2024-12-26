import { Router } from 'express';
import * as projectControllers from '../controllers/project.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { body } from 'express-validator';

const router = Router();

router.post('/create',
    body('name').isString().isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    protect,
    projectControllers.createProject);


export default router;

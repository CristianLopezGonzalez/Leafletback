import express from 'express';
import { UserController } from '../controllers/userController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/profile', authMiddleware, UserController.getUserProfile);

export default router;


import express from 'express';
import { UserController } from '../controllers/userController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/online', authMiddleware, UserController.getOnlineUsers);
router.get('/profile', authMiddleware, UserController.getUserProfile);
router.get('/location', authMiddleware, UserController.getUserLocationHistory);

export default router;


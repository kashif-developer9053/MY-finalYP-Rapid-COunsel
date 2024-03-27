// routes/chatRoutes.js
import express from 'express';
import { sendMessage } from '../controllers/chatController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/send', verifyToken, sendMessage);

export default router;

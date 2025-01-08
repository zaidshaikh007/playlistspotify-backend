import express from 'express';
import { verifyToken } from '../middleware/authMiddleware';
const { login, signup, profile } = require('../controllers/userController');
const router = express.Router();

router.post('/login', login)
router.post('/signup', signup)
router.get('/profile', verifyToken, profile)

export default router;
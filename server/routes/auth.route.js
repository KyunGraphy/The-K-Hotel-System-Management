import express from 'express';
import { login, register, logout } from '../controllers/auth.controller.js';
import { verifyToken } from '../utils/jwt.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);

router.get('/verifyToken', verifyToken, (req, res) => {
  res.status(200).json({
    msg: 'Verified token successfully',
  });
});

export default router;
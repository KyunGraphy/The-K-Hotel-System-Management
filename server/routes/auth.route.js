import express from 'express';
import { login, register, logout, newStaff, changePassword, verifyUser, verifyOTP } from '../controllers/auth.controller.js';
import { verifyAdmin, verifyToken } from '../middlewares/jwt.js';
import { HTTPStatus } from '../constants/Constants.js';

const router = express.Router();

router.post('/newStaff/:hotelId', verifyToken, verifyAdmin, newStaff);
router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.put('/changePassword', verifyToken, changePassword);

// Forget password routes
router.post('/verifyUser', verifyUser)
router.post('/verifyOTP', verifyOTP)

router.get('/verifyToken', verifyToken, (req, res) => {
  res.status(HTTPStatus.OK).json({
    msg: 'Verified token successfully',
  });
});

export default router;
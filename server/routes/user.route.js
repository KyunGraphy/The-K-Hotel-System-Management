import express from 'express';
import { getAllUsers, getUser, updateUser, deleteUser, uploadAvatar } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/jwt.js';

const router = express.Router();

router.get('/:id', getUser);
router.get('/', verifyToken, getAllUsers);
router.put('/:id', verifyToken, updateUser);
router.delete('/:id', verifyToken, deleteUser);

router.post('/uploadAvatar/:id', verifyToken, uploadAvatar);

export default router;
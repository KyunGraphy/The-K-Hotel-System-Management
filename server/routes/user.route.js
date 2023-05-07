import express from 'express';
import { getAllUsers, getUser, updateUser, deleteUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/jwt.js';

const router = express.Router();

router.get('/:id', verifyToken, getUser);
router.get('/', verifyToken, getAllUsers);
router.put('/:id', verifyToken, updateUser);
router.delete('/:id', verifyToken, deleteUser);

export default router;
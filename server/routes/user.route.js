import express from 'express';
import {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  uploadAvatar,
  removeAvatar,
  getAllStaffs
} from '../controllers/user.controller.js';
import { verifyAdmin, verifyToken } from '../middlewares/jwt.js';

const router = express.Router();

router.get('/', verifyToken, getAllUsers);
router.get('/staffs', verifyToken, verifyAdmin, getAllStaffs);
router.get('/:id', getUser);
router.put('/:id', verifyToken, updateUser);
router.delete('/:id', verifyToken, deleteUser);

router.post('/uploadAvatar/:userId', verifyToken, uploadAvatar);
router.delete('/uploadAvatar/:userId', verifyToken, removeAvatar);

export default router;
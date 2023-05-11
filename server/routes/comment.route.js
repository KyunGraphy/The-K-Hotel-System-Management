import express from 'express';
import { verifyToken } from '../utils/jwt.js';
import { createComment, deleteComment, getHotelComments } from '../controllers/comment.controller.js';

const router = express.Router();

router.get('/:hotelId', getHotelComments);
router.post('/:hotelId', verifyToken, createComment);
router.delete('/:hotelId/:commentId', verifyToken, deleteComment);

export default router;
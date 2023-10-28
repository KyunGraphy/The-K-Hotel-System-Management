import express from 'express';
import {
  createRooms,
  deleteRooms,
  getAllRooms,
  getOneRoom,
  toggleStatusRooms,
  updateFacility,
  updateRooms
} from '../controllers/room.controller.js';
import { verifyAdmin, verifyToken } from '../utils/jwt.js';

const router = express.Router();

router.get('/', getAllRooms)
router.get('/:roomId', getOneRoom)
router.post('/:hotelId', verifyToken, verifyAdmin, createRooms)
router.put('/:hotelId/:roomId', verifyToken, verifyAdmin, updateRooms)
router.patch('/toggleStatus/:roomId', verifyToken, verifyAdmin, toggleStatusRooms)
router.delete('/:hotelId/:roomId', verifyToken, verifyAdmin, deleteRooms)
router.post('/updateFacility/:roomId', verifyToken, verifyAdmin, updateFacility)

export default router;
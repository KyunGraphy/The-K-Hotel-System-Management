import express from 'express';
import { createRooms, deleteRooms, getAllRooms, getOneRoom, updateRooms } from '../controllers/room.controller.js';

const router = express.Router();

router.get('/', getAllRooms)
router.get('/:roomId', getOneRoom)
router.post('/:hotelId', createRooms)
router.put('/:roomId', updateRooms)
router.delete('/:hotelId/:roomId', deleteRooms)

export default router;
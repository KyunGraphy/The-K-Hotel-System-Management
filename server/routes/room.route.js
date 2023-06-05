import express from 'express';
import { createRooms, deleteRooms, getAllRooms, getOneRoom, updateFacility, updateRooms } from '../controllers/room.controller.js';

const router = express.Router();

router.get('/', getAllRooms)
router.get('/:roomId', getOneRoom)
router.post('/:hotelId', createRooms)
router.put('/:roomId', updateRooms)
router.delete('/:hotelId/:roomId', deleteRooms)
router.post('/updateFacility/:roomId', updateFacility)

export default router;
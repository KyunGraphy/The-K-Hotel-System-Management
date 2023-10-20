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

const router = express.Router();

router.get('/', getAllRooms)
router.get('/:roomId', getOneRoom)
router.post('/:hotelId', createRooms)
router.put('/:hotelId/:roomId', updateRooms)
router.patch('/toggleStatus/:roomId', toggleStatusRooms)
router.delete('/:hotelId/:roomId', deleteRooms)
router.post('/updateFacility/:roomId', updateFacility)

export default router;
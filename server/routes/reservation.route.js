import express from 'express';
import { assignReservation, createReservation, deleteHotelReservation, deleteOneReservation, getHotelReservation, getOneReservation, updateReservation } from '../controllers/reservation.controller.js';
import { verifyToken } from '../utils/jwt.js';

const router = express.Router();

router.post('/:hotelId', verifyToken, createReservation)
router.get('/:reservationId', getOneReservation)
router.get('/hotel/:hotelId', getHotelReservation)
router.put('/:reservationId', updateReservation)
router.post('/assign/:reservationId', assignReservation)
router.delete('/:reservationId', deleteOneReservation)
router.delete('/hotel/:hotelId', deleteHotelReservation)

export default router;
import express from 'express';
import { createReservation, deleteHotelReservation, deleteOneReservation, getHotelReservation, getOneReservation, updateReservation } from '../controllers/reservation.controller.js';
import { verifyToken } from '../utils/jwt.js';

const router = express.Router();

router.post('/:hotelId', createReservation)
router.get('/:reservationId', getOneReservation)
router.get('/hotel/:hotelId', getHotelReservation)
router.put('/:reservationId', updateReservation)
router.delete('/:reservationId', deleteOneReservation)
router.delete('/hotel/:hotelId', deleteHotelReservation)

export default router;
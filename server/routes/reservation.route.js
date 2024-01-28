import express from 'express';
import {
  assignReservation,
  createReservation,
  deleteHotelReservation,
  deleteOneReservation,
  getAllReservation,
  getHotelReservation,
  getOneReservation,
  getActivity,
  getHotelActivity,
  getUserReservations,
  getUserReservationsCount,
  removeReservation,
  updateReservation,
} from '../controllers/reservation.controller.js';
import { verifyAdmin, verifyToken } from '../middlewares/jwt.js';

const router = express.Router();

router.post('/:hotelId', verifyToken, createReservation)
router.get('/', verifyToken, verifyAdmin, getAllReservation)
router.get('/activity/:date', verifyToken, verifyAdmin, getActivity)
router.get('/activity/:hotelId/:date', verifyToken, verifyAdmin, getHotelActivity)
router.get('/hotel/:hotelId', verifyToken, verifyAdmin, getHotelReservation)
router.get('/user/:userId', verifyToken, verifyAdmin, getUserReservations)
router.get('/user/count/:userId', getUserReservationsCount)
router.get('/:reservationId', verifyToken, getOneReservation)

router.put('/:reservationId', verifyToken, updateReservation)
router.post('/assign/:reservationId', verifyToken, verifyAdmin, assignReservation)
router.post('/remove/:reservationId', verifyToken, removeReservation)
router.delete('/:reservationId', verifyToken, deleteOneReservation)
router.delete('/hotel/:hotelId', verifyToken, verifyAdmin, deleteHotelReservation)

export default router;
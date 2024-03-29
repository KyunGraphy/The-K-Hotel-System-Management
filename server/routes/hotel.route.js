import express from 'express';
import { createHotel, getAllHotels, updateHotel, getOneHotels, getHotelRooms, getSearchRooms, getHotelStaffs } from '../controllers/hotel.controller.js';
import { verifyAdmin, verifyToken } from '../middlewares/jwt.js';

const router = express.Router();

router.get('/', getAllHotels)
router.get('/:hotelId', getOneHotels)
router.get('/staffs/:hotelId', getHotelStaffs)
router.post('/', verifyToken, verifyAdmin, createHotel)
router.put('/:hotelId', verifyToken, verifyAdmin, updateHotel)
router.get('/room/:hotelId', verifyToken, verifyAdmin, getHotelRooms)
router.get('/room/:hotelId/:search', verifyToken, verifyAdmin, getSearchRooms)

export default router;
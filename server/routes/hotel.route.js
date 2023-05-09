import express from 'express';
import { createHotel, getAllHotels, updateHotel, getOneHotels, getHotelRooms } from '../controllers/hotel.controller.js';

const router = express.Router();

router.get('/', getAllHotels)
router.get('/:hotelId', getOneHotels)
router.post('/', createHotel)
router.put('/:id', updateHotel)
router.get('/room/:id', getHotelRooms)

export default router;
import express from 'express';
import { createHotel, getAllHotels, updateHotel, getOneHotels } from '../controllers/hotel.controller.js';

const router = express.Router();

router.get('/', getAllHotels)
router.get('/:hotelId', getOneHotels)
router.post('/', createHotel)
router.put('/:id', updateHotel)

export default router;
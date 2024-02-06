import express from 'express';
import { getAllRequests, getCartRequests, addOrder } from '../controllers/request.controller.js';

const router = express.Router();

router.get('/all', getAllRequests)
router.get('/cart', getCartRequests)
router.put('/addOrder', addOrder)

export default router;

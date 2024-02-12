import express from 'express';
import { getAllRequests, getCartRequests, addOrder, removeOrder } from '../controllers/request.controller.js';

const router = express.Router();

router.get('/all', getAllRequests)
router.get('/cart', getCartRequests)
router.put('/addOrder', addOrder)
router.put('/removeOrder/:id', removeOrder)

export default router;

import express from 'express';
import { getAllRequests, getCartRequests } from '../controllers/request.controller.js';

const router = express.Router();

router.get('/all', getAllRequests)
router.get('/cart', getCartRequests)

export default router;

import express from 'express';
import { getAllRequests } from '../controllers/request.controller.js';

const router = express.Router();

router.get('/', getAllRequests)

export default router;

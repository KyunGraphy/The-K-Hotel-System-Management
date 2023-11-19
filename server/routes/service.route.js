import express from 'express';
import { createService, getAllServices, getOneServices, updateService } from '../controllers/service.controller.js';

const router = express.Router();

router.get('/', getAllServices);
router.get('/:serviceId', getOneServices);
router.post('/', createService);
router.put('/:serviceId', updateService);

export default router;

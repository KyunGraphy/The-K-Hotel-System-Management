import express from 'express';
import {
  createService,
  getAllServices,
  getOneServices,
  serviceRequest,
  updateService,
} from '../controllers/service.controller.js';

const router = express.Router();

router.get('/', getAllServices);
router.get('/:serviceId', getOneServices);
router.post('/', createService);
// router.put('/:serviceId', updateService);

// Send request
router.put('/request', serviceRequest)

export default router;

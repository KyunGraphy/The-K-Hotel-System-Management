import express from 'express';
import {
  createService,
  getAllServices,
  getOneServices,
  serviceCart,
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
router.put('/cart', serviceCart)

export default router;

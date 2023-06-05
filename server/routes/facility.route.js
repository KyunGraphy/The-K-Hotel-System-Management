import express from 'express';
import { createFacility, deleteFacility, getAllFacilities, getOneFacility } from '../controllers/facility.controller.js';

const router = express.Router();

router.get('/', getAllFacilities)
router.get('/:facilityId', getOneFacility)
router.post('/', createFacility)
router.delete('/:facilityId', deleteFacility)

export default router;
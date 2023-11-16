import express from 'express';
import {
  createFacility,
  deleteFacility,
  getAllFacilities,
  getOneFacility,
  getRoomFacility
} from '../controllers/facility.controller.js';

const router = express.Router();

router.get('/', getAllFacilities)
router.get('/single/:facilityId', getOneFacility)
router.get('/room/:roomId', getRoomFacility)
router.post('/', createFacility)
router.delete('/:facilityId', deleteFacility)

export default router;
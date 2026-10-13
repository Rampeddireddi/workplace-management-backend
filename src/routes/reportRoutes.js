import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import {
  getMeetings,
  getOffice,
  getEngagement,
  getLearning,
  getHybrid,
  getSustainability,
} from '../controllers/reportController.js';

const router = Router();

router.get('/meetings', authenticate, getMeetings);
router.get('/office', authenticate, getOffice);
router.get('/engagement', authenticate, getEngagement);
router.get('/learning', authenticate, getLearning);
router.get('/hybrid', authenticate, getHybrid);
router.get('/sustainability', authenticate, getSustainability);

export default router;

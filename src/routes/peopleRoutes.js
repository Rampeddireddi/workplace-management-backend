import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { authorize } from '../middleware/authorize.js';
import { listPeople, getEmployee } from '../controllers/peopleController.js';

const router = Router();

// List people — managers and HR only
router.get('/', authenticate, authorize(['manager', 'hr']), listPeople);

// Individual employee — all roles, but backend enforces scope
router.get('/:employeeId', authenticate, getEmployee);

export default router;

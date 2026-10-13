import { Router } from 'express';
import { login, logout, me, getDemoAccounts } from '../controllers/authController.js';

const router = Router();

router.post('/login', login);
router.post('/logout', logout);
router.get('/me', me);
router.get('/demo-accounts', getDemoAccounts);

export default router;

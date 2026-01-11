import { Router } from 'express';
import * as dashboardController from './dashboard.controller';
import { authenticate } from '../../middlewares/auth.middleware';

const router = Router();

router.get('/stats', authenticate, dashboardController.getStats);

export default router;

import { Router } from 'express';
import * as reportsController from './reports.controller';

const router = Router();

router.get('/debts', reportsController.getDebtsReport);

export default router;

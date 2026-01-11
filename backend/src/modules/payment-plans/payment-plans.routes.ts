import { Router } from 'express';
import * as paymentPlanController from './payment-plans.controller';

const router = Router();

router.post('/', paymentPlanController.create);
router.get('/', paymentPlanController.list);
router.get('/:id', paymentPlanController.getOne);
router.put('/:id', paymentPlanController.update);
router.delete('/:id', paymentPlanController.remove);

export default router;

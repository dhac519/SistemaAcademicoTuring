import { Router } from 'express';
import * as paymentController from './payments.controller';

const router = Router();

router.post('/', paymentController.create);
router.get('/', paymentController.list);
router.get('/:id', paymentController.getOne);
router.put('/:id', paymentController.update);
router.delete('/:id', paymentController.remove);

export default router;

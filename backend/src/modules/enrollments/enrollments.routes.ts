import { Router } from 'express';
import * as enrollmentController from './enrollments.controller';

const router = Router();

router.post('/', enrollmentController.create);
router.get('/', enrollmentController.list);
router.put('/:id', enrollmentController.update);
router.patch('/:id/status', enrollmentController.updateStatus);
router.delete('/:id', enrollmentController.remove);

export default router;

import { Router } from 'express';
import * as staffController from './staff.controller';

const router = Router();

router.post('/', staffController.create);
router.get('/', staffController.list);
router.get('/:id', staffController.getOne);
router.put('/:id', staffController.update);
router.delete('/:id', staffController.remove);

export default router;

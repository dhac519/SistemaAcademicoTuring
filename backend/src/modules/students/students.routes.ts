import { Router } from 'express';
import * as studentController from './students.controller';

const router = Router();

router.post('/', studentController.create);
router.get('/', studentController.list);
router.get('/:id', studentController.getOne);
router.get('/:id/balance', studentController.getBalance);
router.put('/:id', studentController.update);
router.delete('/:id', studentController.remove);

export default router;

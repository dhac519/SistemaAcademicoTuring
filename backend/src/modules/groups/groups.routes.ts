import { Router } from 'express';
import * as groupController from './groups.controller';

const router = Router();

router.post('/', groupController.create);
router.get('/', groupController.list);
router.get('/:id', groupController.getOne);
router.put('/:id', groupController.update);
router.delete('/:id', groupController.remove);

export default router;

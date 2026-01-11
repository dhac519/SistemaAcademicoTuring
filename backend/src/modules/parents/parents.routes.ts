import { Router } from 'express';
import * as parentController from './parents.controller';

const router = Router();

router.post('/', parentController.create);
router.get('/', parentController.list);
router.get('/:id', parentController.getOne);
router.put('/:id', parentController.update);
router.delete('/:id', parentController.remove);

export default router;

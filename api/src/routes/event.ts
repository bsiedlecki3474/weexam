import { Router } from 'express';
import authMiddleware from '../middleware/authMiddleware'
import {
  add,
  save,
  _delete
} from '../controller/event';

const router = Router();

router.post('/add', authMiddleware, add);
router.post('/:id/save', authMiddleware, save);
router.post('/:id/delete', authMiddleware, _delete);

// router.get('/', list);
// router.post('/', create);
// router.get('/:id', detail);
// router.post('/:id', update);
// router.delete('/:id', del);

export default router;
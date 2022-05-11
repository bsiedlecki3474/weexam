import { Router } from 'express';
import authMiddleware from '../middleware/authMiddleware'
import {
  add,
  save,
  list,
  single,
  events,
  questions
} from '../controller/test';

const router = Router();

router.post('/add', authMiddleware, add);
router.get('/list', authMiddleware, list);
router.get('/:id', authMiddleware, single);
router.post('/:id/save', authMiddleware, save);
router.get('/:id/events', authMiddleware, events);
router.get('/:id/questions', authMiddleware, questions);

// router.get('/', list);
// router.post('/', create);
// router.get('/:id', detail);
// router.post('/:id', update);
// router.delete('/:id', del);

export default router;
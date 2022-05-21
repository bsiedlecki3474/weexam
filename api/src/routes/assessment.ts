import { Router } from 'express';
import authMiddleware from '../middleware/authMiddleware'
import {
  single,
  start,
  questions
} from '../controller/assessment';

const router = Router();

router.get('/:id', authMiddleware, single);
router.post('/:id/start', authMiddleware, start);
router.get('/:id/questions', authMiddleware, questions);

// router.get('/', list);
// router.post('/', create);
// router.get('/:id', detail);
// router.post('/:id', update);
// router.delete('/:id', del);

export default router;
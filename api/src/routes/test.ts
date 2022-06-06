import { Router } from 'express';
import {
  add,
  save,
  list,
  single,
  events,
  questions
} from '../controller/test';
import { adminAuthMiddleware } from '../middleware'

const router = Router();

router.post('/add', adminAuthMiddleware, add);
router.get('/list', adminAuthMiddleware, list);
router.get('/:id', adminAuthMiddleware, single);
router.post('/:id/save', adminAuthMiddleware, save);
router.get('/:id/events', adminAuthMiddleware, events);
router.get('/:id/questions', adminAuthMiddleware, questions);

export default router;
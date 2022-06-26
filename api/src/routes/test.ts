import { Router } from 'express';
import {
  add,
  save,
  _delete,
  list,
  single,
  events,
  questions
} from '../controller/test';
import { adminAuthMiddleware } from '../middleware'

const router = Router();

router.post('/add', adminAuthMiddleware, add);
router.post('/:id/save', adminAuthMiddleware, save);
router.delete('/:id/delete', adminAuthMiddleware, _delete);
router.get('/list', adminAuthMiddleware, list);
router.get('/:id', adminAuthMiddleware, single);
router.get('/:id/events', adminAuthMiddleware, events);
router.get('/:id/questions', adminAuthMiddleware, questions);

export default router;
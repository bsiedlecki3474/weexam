import { Router } from 'express';
import {
  add,
  save,
  _delete,
  list,
  single,
  testEvents,
  assessmentReport
} from '../controller/user';
import { authMiddleware, rootAuthMiddleware } from '../middleware'

const router = Router();

router.post('/add', rootAuthMiddleware, add);
router.post('/:id/save', rootAuthMiddleware, save);
router.delete('/:id/delete', rootAuthMiddleware, _delete);
router.get('/list', rootAuthMiddleware, list);
router.get('/testEvents', authMiddleware, testEvents);
router.get('/:id', rootAuthMiddleware, single);
router.get('/:id/assessmentReport/:eventId', rootAuthMiddleware, assessmentReport);

export default router;
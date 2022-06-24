import { Router } from 'express';
import {
  add,
  save,
  list,
  single,
  testEvents,
  assessmentReport
} from '../controller/user';
import { authMiddleware, rootAuthMiddleware } from '../middleware'

const router = Router();

router.post('/add', rootAuthMiddleware, add);
router.get('/list', rootAuthMiddleware, list);
router.get('/testEvents', authMiddleware, testEvents);
router.get('/:id', rootAuthMiddleware, single);
router.post('/:id/save', rootAuthMiddleware, save);
router.get('/:id/assessmentReport/:eventId', rootAuthMiddleware, assessmentReport);

export default router;
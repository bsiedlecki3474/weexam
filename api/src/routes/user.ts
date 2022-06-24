import { Router } from 'express';
import {
  add,
  save,
  list,
  single,
  testEvents,
  assessmentReport
} from '../controller/user';
import { authMiddleware, adminAuthMiddleware } from '../middleware'

const router = Router();

router.post('/add', adminAuthMiddleware, add);
router.get('/list', adminAuthMiddleware, list);
router.get('/testEvents', authMiddleware, testEvents);
router.get('/:id', adminAuthMiddleware, single);
router.post('/:id/save', adminAuthMiddleware, save);
router.get('/:id/assessmentReport/:eventId', adminAuthMiddleware, assessmentReport);
router.get('/assessmentReport/:eventId', authMiddleware, assessmentReport);

export default router;
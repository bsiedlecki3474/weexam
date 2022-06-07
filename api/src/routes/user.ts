import { Router } from 'express';
import {
  add,
  save,
  list,
  single,
  testEvents
} from '../controller/user';
import { authMiddleware, adminAuthMiddleware } from '../middleware'

const router = Router();

router.post('/add', adminAuthMiddleware, add);
router.get('/list', adminAuthMiddleware, list);
router.get('/testEvents', authMiddleware, testEvents);
router.get('/:id', adminAuthMiddleware, single);
router.post('/:id/save', adminAuthMiddleware, save);

export default router;
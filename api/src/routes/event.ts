import { Router } from 'express';
import {
  add,
  save,
  _delete,
  groups,
  addGroup,
  removeGroup
} from '../controller/event';
import { adminAuthMiddleware } from '../middleware'

const router = Router();

router.post('/add', adminAuthMiddleware, add);
router.post('/:id/save', adminAuthMiddleware, save);
router.post('/:id/delete', adminAuthMiddleware, _delete);
router.get('/:id/groups', adminAuthMiddleware, groups);
router.post('/:id/addGroup', adminAuthMiddleware, addGroup);
router.post('/:id/removeGroup', adminAuthMiddleware, removeGroup);

export default router;
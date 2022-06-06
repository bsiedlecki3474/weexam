import { Router } from 'express';
import {
  add,
  save,
  addUserToGroup,
  removeUserFromGroup,
  list,
  single,
  users
} from '../controller/group';
import { adminAuthMiddleware } from '../middleware'

const router = Router();

router.post('/add', adminAuthMiddleware, add);
router.post('/addUserToGroup', adminAuthMiddleware, addUserToGroup);
router.post('/removeUserFromGroup', adminAuthMiddleware, removeUserFromGroup);
router.get('/list', adminAuthMiddleware, list);
router.get('/:id', adminAuthMiddleware, single);
router.post('/:id/save', adminAuthMiddleware, save);
router.get('/:id/users', adminAuthMiddleware, users);

export default router;
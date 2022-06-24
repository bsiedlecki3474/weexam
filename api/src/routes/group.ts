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
import { adminAuthMiddleware, rootAuthMiddleware } from '../middleware'

const router = Router();

router.post('/add', rootAuthMiddleware, add);
router.post('/addUserToGroup', rootAuthMiddleware, addUserToGroup);
router.post('/removeUserFromGroup', rootAuthMiddleware, removeUserFromGroup);
router.get('/list', adminAuthMiddleware, list);
router.get('/:id', rootAuthMiddleware, single);
router.post('/:id/save', rootAuthMiddleware, save);
router.get('/:id/users', rootAuthMiddleware, users);

export default router;
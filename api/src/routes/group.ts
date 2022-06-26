import { Router } from 'express';
import {
  add,
  save,
  _delete,
  addUserToGroup,
  removeUserFromGroup,
  list,
  single,
  users
} from '../controller/group';
import { adminAuthMiddleware, rootAuthMiddleware } from '../middleware'

const router = Router();

router.post('/add', rootAuthMiddleware, add);
router.post('/:id/save', rootAuthMiddleware, save);
router.delete('/:id/delete', rootAuthMiddleware, _delete);
router.post('/addUserToGroup', rootAuthMiddleware, addUserToGroup);
router.post('/removeUserFromGroup', rootAuthMiddleware, removeUserFromGroup);
router.get('/list', adminAuthMiddleware, list);
router.get('/:id', rootAuthMiddleware, single);
router.get('/:id/users', rootAuthMiddleware, users);

export default router;
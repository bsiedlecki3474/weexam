import { Router } from 'express';
import authMiddleware from '../middleware/authMiddleware'
import {
  add,
  addUserToGroup,
  removeUserFromGroup,
  list,
  single,
  users
} from '../controller/group';

const router = Router();

router.post('/add', authMiddleware, add);
router.post('/addUserToGroup', authMiddleware, addUserToGroup);
router.post('/removeUserFromGroup', authMiddleware, removeUserFromGroup);
router.get('/list', authMiddleware, list);
router.get('/:id', authMiddleware, single);
router.get('/:id/users', authMiddleware, users);

// router.get('/', list);
// router.post('/', create);
// router.get('/:id', detail);
// router.post('/:id', update);
// router.delete('/:id', del);

export default router;
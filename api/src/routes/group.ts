import { Router } from 'express';
import authMiddleware from '../middleware/authMiddleware'
import {
  add,
  addUserToGroup,
  list,
  single,
  usersInGroup,
  usersNotInGroup
} from '../controller/group';

const router = Router();

router.post('/add', authMiddleware, add);
router.post('/addUserToGroup', authMiddleware, addUserToGroup);
router.get('/list', authMiddleware, list);
router.get('/:id', authMiddleware, single);
router.get('/:id/usersInGroup', authMiddleware, usersInGroup);
router.get('/:id/usersNotInGroup', authMiddleware, usersNotInGroup);

// router.get('/', list);
// router.post('/', create);
// router.get('/:id', detail);
// router.post('/:id', update);
// router.delete('/:id', del);

export default router;
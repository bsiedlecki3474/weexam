import { Router } from 'express';
import authMiddleware from '../middleware/authMiddleware'
import {
  add,
  save,
  list,
  single,
  addGroupToTest,
  removeGroupFromTest,
  groups,
  events,
  addEvent,
  deleteEvent
} from '../controller/test';

const router = Router();

router.post('/add', authMiddleware, add);
router.post('/addGroupToTest', authMiddleware, addGroupToTest);
router.post('/removeGroupFromTest', authMiddleware, removeGroupFromTest);
router.get('/list', authMiddleware, list);
router.get('/:id', authMiddleware, single);
router.post('/:id/save', authMiddleware, save);
router.get('/:id/groups', authMiddleware, groups);
router.get('/:id/events', authMiddleware, events);

// router.get('/', list);
// router.post('/', create);
// router.get('/:id', detail);
// router.post('/:id', update);
// router.delete('/:id', del);

export default router;
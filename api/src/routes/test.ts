import { Router } from 'express';
import { add, save, list, single, groups } from '../controller/test';
import authMiddleware from '../middleware/authMiddleware'

const router = Router();

router.post('/add', authMiddleware, add);
router.get('/list', authMiddleware, list);
router.get('/:id', authMiddleware, single);
router.post('/:id/save', authMiddleware, save);
router.get('/:id/groups', authMiddleware, groups);

// router.get('/', list);
// router.post('/', create);
// router.get('/:id', detail);
// router.post('/:id', update);
// router.delete('/:id', del);

export default router;
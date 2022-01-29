import { Router } from 'express';
import { add, list } from '../controller/user';
import authMiddleware from '../middleware/authMiddleware'

const router = Router();

router.post('/add', authMiddleware, add);
router.get('/list', authMiddleware, list);

// router.get('/', list);
// router.post('/', create);
// router.get('/:id', detail);
// router.post('/:id', update);
// router.delete('/:id', del);

export default router;
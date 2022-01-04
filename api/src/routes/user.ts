import { Router } from 'express';
import { add, list } from '../controller/user';

const router = Router();

router.post('/add', add);
router.get('/list', list);

// router.get('/', list);
// router.post('/', create);
// router.get('/:id', detail);
// router.post('/:id', update);
// router.delete('/:id', del);

export default router;
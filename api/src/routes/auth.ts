import { Router } from 'express';
import { signIn } from '../controller/auth';

const router = Router();

router.post('/signIn', signIn);

// router.get('/', list);
// router.post('/', create);
// router.get('/:id', detail);
// router.post('/:id', update);
// router.delete('/:id', del);

export default router;
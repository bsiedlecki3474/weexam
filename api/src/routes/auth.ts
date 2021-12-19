import { Router } from 'express';
import { signIn, createUser } from '../controller/auth';

const router = Router();

router.post('/signIn', signIn);
router.post('/createUser', createUser);

// router.get('/', list);
// router.post('/', create);
// router.get('/:id', detail);
// router.post('/:id', update);
// router.delete('/:id', del);

export default router;
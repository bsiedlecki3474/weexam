import { Router } from 'express';
import { signIn, signOut, verifyUser } from '../controller/auth';
import authMiddleware from '../middleware/authMiddleware'

const router = Router();

router.post('/signIn', signIn);
router.post('/signOut', authMiddleware, signOut);
router.get('/verifyUser', authMiddleware, verifyUser);

// router.get('/', list);
// router.post('/', create);
// router.get('/:id', detail);
// router.post('/:id', update);
// router.delete('/:id', del);

export default router;
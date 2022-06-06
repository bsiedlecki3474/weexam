import { Router } from 'express';
import { signIn, signOut } from '../controller/auth';
import { authMiddleware } from '../middleware'

const router = Router();

router.post('/signIn', signIn);
router.post('/signOut', authMiddleware, signOut);

export default router;
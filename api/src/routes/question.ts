import { Router } from 'express';
import {
  answerTypes,
  saveQuestions
} from '../controller/question';
import { authMiddleware, adminAuthMiddleware } from '../middleware'

const router = Router();

router.get('/answerTypes', authMiddleware, answerTypes);
router.post('/:id/saveQuestions', adminAuthMiddleware, saveQuestions);

export default router;
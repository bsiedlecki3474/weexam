import { Router } from 'express';
import authMiddleware from '../middleware/authMiddleware'
import {
  answerTypes,
  saveQuestions
} from '../controller/question';

const router = Router();

router.get('/answerTypes', authMiddleware, answerTypes);
router.post('/:id/saveQuestions', authMiddleware, saveQuestions);

export default router;
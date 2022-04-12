import { Router } from 'express';
import authMiddleware from '../middleware/authMiddleware'
import {
  answerTypes
} from '../controller/question';

const router = Router();

router.get('/answerTypes', authMiddleware, answerTypes);

export default router;
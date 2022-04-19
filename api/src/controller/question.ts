import { Request, Response } from 'express';
import { question } from '../model';
// import jwt, { JwtPayload } from 'jsonwebtoken';

// import { JWT_SECRET } from '../config'

class Question {
  answerTypes = async (req: Request, res: Response) => {
    try {
      const data = await question.answerTypes();
      if (data) {
        res.status(200).send(data);
      } else {
        res.status(400).send('no data');
      }
    } catch (e) {
      console.error(e)
      res.status(500).send(e);
    }
  }

  saveQuestions = async (req: Request, res: Response) => {
    try {
      const {
        questions
      } = req.body;

      if (!Number(req.params.id))
        return res.status(400).send();

      const response = await question.saveQuestions(Number(req.params.id), questions);

      res.status(200).send(response);
    } catch (e) {
      console.error(e)
      res.status(500).send(e);
    }
  }
}

export const {
  answerTypes,
  saveQuestions
} = new Question();
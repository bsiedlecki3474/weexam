import { Request, Response } from 'express';
import { assessment, event, test } from '../model';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { JWT_SECRET } from '../config'
import { arrayIntersect } from '../helpers';

class Assessment {
  // single = async (req: Request, res: Response) => {
  //   try {
  //     const token = req.cookies.jwt;
  //     const { userId } = jwt.verify(token, JWT_SECRET) as JwtPayload;
  //     const eventId = Number(req.params.id);
  //     const data = await assessment.single(eventId, userId);
  //     const userAnswers = await event.getUserAnswers(eventId, userId);
  //     const correctAnswers = await event.getCorrectAnswers(eventId);

  //     let userScore = 0;
  //     let totalScore = 0;

  //     if (correctAnswers) {
  //       for (const questionId of Object.keys(correctAnswers)) {
  //         const aUser = userAnswers[questionId];
  //         const aCorrect = correctAnswers[questionId];
  //         console.log(aUser, aCorrect)
  //         const intersect = arrayIntersect(aUser, aCorrect);
  //         const score = intersect?.length ?? 0;

  //         userScore += score;
  //         totalScore += aCorrect.length;
  //       }
  //     }

  //     if (data) {
  //       res.status(200).send({...data, userScore, totalScore});
  //     } else {
  //       res.status(400).send('no data');
  //     }
  //   } catch (e) {
  //     console.error(e)
  //     res.status(500).send(e);
  //   }
  // }

  start = async (req: Request, res: Response) => {
    try {
      const eventId = Number(req.params.id);

      if (!eventId)
        return res.status(400).send();

      const token = req.cookies.jwt;
      const assessmentId = await assessment.nextTableId('wee_tests_assessments');
      const { userId } = jwt.verify(token, JWT_SECRET) as JwtPayload;

      const data = [
        assessmentId,
        eventId,
        userId,
        userId
      ];

      const response = await assessment.start(data);

      res.status(200).send(response);
    } catch (e) {
      console.error(e)
      res.status(500).send(e);
    }
  }

  submit = async (req: Request, res: Response) => {
    try {
      const token = req.cookies.jwt;
      const assessmentId = Number(req.params.id);
      const { userId } = jwt.verify(token, JWT_SECRET) as JwtPayload;

      const response = await assessment.submit(assessmentId, userId);

      res.status(200).send(response);
    } catch (e) {
      console.error(e)
      res.status(500).send(e);
    }
  }

  questions = async (req: Request, res: Response) => {
    try {
      const testId = await event.getTestId(Number(req.params.id));
      const data = await test.questions(testId);

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

  getUserQuestionAnswers = async (req: Request, res: Response) => {
    try {
      const token = req.cookies.jwt;
      const { userId } = jwt.verify(token, JWT_SECRET) as JwtPayload;
      const assessmentId = Number(req.params.id);
      const data = await assessment.getUserQuestionAnswers(assessmentId, userId);

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

  saveAnswers = async (req: Request, res: Response) => {
    try {
      const token = req.cookies.jwt;
      const { userId } = jwt.verify(token, JWT_SECRET) as JwtPayload;
      // const eventId = Number(req.params.id);

      const assessmentId = Number(req.params.id);
      const { answers } = req.body;
      console.log(answers, JSON.parse(answers))

      if (!assessmentId)
        return res.status(400).send();

      // const assessmentId = await event.getAssessmentId(eventId, userId);
      const response = await assessment.saveAnswers(assessmentId, userId, JSON.parse(answers));

      res.status(200).send(response);
    } catch (e) {
      console.error(e)
      res.status(500).send(e);
    }
  }
}

export const {
  // single,
  start,
  submit,
  saveAnswers,
  questions
} = new Assessment();
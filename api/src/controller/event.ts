import { Request, Response } from 'express';
import { event, assessment, user } from '../model';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { format } from 'date-fns';

import { JWT_SECRET } from '../config'
import { arrayIntersect } from '../helpers';

class Event {
  add = async (req: Request, res: Response) => {
    try {
      const {
        testId,
        startDate,
        endDate,
        duration,
        isActive
      } = req.body;

      if (!testId || !startDate || !endDate || !duration || endDate <= startDate)
        return res.status(400).send();

      // const token = req.cookies.jwt;
      const id = await event.nextTableId('wee_tests_events');
      // const { userId } = jwt.verify(token, JWT_SECRET) as JwtPayload;

      const data = [
        id,
        testId,
        format(new Date(startDate), 'yyyy-MM-dd HH:mm'),
        format(new Date(endDate), 'yyyy-MM-dd HH:mm'),
        duration,
        isActive ?? 0,
        // userId // createdBy
      ];

      const response = await event.add(data);

      res.status(200).send(response);
    } catch (e) {
      console.error(e)
      res.status(500).send(e);
    }
  }

  save = async (req: Request, res: Response) => {
    try {
      const {
        startDate,
        endDate,
        duration,
        isActive
      } = req.body;

      if (!startDate || !endDate || !duration)
        return res.status(400).send();

      const token = req.cookies.jwt;
      // const { userId } = jwt.verify(token, JWT_SECRET) as JwtPayload;

      const data = [
        format(new Date(startDate), 'yyyy-MM-dd HH:mm'),
        format(new Date(endDate), 'yyyy-MM-dd HH:mm'),
        duration,
        isActive,
        // userId // modifiedBy
      ];

      const response = await event.save(Number(req.params.id), data);

      res.status(200).send(response);
    } catch (e) {
      console.error(e)
      res.status(500).send(e);
    }
  }

  _delete = async (req: Request, res: Response) => {
    try {
      const response = await event.delete(Number(req.params.id));
      res.status(200).send(response);
    } catch (e) {
      console.error(e)
      res.status(500).send(e);
    }
  }

  single = async (req: Request, res: Response) => {
    try {
      const data = await event.single(Number(req.params.id));
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

  eventAssessment = async (req: Request, res: Response) => {
    try {
      const token = req.cookies.jwt;
      const { userId } = jwt.verify(token, JWT_SECRET) as JwtPayload;
      const eventId = Number(req.params.id);
      const data = await event.getAssessment(eventId, userId);

      const answers = await event.getAnswers(eventId, userId);

      let userScore = 0;
      let totalScore = 0;

      if (answers) {
        for (const questionId of Object.keys(answers)) {
          const question = answers[questionId];

          userScore += question?.filter((el: any) => el.isCorrect).length ?? 0;
          totalScore += question?.length ?? 0
        }
      }

      if (data) {
        res.status(200).send({...data, userScore, totalScore});
      } else {
        res.status(400).send('no data');
      }
    } catch (e) {
      console.error(e)
      res.status(500).send(e);
    }
  }

  report = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      const totalUsers = await event.getTotalUsers(id);
      const list = await assessment.list(id);

      const participants = list?.length || 0;
      const totalTestScore = participants ? list[0].countTotal : 0;
      const averageScore = participants ? (list.reduce((acc: number, el: any) => acc + el.countCorrect, 0) / participants) : 0;
      const maxScore = participants ? Math.max(...list.map((el: any) => el.countCorrect)) : 0;

      const data = {
        participants,
        totalUsers,
        maxScore,
        totalTestScore,
        averageScore
      }

      res.status(200).send(data);

    } catch (e) {
      console.error(e)
      res.status(500).send(e);
    }
  }

  assessmentList = async (req: Request, res: Response) => {
    try {
      const eventId = Number(req.params.id);
      const data = await assessment.list(eventId);
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

  assessmentReport = async (req: Request, res: Response) => {
    try {
      const token = req.cookies.jwt;
      const { userId } = jwt.verify(token, JWT_SECRET) as JwtPayload;
      const eventId = req.params.id

      if (!eventId)
        return res.status(400).send();

      const data = await user.assessmentReport(Number(eventId), userId);

      if (data) {
        res.status(200).send(data);
      } else {
        res.status(400).send(req);
      }
    } catch (e) {
      console.error(e)
      res.status(500).send(e);
    }
  }

  addGroup = async (req: Request, res: Response) => {
    try {
      const { groupId } = req.body;
      const eventId = Number(req.params.id);

      if (!groupId || !eventId)
        return res.status(400).send();

      const data = [
        groupId,
        eventId
      ];

      const response = await event.addGroup(data);

      res.status(200).send(response);
    } catch (e) {
      console.error(e)
      res.status(500).send(e);
    }
  }

  removeGroup = async (req: Request, res: Response) => {
    try {
      const { groupId } = req.body;
      const eventId = Number(req.params.id);

      if (!groupId || !eventId)
        return res.status(400).send();

      const data = [
        groupId,
        eventId
      ];

      const response = await event.removeGroup(data);

      res.status(200).send(response);
    } catch (e) {
      console.error(e)
      res.status(500).send(e);
    }
  }

  groups = async (req: Request, res: Response) => {
    try {
      const data = await event.groups(Number(req.params.id));
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

  // single = async (req: Request, res: Response) => {
  //   try {
  //     const token = req.cookies.jwt;
  //     const { userId } = jwt.verify(token, JWT_SECRET) as JwtPayload;
  //     const eventId = Number(req.params.id);
  //     const data = await event.single(eventId, userId);
  //     if (data) {
  //       res.status(200).send(data);
  //     } else {
  //       res.status(400).send('no data');
  //     }
  //   } catch (e) {
  //     console.error(e)
  //     res.status(500).send(e);
  //   }
  // }
}

export const {
  add,
  save,
  _delete,
  single,
  eventAssessment,
  assessmentList,
  assessmentReport,
  report,
  groups,
  addGroup,
  removeGroup
  // single
} = new Event();
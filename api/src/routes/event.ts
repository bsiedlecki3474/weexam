import { Router } from 'express';
import {
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
} from '../controller/event';

import { authMiddleware, adminAuthMiddleware } from '../middleware'

const router = Router();

router.post('/add', adminAuthMiddleware, add);
router.post('/:id/save', adminAuthMiddleware, save);
router.post('/:id/delete', adminAuthMiddleware, _delete);
router.get('/:id', adminAuthMiddleware, single);
router.get('/:id/assessment', authMiddleware, eventAssessment);
router.get('/:id/report', adminAuthMiddleware, report);
router.get('/:id/assessmentList', adminAuthMiddleware, assessmentList);
router.get('/:id/assessmentReport/', authMiddleware, assessmentReport);
router.get('/:id/groups', adminAuthMiddleware, groups);
router.post('/:id/addGroup', adminAuthMiddleware, addGroup);
router.post('/:id/removeGroup', adminAuthMiddleware, removeGroup);

export default router;
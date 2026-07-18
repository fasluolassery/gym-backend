import { Router } from 'express';
import { teamController } from '../controllers/team.controller';
import { asyncHandler } from '../middlewares/async.middleware';

const router = Router();

router.get('/api/teams', asyncHandler(teamController.getAll));
router.get('/api/teams/:id', asyncHandler(teamController.getById));
router.put('/api/teams/:id', asyncHandler(teamController.update));
router.post('/api/teams/sync', asyncHandler(teamController.sync));

export default router;

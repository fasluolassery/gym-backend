import { Router } from 'express';
import { matchController } from '../controllers/match.controller';
import { asyncHandler } from '../middlewares/async.middleware';

const router = Router();

router.get('/api/matches', asyncHandler(matchController.getAll));
router.get('/api/matches/:id', asyncHandler(matchController.getById));
router.put('/api/matches/:id/score', asyncHandler(matchController.updateScore));
router.post('/api/matches/sync', asyncHandler(matchController.sync));

export default router;

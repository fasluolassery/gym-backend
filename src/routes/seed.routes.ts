import { Router } from 'express';
import { seedController } from '../controllers/seed.controller';
import { asyncHandler } from '../middlewares/async.middleware';

const router = Router();

router.post('/api/seed/teams', asyncHandler(seedController.seedTeams));
router.post('/api/seed/reset', asyncHandler(seedController.resetAll));

export default router;

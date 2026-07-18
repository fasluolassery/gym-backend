import { Router } from 'express';
import { playerController } from '../controllers/player.controller';
import { asyncHandler } from '../middlewares/async.middleware';

const router = Router();

router.get('/api/players', asyncHandler(playerController.getAll));
router.get('/api/players/:id', asyncHandler(playerController.getById));
router.post('/api/players', asyncHandler(playerController.create));
router.put('/api/players/:id', asyncHandler(playerController.update));
router.delete('/api/players/:id', asyncHandler(playerController.delete));
router.post('/api/players/sync', asyncHandler(playerController.sync));

export default router;

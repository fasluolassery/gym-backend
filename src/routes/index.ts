import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../config/swagger.config';
import { APP_ROUTES } from '../constants';
import healthRouter from './health.routes';
import playerRouter from './player.routes';
import teamRouter from './team.routes';
import matchRouter from './match.routes';
import seedRouter from './seed.routes';

const router = Router();

// Swagger API Documentation
router.use(APP_ROUTES.SWAGGER_DOCS, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Mount Health Check Routes
router.use(healthRouter);
router.use(playerRouter);
router.use(teamRouter);
router.use(matchRouter);
router.use(seedRouter);

export default router;

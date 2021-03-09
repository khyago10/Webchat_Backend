import { Router } from 'express';

import AuthSessionsController from '../controllers/AuthSessionsController';

const authSessionsRouter = Router();
const authSessionsController = new AuthSessionsController();

authSessionsRouter.post('/', authSessionsController.create);

export default authSessionsRouter;
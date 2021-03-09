import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import authSessionsRouter from '@modules/users/infra/http/routes/auth.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/authenticate', authSessionsRouter);

export default routes;
import { Router } from 'express';

import isAuth from '../middlewares/isAuthenticated';
import UsersController from '../controllers/UsersController';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post('/', usersController.create);
usersRouter.get('/', isAuth, usersController.index);

export default usersRouter;
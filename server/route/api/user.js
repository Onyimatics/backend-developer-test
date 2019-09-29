import { Router } from 'express';
import UserController from '../../controller/userController';
import validationMiddleware from '../../middlewares/validationMiddleware';

const userRoutes = Router();
const validateRequest = validationMiddleware();

// signup route
userRoutes.post('/signup', validateRequest, UserController.signup);
// signin routes
userRoutes.post('/signin', validateRequest, UserController.signin);

export default userRoutes;

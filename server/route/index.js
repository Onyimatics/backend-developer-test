import { Router } from 'express';
import userRoutes from './api/user';
import teamRoutes from './api/team';

const routes = Router();
routes.use('/auth', userRoutes);
routes.use('/team', teamRoutes);


export default routes;

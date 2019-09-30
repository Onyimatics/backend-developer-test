import { Router } from 'express';
import userRoutes from './api/user';
import teamRoutes from './api/team';
import fixtureRoutes from './api/fixture';

const routes = Router();
routes.use('/auth', userRoutes);
routes.use('/team', teamRoutes);
routes.use('/fixture', fixtureRoutes);


export default routes;

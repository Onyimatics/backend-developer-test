import { Router } from 'express';
import userRoutes from './api/user';

const routes = Router();
routes.use('/auth', userRoutes);


export default routes;

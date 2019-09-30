import { Router } from 'express';
import TeamController from '../../controller/teamController';
import validationMiddleware from '../../middlewares/validationMiddleware';
import authMiddleware from '../../middlewares/authMiddleware';
import AdminAuthentication from '../../middlewares/adminAuthentication';

const teamRoutes = Router();
const validateRequest = validationMiddleware();
teamRoutes.post('/', validateRequest, authMiddleware, AdminAuthentication.adminChecker, TeamController.createTeam);
teamRoutes.patch('/:teamId', authMiddleware, validateRequest, AdminAuthentication.adminChecker, TeamController.updateTeam);
teamRoutes.get('/:teamId', authMiddleware, validateRequest, TeamController.viewTeam);
teamRoutes.delete('/:teamId', authMiddleware, validateRequest, AdminAuthentication.adminChecker, TeamController.deleteTeam);
export default teamRoutes;

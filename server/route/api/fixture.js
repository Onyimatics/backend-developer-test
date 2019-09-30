import { Router } from 'express';
import FixtureController from '../../controller/fixtureController';
import validationMiddleware from '../../middlewares/validationMiddleware';
import authMiddleware from '../../middlewares/authMiddleware';
import AdminAuthentication from '../../middlewares/adminAuthentication';

const fixtureRoutes = Router();
const validateRequest = validationMiddleware();
fixtureRoutes.post('/',
  validateRequest,
  authMiddleware,
  AdminAuthentication.adminChecker,
  FixtureController.createFixture);

fixtureRoutes.patch('/:fixtureId',
  authMiddleware,
  validateRequest,
  AdminAuthentication.adminChecker,
  FixtureController.updateFixture);

fixtureRoutes.get('/:fixtureId',
  authMiddleware,
  validateRequest,
  FixtureController.viewFixture);

fixtureRoutes.delete('/:fixtureId',
  authMiddleware,
  validateRequest,
  AdminAuthentication.adminChecker,
  FixtureController.deleteFixture);

export default fixtureRoutes;

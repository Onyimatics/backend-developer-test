import response from '../utils/response';

class AdminAuthentication {
  static adminChecker(req, res, next) {
    const { isAdmin } = req.currentUser;
    if (isAdmin === true) {
      return next();
    }
    return response(res, 401, 'You are not authorized to access this page');
  }
}

export default AdminAuthentication;

import jwt from 'jsonwebtoken';
import response from '../utils/response';

const decodeToken = (req, res, next, token) => {
  jwt.verify(token, process.env.JWT_SECRET, (error, decode) => {
    if (!error) {
      req.currentUser = decode;
      return next();
    }
    return response(res, 401, 'Token is not valid');
  });
};

const authMiddleware = (req, res, next) => {
  let token = req.headers['x-access-token']
    || req.headers.authorization
    || req.headers.token
    || req.params.token;

  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  if (token) {
    return decodeToken(req, res, next, token);
  }
  return response(res, 400, 'Invalid access token');
};

export default authMiddleware;

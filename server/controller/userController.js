import mongoose from 'mongoose';
import response from '../utils/response';

import User from '../db/models/user';
import PasswordManager from '../utils/passwordManager';
import TokenManager from '../utils/tokenManager';

class UserController {
  static async signup(req, res) {
    try {
      const isAdmin = false;
      const {
        firstName, lastName, email, password,
      } = req.body;
      const hashedPassword = await PasswordManager.hashPassword(password);
      const userDetails = await User.find({ email });
      if (userDetails[0]) {
        return response(res, 409, 'Email already in use');
      }
      const user = await new User({
        _id: new mongoose.Types.ObjectId(),
        firstName,
        lastName,
        email,
        hashedPassword,
        isAdmin,
      });
      user.save();

      const { _id } = user;

      const token = await TokenManager.sign({
        _id,
        firstName,
        lastName,
        email,
        isAdmin: false,
      });

      return response(res, 201, 'Successfully created a User', {
        _id, firstName, lastName, email, isAdmin, token,
      });
    } catch (error) {
      return response(res, 500, 'Server Error');
    }
  }

  static async signin(req, res) {
    const { email, password } = req.body;
    let isPasswordValid;
    try {
      const userDetails = await User.find({ email });
      if (!userDetails[0]) {
        return response(res, 400, "User doesn't exist");
      }
      isPasswordValid = PasswordManager.verifyPassword(
        password, userDetails[0].hashedPassword,
      );
      if (!isPasswordValid) {
        return response(res, 400, 'Incorrect Passsword or Username');
      }
      const {
        _id, firstName, lastName, isAdmin,
      } = userDetails[0];
      if (isPasswordValid) {
        const token = TokenManager.sign({
          _id, firstName, lastName, email, isAdmin,
        });
        return response(res, 200, 'Successfully signed in', {
          _id, firstName, lastName, email, isAdmin, token,
        });
      }
    } catch (error) {
      response(res, 500, 'Server Error');
    }
    return response(res, 400, 'Invalid Password or Email');
  }
}

export default UserController;

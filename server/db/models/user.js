const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  // _id: mongoose.Types.ObjectId,
  firstName: String,
  lastName: String,
  email: String,
  hashedPassword: String,
  isAdmin: Boolean,
});

export default (
  model('User', userSchema)
);

// import db from '../config/config';

// const mongoose = require('mongoose');

// const userSchema = mongoose.Schema({
//   _id: mongoose.Types.ObjectId,
//   firstName: String,
//   lastName: String,
//   email: String,
//   hashPassword: String,
//   isAdmin: Boolean,
// });

// module.exports = db.model('User', userSchema);

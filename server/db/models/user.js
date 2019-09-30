const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  hashedPassword: String,
  isAdmin: Boolean,
});

export default (
  model('User', userSchema)
);

const { Schema, model } = require('mongoose');

const teamSchema = new Schema({
  teamName: String,
  teamMembers: Number,
});

export default (
  model('Team', teamSchema)
);

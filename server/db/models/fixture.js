const { model, Schema } = require('mongoose');

const fixtureSchema = new Schema({
  hostTeam: String,
  awayTeam: String,
  matchDate: Date,
  matchVenue: String,
  isPlayed: Boolean,
});

export default (
  model('Fixture', fixtureSchema)
);

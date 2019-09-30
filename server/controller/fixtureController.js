import Fixture from '../db/models/fixture';
import response from '../utils/response';

const mongoose = require('mongoose');


class FixtureController {
  static async createFixture(req, res) {
    try {
      const {
        hostTeam,
        awayTeam,
        matchDate,
        matchVenue,
      } = req.body;
      const isPlayed = false;
      const fixture = await new Fixture({
        _id: new mongoose.Types.ObjectId(),
        hostTeam,
        awayTeam,
        matchDate,
        matchVenue,
        isPlayed,
      });
      fixture.save();
      const { _id } = fixture;
      return response(res, 201, 'Fixture created successfully', {
        _id,
        hostTeam,
        awayTeam,
        matchDate,
        matchVenue,
        isPlayed,
      });
    } catch (error) {
      return response(res, 500, 'Server Error');
    }
  }

  static async updateFixture(req, res) {
    try {
      const { fixtureId } = req.params;
      const {
        hostTeam,
        awayTeam,
        matchDate,
        matchVenue,
        isPlayed,
      } = req.body;
      const fixtureDetails = await Fixture.updateOne({ _id: fixtureId },
        {
          hostTeam,
          awayTeam,
          matchDate,
          matchVenue,
          isPlayed,
        });
      if (fixtureDetails.n === 1) {
        return response(res, 200, {
          fixtureId,
          hostTeam,
          matchDate,
          matchVenue,
          isPlayed,

        });
      }
      return response(res, 404, 'This fixture does not exist again');
    } catch (error) {
      return response(res, 500, 'Server Error');
    }
  }

  static async viewFixture(req, res) {
    try {
      const { params: { fixtureId } } = req;
      const fixtureDetails = await Fixture.findOne({ _id: fixtureId });
      if (fixtureDetails) {
        return response(res, 200, 'Fixture successfully retrieved', { fixtureDetails });
      }
      return response(res, 404, 'Fixture not found');
    } catch (error) {
      return response(res, 500, 'Server Error');
    }
  }

  static async deleteFixture(req, res) {
    try {
      const { params: { fixtureId } } = req;
      const fixtureDetails = await Fixture.findByIdAndDelete({ _id: fixtureId });
      if (fixtureDetails) {
        return response(res, 200, 'Fixture deleted successfully');
      }
      return response(res, 404, 'Fixture does not exist');
    } catch (error) {
      return response(res, 500, 'Server Error');
    }
  }
}

export default FixtureController;

import mongoose from 'mongoose';
import Team from '../db/models/team';
import response from '../utils/response';

class TeamController {
  static async createTeam(req, res) {
    try {
      const { teamName, teamMembers } = req.body;
      const teamDetails = await Team.find({ teamName });
      if (teamDetails[0]) {
        return response(res, 409, 'Team name already in use');
      }
      const team = await new Team({
        _id: new mongoose.Types.ObjectId(),
        teamName,
        teamMembers,
      });
      team.save();
      const { _id } = team;
      return response(res, 201, {
        _id, teamName, teamMembers,
      });
    } catch (error) {
      response(res, 500, 'Server Error');
    }
  }

  static async updateTeam(req, res) {
    try {
      const { teamId } = req.params;
      const { teamName, teamMembers } = req.body;
      const teamDetails = await Team.updateOne({ _id: teamId }, { teamName, teamMembers });
      if (teamDetails.n === 1) {
        return response(res, 200, 'Team successfully updated', {
          teamId, teamName, teamMembers,
        });
      }
      return response(res, 404, 'Team not found');
    } catch (error) {
      response(res, 500, 'Server Error');
    }
  }

  static async viewTeam(req, res) {
    try {
      const { params: { teamId } } = req;
      const teamDetails = await Team.findOne({ _id: teamId });
      if (teamDetails) {
        return response(res, 200, 'Team fetched successfully', {
          teamDetails,
        });
      }
      return response(res, 404, 'This team does not exist');
    } catch (error) {
      return response(res, 500, 'Server Error');
    }
  }

  static async deleteTeam(req, res) {
    try {
      const { params: { teamId } } = req;
      const teamDetails = await Team.findByIdAndDelete({ _id: teamId });
      if (teamDetails) {
        return response(res, 200, 'Team successfully deleted');
      }
      return response(res, 404, 'This team does not exist');
    } catch (error) {
      return response(res, 500, 'Server Error');
    }
  }
}

export default TeamController;

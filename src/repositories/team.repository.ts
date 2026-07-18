import { Team, ITeam } from '../models/team.model';
import { BaseRepository } from './base.repository';

export class TeamRepository extends BaseRepository<ITeam> {
  constructor() {
    super(Team);
  }
}

export const teamRepository = new TeamRepository();

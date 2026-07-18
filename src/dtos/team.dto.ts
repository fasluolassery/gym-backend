import { ITeam } from '../models/team.model';

export interface TeamDTO {
  id: string;
  name: string;
  manager: string;
  averageRating: number;
  logo: string | null;
  managerAvatar: string | null;
}

export const mapTeamToDTO = (team: ITeam): TeamDTO => {
  return {
    id: team.id,
    name: team.name,
    manager: team.manager,
    averageRating: team.averageRating,
    logo: team.logo,
    managerAvatar: team.managerAvatar,
  };
};

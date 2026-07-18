import { IMatch } from '../models/match.model';

export interface MatchDTO {
  id: string;
  round: number;
  homeTeamId: string;
  awayTeamId: string;
  homeScore: number | null;
  awayScore: number | null;
  isCompleted: boolean;
}

export const mapMatchToDTO = (match: IMatch): MatchDTO => {
  return {
    id: match.id,
    round: match.round,
    homeTeamId: match.homeTeamId,
    awayTeamId: match.awayTeamId,
    homeScore: match.homeScore,
    awayScore: match.awayScore,
    isCompleted: match.isCompleted,
  };
};

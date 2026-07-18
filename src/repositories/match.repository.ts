import { Match, IMatch } from '../models/match.model';
import { BaseRepository } from './base.repository';

export class MatchRepository extends BaseRepository<IMatch> {
  constructor() {
    super(Match);
  }
}

export const matchRepository = new MatchRepository();

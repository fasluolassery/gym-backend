import { Player, IPlayer } from '../models/player.model';
import { BaseRepository } from './base.repository';

export class PlayerRepository extends BaseRepository<IPlayer> {
  constructor() {
    super(Player);
  }
}

export const playerRepository = new PlayerRepository();

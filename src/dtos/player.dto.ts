import { IPlayer } from '../models/player.model';

export interface PlayerDTO {
  id: string;
  name: string;
  position: 'GK' | 'DEF' | 'ATK';
  rating: number;
  teamId: string | null;
  avatar: string | null;
  phone: string | null;
}

export const mapPlayerToDTO = (player: IPlayer): PlayerDTO => {
  return {
    id: player.id,
    name: player.name,
    position: player.position,
    rating: player.rating,
    teamId: player.teamId,
    avatar: player.avatar,
    phone: player.phone,
  };
};

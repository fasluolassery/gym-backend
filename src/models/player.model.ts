import mongoose, { Schema, Document } from 'mongoose';

export interface IPlayer extends Document {
  id: string;
  name: string;
  position: 'GK' | 'DEF' | 'ATK';
  rating: number;
  teamId: string | null;
  avatar: string | null;
  phone: string | null;
}

const PlayerSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    position: { type: String, enum: ['GK', 'DEF', 'ATK'], required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    teamId: { type: String, default: null },
    avatar: { type: String, default: null },
    phone: { type: String, default: null },
  },
  { timestamps: true }
);

export const Player = mongoose.model<IPlayer>('Player', PlayerSchema);

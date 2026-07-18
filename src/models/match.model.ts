import mongoose, { Schema, Document } from 'mongoose';

export interface IMatch extends Document {
  id: string;
  round: number;
  homeTeamId: string;
  awayTeamId: string;
  homeScore: number | null;
  awayScore: number | null;
  isCompleted: boolean;
}

const MatchSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    round: { type: Number, required: true },
    homeTeamId: { type: String, required: true },
    awayTeamId: { type: String, required: true },
    homeScore: { type: Number, default: null },
    awayScore: { type: Number, default: null },
    isCompleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Match = mongoose.model<IMatch>('Match', MatchSchema);

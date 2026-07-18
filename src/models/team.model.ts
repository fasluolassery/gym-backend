import mongoose, { Schema, Document } from 'mongoose';

export interface ITeam extends Document {
  id: string;
  name: string;
  manager: string;
  averageRating: number;
  logo: string | null;
  managerAvatar: string | null;
}

const TeamSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    manager: { type: String, required: true, trim: true },
    averageRating: { type: Number, default: 0 },
    logo: { type: String, default: null },
    managerAvatar: { type: String, default: null },
  },
  { timestamps: true }
);

export const Team = mongoose.model<ITeam>('Team', TeamSchema);

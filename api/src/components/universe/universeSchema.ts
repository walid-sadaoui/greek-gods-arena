import mongoose from 'mongoose';
import { IUniverse } from './universeModel';
import { characterSchema } from '../../components/users/characters/characterSchema';

const { Schema } = mongoose;

const universeSchema = new Schema<IUniverse>(
  {
    universeName: {
      type: String,
      unique: [true, 'This Universe Name is already used'],
    },
    characters: [characterSchema],
  },
  { timestamps: true }
);

const Universe = mongoose.model<IUniverse>('Universe', universeSchema);
export default Universe;

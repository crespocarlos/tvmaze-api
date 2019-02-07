import { Document, Model, model, Schema } from "mongoose";
import mongoose from "../config/mongodb";

export interface ShowModel extends Document {
  tvMazeId: number;
  name: string;
  cast: Array<{
    tvMazeId: number;
    name: string;
    birthday?: Date;
  }>;
}

const schema = new Schema({
  tvMazeId: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  cast: [
    {
      tvMazeId: {
        type: Number,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      birthday: {
        type: Date
      }
    }
  ]
});

export const Show: Model<ShowModel> = mongoose.model<ShowModel>("Show", schema);

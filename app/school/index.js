import { Schema, model } from "mongoose";
import config from "../config.js";

const schoolSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
    },
    studentCount: {
      type: Number,
      default: 0,
    },
    classes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Class",
      },
    ],
  },
  config.mongooseSchemaOptions
);

export default model("School", schoolSchema);

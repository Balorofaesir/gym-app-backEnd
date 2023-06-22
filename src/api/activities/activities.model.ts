import { Schema, model, Document } from "mongoose";

export interface ActivityDocument extends Document {
  name: string;
  met: number;
  // createdAt: Date;
  // updatedAt: Date;
}

const ActivitySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    met: {
      type: Number,
      required: true,
    },
    // createdBy: {
    //   type: Schema.Types.ObjectId,
    //   ref: "user",
    //   required: false,
    // },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Activity = model<ActivityDocument>("activities", ActivitySchema);

export default Activity;
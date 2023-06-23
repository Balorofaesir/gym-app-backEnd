import { Schema, model, Document, SchemaType } from "mongoose";

export interface FavoriteDocument extends Document {
  title: string;
  name: string;
  description: string;
  link: string;
  favoriteEvents: Array<object>;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const FavoriteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    favorites: {
      type: Array,
      items: {
        type: Object,
        properties: {
          name: String,
          date: Date,
          country: String,
          city: String,
        },
      },
    },
    link: {
      type: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Favorite = model<FavoriteDocument>("favorites", FavoriteSchema);

export default Favorite;

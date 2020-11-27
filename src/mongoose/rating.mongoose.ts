import mongoose from "mongoose";
import { IRating } from "../models/rating.model";

const ratingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "user"
    },
    productId: {
      type: mongoose.Types.ObjectId,
      required: true
    },
    rating: {
      type: Number,
      required: true,
      validate: {
        validator: (rating: number) => {
          return rating <= 5 && rating >= 0;
        }
      }
    }
  },
  { timestamps: true }
);

export const RatingModel = mongoose.model<IRating>("rating", ratingSchema);

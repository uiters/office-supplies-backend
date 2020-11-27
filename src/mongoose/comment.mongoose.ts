import mongoose from "mongoose";
import { IComment } from "../models/comments.model";

const commentSchema = new mongoose.Schema(
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
    comment: {
      type: String,
      required: true,
      validate: {
        validator: (value: string) => {
          return value.length <= 100;
        }
      }
    }
  },
  { timestamps: true }
);

export const CommentModel = mongoose.model<IComment>("comment", commentSchema);

import { Document } from "mongoose";

export interface IComment extends Document {
  userId: string;
  productId: string;
  comment: string;
}
export interface ICommentModel {
  userId: string;
  productId: string;
  comment: string;
}

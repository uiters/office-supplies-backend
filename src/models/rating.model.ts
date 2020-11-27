import { Document } from "mongoose";

export interface IRating extends Document {
  userId: string;
  productId: string;
  rating: number;
}

export interface IRatingModel {
  userId: string;
  productId: string;
  rating: number;
}

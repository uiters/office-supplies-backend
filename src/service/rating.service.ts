import { IRatingModel, IRating } from "../models/rating.model";
import { RatingModel } from "../mongoose/rating.mongoose";

interface IRatingService {
  createRating: (rate: IRatingModel) => Promise<IRating>;
  deleteRating: (id: string) => Promise<IRating>;
  updateRating: (id: string, rateNum: number) => Promise<IRating>;

  getRatings: () => Promise<IRating[]>;
  calculateRating: (productId: string) => Promise<string>;
  //   getRatingById: (id: string) => Promise<IRating>;
}
export default class RatingService implements IRatingService {
  public async createRating(rate: IRatingModel) {
    const newRating = await RatingModel.create({
      userId: rate.userId,
      productId: rate.productId,
      rating: rate.rating
    });
    return newRating;
  }
  public async deleteRating(id: string) {
    const deletedRating = await RatingModel.findByIdAndDelete(id);
    return deletedRating;
  }

  public async updateRating(id: string, rateNum: number) {
    const foundRating = await RatingModel.findById(id);
    if (!foundRating) return null;
    foundRating.rating = rateNum;
    const updatedRating = await foundRating.save();
    return updatedRating;
  }

  public async getRatings() {
    const foundRatings = await RatingModel.find().populate("userId", "email");
    return foundRatings;
  }

  public async calculateRating(productId: string) {
    const ratings = await RatingModel.find({ productId });
    let ratePoints: any = ratings.reduce((acc, value) => acc + value.rating, 0);
    ratePoints = (ratePoints / ratings.length).toFixed(2);
    return ratePoints;
  }
}

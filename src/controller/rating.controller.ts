import { AuthRequest } from "../types/utils";
import { Response, NextFunction } from "express";
import RatingService from "../service/rating.service";

const ratingService = new RatingService();
export default class RatingController {
  public async createRating(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { _id } = req.user;
      const userId = _id;
      const { productId, rating } = req.body;
      const newRating = await ratingService.createRating({
        userId,
        productId,
        rating
      });
      if (!newRating) return res.status(400).json("Failed");
      res.status(200).json(newRating);
    } catch (error) {
      res.status(400).json("Failed");
    }
    return next();
  }
  public async getRatings(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const ratings = await ratingService.getRatings();
      if (!ratings) return res.status(400).json("Failed");
      res.status(200).json(ratings);
    } catch (error) {
      res.status(400).json("Failed");
    }
    return next();
  }

  public async deletedRating(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const deletedRating = await ratingService.deleteRating(id);
      if (!deletedRating) return res.status(404).json("Not found");
      res.status(200).json(deletedRating);
    } catch (error) {
      res.status(400).json("Failed");
    }
    return next();
  }
}

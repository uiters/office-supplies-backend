import express from "express";
import RatingController from "../controller/rating.controller";
import { authJwt } from "../config/passport";

const router = express.Router();
const ratingController = new RatingController();

router.get("/", ratingController.getRatings);

router.post("/", authJwt, ratingController.createRating);
router.delete("/:id", authJwt, ratingController.deletedRating);

export default router;

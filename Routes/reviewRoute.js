import express from "express";
import {
  getAllReviews,
  createReview,
} from "../Controllers/reviewController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

const reviewRouter = express.Router({ mergeParams: true }); //[note: mergeParams: true for nested route]

reviewRouter
  .route("/")
  .get(getAllReviews)
  .post(authenticate, restrict(["patient"]), createReview);

export default reviewRouter;

import Router from "express";
import {
  newreview,
  getallreviews,
  getReview,
  deleteReview,
  updateReviewDetails,
} from "../controllers/reviewcontroller";

const review_router = Router();

review_router.post("/addreview", newreview);
review_router.get("/getallreviews", getallreviews);
review_router.get("/getonereview", getReview);
review_router.put("/updatereview", updateReviewDetails);
review_router.delete("/deletereview/:reviewID", deleteReview);

export default review_router;

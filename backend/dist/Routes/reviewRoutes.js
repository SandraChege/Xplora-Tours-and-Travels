"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reviewcontroller_1 = require("../controllers/reviewcontroller");
const review_router = (0, express_1.default)();
review_router.post("/addreview", reviewcontroller_1.newreview);
review_router.get("/getallreviews", reviewcontroller_1.getallreviews);
review_router.get("/getonereview", reviewcontroller_1.getReview);
review_router.put("/updatereview", reviewcontroller_1.updateReviewDetails);
review_router.delete("/deletereview/:reviewID", reviewcontroller_1.deleteReview);
exports.default = review_router;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReview = exports.updateReviewDetails = exports.getReview = exports.getallreviews = exports.newreview = void 0;
const reviewValidators_1 = require("../Validators/reviewValidators");
const uuid_1 = require("uuid");
const dbHelper_1 = require("../helpers/dbHelper");
//ADD REVIEW
const newreview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { reviewContent, userID, tourID } = req.body;
        //console.log(req.body);
        const { error } = reviewValidators_1.addreviewValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        //console.log(error);
        let reviewID = (0, uuid_1.v4)();
        const procedureName2 = "addreviews";
        const params = {
            reviewID,
            reviewContent,
            userID,
            tourID,
        };
        console.log(params);
        yield (0, dbHelper_1.execute)(procedureName2, params);
        res.status(200).json({
            message: "Review added successfully",
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.newreview = newreview;
//GET ALL TOURS
const getallreviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const procedureName = "getAllReviews";
        const result = yield (0, dbHelper_1.query)(`EXEC ${procedureName}`);
        return res.json(result.recordset);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getallreviews = getallreviews;
//GET ONE REVIEW
const getReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { reviewID } = req.body;
        //console.log(tourID);
        if (!reviewID)
            return res.status(400).send({ message: `Id is ${reviewID}` });
        const { error } = reviewValidators_1.validaterReviewId.validate(req.body);
        if (error)
            return res.send({ message: error.details[0].message });
        const procedureName = "getReviewById";
        const result = yield (0, dbHelper_1.execute)(procedureName, { reviewID });
        res.json(result.recordset[0]);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getReview = getReview;
//UPDATE REVIEW
const updateReviewDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { reviewID, reviewContent } = req.body;
        if (reviewID || reviewContent) {
            const updatereviewDetails = {
                reviewID,
                reviewContent,
            };
            const updatereviewprocedureName = "updateReviewDetails";
            const params = updatereviewDetails;
            yield (0, dbHelper_1.execute)(updatereviewprocedureName, params);
            res.send("Updated review Successfully");
        }
        else {
            return res.send({
                error: "reviewID required details",
            });
        }
    }
    catch (error) {
        console.error("Error updating tour details:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.updateReviewDetails = updateReviewDetails;
//DELETE REVIEW
const deleteReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("mmw");
        const { reviewID } = req.params;
        console.log("hello");
        if (!reviewID) {
            return res.send({ message: "enter id" });
        }
        console.log(`review id IS:${reviewID}`);
        const result = yield (0, dbHelper_1.execute)("deleteReview", { reviewID });
        console.log(result.recordset);
        res.send({ message: "Review deleted successfuly" });
    }
    catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
});
exports.deleteReview = deleteReview;

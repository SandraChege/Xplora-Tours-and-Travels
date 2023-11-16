import { Request, Response } from "express";
import mssql from "mssql";
import {
  addreviewValidationSchema,
  validaterReviewId,
} from "../Validators/reviewValidators";
import { v4 } from "uuid";
import { execute, query } from "../helpers/dbHelper";
import { ExtendedUser } from "../middelwares/verifytoken";
import { reviewDetails } from "../interface/reviewDetails";

//ADD REVIEW
export const newreview = async (req: Request, res: Response) => {
  try {
    let { reviewContent, userID, tourID } = req.body;

    //console.log(req.body);

    const { error } = addreviewValidationSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    //console.log(error);

    let reviewID = v4();
    const procedureName2 = "addreviews";
    const params = {
      reviewID,
      reviewContent,
      userID,
      tourID,
    };
    console.log(params);

    await execute(procedureName2, params);

    res.status(200).json({
      message: "Review added successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

//GET ALL TOURS
export const getallreviews = async (req: ExtendedUser, res: Response) => {
  try {
    const procedureName = "getAllReviews";
    const result = await query(`EXEC ${procedureName}`);
    return res.json(result.recordset);
  } catch (error) {
    console.log(error);
  }
};

//GET ONE REVIEW
export const getReview = async (req: Request, res: Response) => {
  try {
    const { reviewID } = req.body;
    //console.log(tourID);
    if (!reviewID)
      return res.status(400).send({ message: `Id is ${reviewID}` });

    const { error } = validaterReviewId.validate(req.body);

    if (error) return res.send({ message: error.details[0].message });

    const procedureName = "getReviewById";
    const result = await execute(procedureName, { reviewID });

    res.json(result.recordset[0]);
  } catch (error) {
    console.log(error);
  }
};

//UPDATE REVIEW
export const updateReviewDetails = async (req: Request, res: Response) => {
  try {
    const { reviewID, reviewContent } = req.body;

    if (reviewID || reviewContent) {
      const updatereviewDetails: reviewDetails = {
        reviewID,
        reviewContent,
      };

      const updatereviewprocedureName = "updateReviewDetails";
      const params = updatereviewDetails;

      await execute(updatereviewprocedureName, params);

      res.send("Updated review Successfully");
    } else {
      return res.send({
        error: "reviewID required details",
      });
    }
  } catch (error) {
    console.error("Error updating tour details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//DELETE REVIEW
export const deleteReview = async (req: Request, res: Response) => {
  try {
    console.log("mmw");

    const { reviewID } = req.params;
    console.log("hello");

    if (!reviewID) {
      return res.send({ message: "enter id" });
    }
    console.log(`review id IS:${reviewID}`);

    const result = await execute("deleteReview", { reviewID });

    console.log(result.recordset);

    res.send({ message: "Review deleted successfuly" });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

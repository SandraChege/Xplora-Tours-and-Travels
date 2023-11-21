import { Request, Response } from "express";
import mssql from "mssql";
import {
  bookingValidation,
  validateBookID,
} from "../Validators/bookValidators";
import { v4 } from "uuid";
import { execute, query } from "../helpers/dbHelper";
import { ExtendedUser } from "../middelwares/verifytoken";
import { bookingDetails } from "../interface/bookingDetails";

//CREATE BOOKINGS
export const newbooking = async (req: Request, res: Response) => {
  try {
    let { userID, tourID, totalprice, totalBookCount } = req.body;

    console.log(req.body);

    const { error } = bookingValidation.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    let bookID = v4();
    const procedureName2 = "createnewbookings";
    const params = {
      tourID,
      userID,
      totalprice,
      totalBookCount,
      bookID,
    };

    await execute(procedureName2, params);

    res.status(200).json({
      message: "Booking added successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

//GET ALL BOOKINGS
export const getallbookings = async (req: ExtendedUser, res: Response) => {
  try {
    const procedureName = "getAllBookings";
    const result = await query(`EXEC ${procedureName}`);
    return res.json(result.recordset);
  } catch (error) {
    console.log(error);
  }
};

//GET ONE BOOKING
export const getBooking = async (req: Request, res: Response) => {
  try {
    const { bookID } = req.body;
    //console.log(tourID);
    if (!bookID) return res.status(400).send({ message: `Id is ${bookID}` });

    const { error } = validateBookID.validate(req.body);

    if (error) return res.send({ message: error.details[0].message });

    const procedureName = "getBookingById";
    const result = await execute(procedureName, { bookID });

    res.json(result.recordset);
  } catch (error) {
    console.log(error);
  }
};

//UPDATE BOOKING
export const updateBookingDetails = async (req: Request, res: Response) => {
  try {
    const { userID, tourID, totalprice, totalBookCount, bookID } = req.body;

    if (tourID || userID || totalprice || totalBookCount || bookID) {
      const updatebookingDetails: bookingDetails = {
        tourID,
        userID,
        totalprice,
        totalBookCount,
        bookID,
      };

      const updatebookingprocedureName = "updatebookingDetails";
      const params = updatebookingDetails;
      
      console.log(updatebookingDetails);
      

      await execute(updatebookingprocedureName, params);

      return res.status(200).json({ message: "Booking Updated Successfully" });
    } else {
      return res.send({
        error: "Enter required booking details",
      });
    }

  } catch (error) {
    console.error("Error updating booking details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//DELETE TOUR
export const deleteBooking = async (req: Request, res: Response) => {
  try {
    const { bookID } = req.params;

    if (!bookID) {
      return res.send({ message: "enter id" });
    }
    console.log(`tour id IS:${bookID}`);

    const result = await execute("deleteBooking", { bookID });

    console.log(result.recordset);

    res.send({ message: "booking deleted successfuly" });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};


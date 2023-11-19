import { Request, Response } from "express";
import mssql from "mssql";
import {
  addtourValidationSchema,
  validateTourId,
} from "../Validators/tourValidators";
import { v4 } from "uuid";
import { execute, query } from "../helpers/dbHelper";
import { tourDetails } from "../interface/tourDetails";
import { ExtendedUser } from "../middelwares/verifytoken";

//CREATE TOURS
export const newtour = async (req: Request, res: Response) => {
  try {
    let {
      imageUrl,
      tourName,
      tourDescription,
      tourPrice,
      tourStartDate,
      tourEndDateName,
      tourCount,
    } = req.body;

    console.log(req.body);

    const { error } = addtourValidationSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    let tourID = v4();
    const procedureName2 = "addtour";
    const params = {
      tourID,
      imageUrl,
      tourName,
      tourDescription,
      tourPrice,
      tourStartDate,
      tourEndDateName,
      tourCount,
    };

    await execute(procedureName2, params);

    res.status(200).json({
      message: "Tour added successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

//GET ALL TOURS
export const getalltours = async (req: ExtendedUser, res: Response) => {
  try {
    const procedureName = "getAllTours";
    const result = await query(`EXEC ${procedureName}`);
    return res.json(result.recordset);
  } catch (error) {
    console.log(error);
  }
};

//GET ONE TOUR
export const getTour = async (req: Request, res: Response) => {
  try {
    const { tourID } = req.body;
    //console.log(tourID);
    if (!tourID) return res.status(400).send({ message: `Id is ${tourID}` });

    const { error } = validateTourId.validate(req.body);

    if (error) return res.send({ message: error.details[0].message });

    const procedureName = "getTourById";
    const result = await execute(procedureName, { tourID });

    res.json(result.recordset[0]);
  } catch (error) {
    console.log(error);
  }
};

//UPDATE TOUR
export const updateTourDetails = async (req: Request, res: Response) => {
  try {
    const {
      tourID,
      imageUrl,
      tourName,
      tourDescription,
      tourPrice,
      tourStartDate,
      tourEndDateName,
      tourCount,
    } = req.body;

    if (
      tourID ||
      imageUrl ||
      tourName ||
      tourDescription ||
      tourPrice ||
      tourStartDate ||
      tourEndDateName ||
      tourCount
    ) {
      const updateTourDetails: tourDetails = {
        tourID,
        imageUrl,
        tourName,
        tourDescription,
        tourPrice,
        tourStartDate,
        tourEndDateName,
        tourCount,
      };

      const updatetourprocedureName = "updateTourDetails";
      const params = updateTourDetails;

      await execute(updatetourprocedureName, params);

      res.send("Updated Successfully");
    } else {
      return res.send({
        error: "Enter required details",
      });
    }
  } catch (error) {
    console.error("Error updating tour details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
//DELETE TOUR
export const deleteTour = async (req: Request, res: Response) => {
  try {
    const { tourID } = req.params;

    if (!tourID) {
      return res.send({ message: "enter id" });
    }
    console.log(`tour id IS:${tourID}`);

    const result = await execute("deletetour", { tourID });

    console.log(result.recordset);

    res.send({ message: "tour deleted successfuly" });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

//update tour
// export const up = async (req: Request, res: Response) => {
//   const { tourId } = req.params;

//   const(tourName, tourDescription, tourPrice, tourStartDate,
// tourEndDateName,
//     tourCount) = req.body

//   const pool = await mssql.connect(sqlConfig)
//   const pool = await pool.request()
//     .input('tourName', tourName)
//     .input('tourDescription', tourDescription)
//     .input('tourPrice', tourPrice)
//     .input('tourStartDate', tourStartDate)
//     .input('tourEndDateName', tourEndDateName)
//     .input('tourCount', tourCount)
//       .execute(updateTourDetails)
// }

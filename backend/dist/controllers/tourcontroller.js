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
exports.deleteTour = exports.updateTourDetails = exports.getTour = exports.getalltours = exports.newtour = void 0;
const tourValidators_1 = require("../Validators/tourValidators");
const uuid_1 = require("uuid");
const dbHelper_1 = require("../helpers/dbHelper");
//CREATE TOURS
const newtour = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { imageUrl, tourName, tourDescription, tourPrice, tourStartDate, tourEndDateName, tourCount, } = req.body;
        console.log(req.body);
        const { error } = tourValidators_1.addtourValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        let tourID = (0, uuid_1.v4)();
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
        yield (0, dbHelper_1.execute)(procedureName2, params);
        res.status(200).json({
            message: "Tour added successfully",
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.newtour = newtour;
//GET ALL TOURS
const getalltours = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const procedureName = "getAllTours";
        const result = yield (0, dbHelper_1.query)(`EXEC ${procedureName}`);
        return res.json(result.recordset);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getalltours = getalltours;
//GET ONE TOUR
const getTour = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tourID } = req.body;
        //console.log(tourID);
        if (!tourID)
            return res.status(400).send({ message: `Id is ${tourID}` });
        const { error } = tourValidators_1.validateTourId.validate(req.body);
        if (error)
            return res.send({ message: error.details[0].message });
        const procedureName = "getTourById";
        const result = yield (0, dbHelper_1.execute)(procedureName, { tourID });
        res.json(result.recordset[0]);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getTour = getTour;
//UPDATE TOUR
const updateTourDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tourID, imageUrl, tourName, tourDescription, tourPrice, tourStartDate, tourEndDateName, tourCount, } = req.body;
        if (tourID ||
            imageUrl ||
            tourName ||
            tourDescription ||
            tourPrice ||
            tourStartDate ||
            tourEndDateName ||
            tourCount) {
            const updateTourDetails = {
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
            yield (0, dbHelper_1.execute)(updatetourprocedureName, params);
            res.send("Updated Successfully");
        }
        else {
            return res.send({
                error: "Enter required details",
            });
        }
    }
    catch (error) {
        console.error("Error updating tour details:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.updateTourDetails = updateTourDetails;
//DELETE TOUR
const deleteTour = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tourID } = req.params;
        if (!tourID) {
            return res.send({ message: "enter id" });
        }
        console.log(`tour id IS:${tourID}`);
        const result = yield (0, dbHelper_1.execute)("deleteUser", { tourID });
        console.log(result.recordset);
        res.send({ message: "user deleted successfuly" });
    }
    catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
});
exports.deleteTour = deleteTour;
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

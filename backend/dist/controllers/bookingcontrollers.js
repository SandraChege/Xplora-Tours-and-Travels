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
exports.deleteBooking = exports.updateBookingDetails = exports.getBooking = exports.getallbookings = exports.newbooking = void 0;
const bookValidators_1 = require("../Validators/bookValidators");
const uuid_1 = require("uuid");
const dbHelper_1 = require("../helpers/dbHelper");
//CREATE BOOKINGS
const newbooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { userID, tourID, totalprice, totalBookCount } = req.body;
        console.log(req.body);
        const { error } = bookValidators_1.bookingValidation.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        let bookID = (0, uuid_1.v4)();
        const procedureName2 = "createnewbookings";
        const params = {
            tourID,
            userID,
            totalprice,
            totalBookCount,
            bookID,
        };
        yield (0, dbHelper_1.execute)(procedureName2, params);
        res.status(200).json({
            message: "Booking added successfully",
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.newbooking = newbooking;
//GET ALL BOOKINGS
const getallbookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const procedureName = "getAllBookings";
        const result = yield (0, dbHelper_1.query)(`EXEC ${procedureName}`);
        return res.json(result.recordset);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getallbookings = getallbookings;
//GET ONE BOOKING
const getBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookID } = req.body;
        //console.log(tourID);
        if (!bookID)
            return res.status(400).send({ message: `Id is ${bookID}` });
        const { error } = bookValidators_1.validateBookID.validate(req.body);
        if (error)
            return res.send({ message: error.details[0].message });
        const procedureName = "getBookingById";
        const result = yield (0, dbHelper_1.execute)(procedureName, { bookID });
        res.json(result.recordset[0]);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getBooking = getBooking;
//UPDATE BOOKING
const updateBookingDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, tourID, totalprice, totalBookCount, bookID } = req.body;
        if (tourID || userID || totalprice || totalBookCount || bookID) {
            const updatebookingDetails = {
                tourID,
                userID,
                totalprice,
                totalBookCount,
                bookID,
            };
            const updatebookingprocedureName = "updatebookingDetails";
            const params = updatebookingDetails;
            yield (0, dbHelper_1.execute)(updatebookingprocedureName, params);
            res.send("Booking Updated Successfully");
        }
        else {
            return res.send({
                error: "Enter required booking details",
            });
        }
    }
    catch (error) {
        console.error("Error updating booking details:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.updateBookingDetails = updateBookingDetails;
//DELETE TOUR
const deleteBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookID } = req.params;
        if (!bookID) {
            return res.send({ message: "enter id" });
        }
        console.log(`tour id IS:${bookID}`);
        const result = yield (0, dbHelper_1.execute)("deleteBooking", { bookID });
        console.log(result.recordset);
        res.send({ message: "booking deleted successfuly" });
    }
    catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
});
exports.deleteBooking = deleteBooking;

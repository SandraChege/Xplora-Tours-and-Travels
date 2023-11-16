"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookingcontrollers_1 = require("../controllers/bookingcontrollers");
const booking_router = (0, express_1.default)();
booking_router.post("/addbooking", bookingcontrollers_1.newbooking);
booking_router.get("/getallbookings", bookingcontrollers_1.getallbookings);
booking_router.get("/getonebooking", bookingcontrollers_1.getBooking);
booking_router.put("/updatebooking", bookingcontrollers_1.updateBookingDetails);
booking_router.delete("/deletebooking/:bookID", bookingcontrollers_1.deleteBooking);
exports.default = booking_router;

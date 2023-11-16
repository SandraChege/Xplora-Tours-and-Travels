import Router from "express";
import { newbooking, getallbookings, getBooking, updateBookingDetails, deleteBooking } from "../controllers/bookingcontrollers";

const booking_router = Router();

booking_router.post("/addbooking", newbooking);
booking_router.get("/getallbookings", getallbookings);
booking_router.get("/getonebooking", getBooking);
booking_router.put("/updatebooking", updateBookingDetails);
booking_router.delete("/deletebooking/:bookID", deleteBooking);

export default booking_router;
import Router from "express";
import {
  deleteTour,
  getTour,
  getalltours,
  newtour,
  updateTourDetails,
} from "../controllers/tourcontroller";

const tour_router = Router();

tour_router.post("/addtour", newtour);
tour_router.get("/getalltours", getalltours);
tour_router.get("/gettour", getTour);
tour_router.put("/updatetour", updateTourDetails);
tour_router.delete("/deletetour/:tourID", deleteTour);

export default tour_router;

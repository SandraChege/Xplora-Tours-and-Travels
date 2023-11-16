"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tourcontroller_1 = require("../controllers/tourcontroller");
const tour_router = (0, express_1.default)();
tour_router.post("/addtour", tourcontroller_1.newtour);
tour_router.get("/getalltours", tourcontroller_1.getalltours);
tour_router.get("/gettour", tourcontroller_1.getTour);
tour_router.put("/updatetour", tourcontroller_1.updateTourDetails);
tour_router.delete("/deletetour/:tourID", tourcontroller_1.deleteTour);
exports.default = tour_router;

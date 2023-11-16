import { NextFunction, Request, Response, json, urlencoded } from "express";
import express from "express";
import dotenv from "dotenv";
import user_router from "./Routes/userRoutes";
import cors from "cors";
import tour_router from "./Routes/tourRoutes";
import review_router from "./Routes/reviewRoutes";

dotenv.config();
const port = process.env.PORT;

const app = express();
app.use(json());
app.use(cors());
app.use(urlencoded({ extended: true }));

app.use("/user", user_router);
app.use("/tour", tour_router);
app.use("/review", review_router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.json({
    error: err.message,
  });
});

app.listen(port, () => {
  console.log(`Xplora Tours is running on port ${port}`);
});

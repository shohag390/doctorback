import express from "express";
import { authenticate, restrict } from "../auth/verifyToken.js";
import {
  createAppointment,
  getAllBooking,
} from "../Controllers/bookingController.js";

const bookingRouter = express.Router();
bookingRouter.get("/booking", getAllBooking);

bookingRouter.post(
  "/booking/:id",
  authenticate,
  restrict(["patient"]),
  createAppointment
);

export default bookingRouter;

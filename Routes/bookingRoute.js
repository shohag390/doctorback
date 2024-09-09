import express from "express";
import { authenticate } from "../auth/verifyToken.js";
import { getCheckoutSession } from "../Controllers/bookingController.js";

const bookingRouter = express.Router();

bookingRouter.post(
  "/checkout-session/:doctorId",
  authenticate,
  getCheckoutSession
);

export default bookingRouter;

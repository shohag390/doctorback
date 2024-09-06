import express from "express";

import {
  updateDoctor,
  deleteDoctor,
  getAllDoctor,
  getSingleDoctor,
  getDoctorProfile,
} from "../Controllers/doctorController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";
import reviewRouter from "./reviewRoute.js";

const doctorRouter = express.Router();

//nested router
doctorRouter.use("/:doctorId/reviews", reviewRouter);

doctorRouter.get("/", getAllDoctor);
doctorRouter.get("/:id", getSingleDoctor);
doctorRouter.put("/:id", authenticate, restrict(["doctor"]), updateDoctor);
doctorRouter.delete("/:id", authenticate, restrict(["doctor"]), deleteDoctor);
doctorRouter.get(
  "/profile/me",
  authenticate,
  restrict(["doctor"]),
  getDoctorProfile
);

export default doctorRouter;

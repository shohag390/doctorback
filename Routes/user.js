import express from "express";
import {
  updateUser,
  deleteUser,
  getSingleUser,
  getAllUser,
  getUserProfile,
  getMyAppointments,
} from "../Controllers/userController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

const userRouter = express.Router();

userRouter.get("/:id", authenticate, restrict(["patient"]), getSingleUser);
userRouter.get("/", authenticate, restrict(["patient"]), getAllUser);
userRouter.get(
  "/profile/me",
  authenticate,
  restrict(["patient"]),
  getUserProfile
);
userRouter.get(
  "/appointments/my-appointment",
  authenticate,
  restrict(["patient"]),
  getMyAppointments
);
userRouter.put("/:id", authenticate, restrict(["patient"]), updateUser);
userRouter.delete("/:id", authenticate, restrict(["patient"]), deleteUser);

export default userRouter;

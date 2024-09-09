import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./Routes/authRoute.js";
import userRouter from "./Routes/user.js";
import doctorRouter from "./Routes/doctor.js";
import reviewRouter from "./Routes/reviewRoute.js";
import bookingRouter from "./Routes/bookingRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
  origin: true,
};

app.get("/", (req, res) => {
  res.send("Api is working");
});

// Database Connection
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB database is connected");
  } catch (error) {
    console.log("MongoDB database connection faild");
  }
};

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/doctors", doctorRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/booking", bookingRouter);

app.listen(port, () => {
  connectDB();
  console.log(`server is running at http://localhost:${port}`);
});

// mdshohagali1539
// FcHfka1oMycho59f

// http://localhost:5000/api/v1/user

// JWT_SECRET_KEY GENARATE
// require('crypto').randomBytes(64).toString('hex')

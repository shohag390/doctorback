import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";
import User from "../models/UserSchema.js";

//create Appointment
export const createAppointment = async (req, res) => {
  const doctorId = req.params.id;
  const newBooking = new Booking({
    ...req.body,
    doctor: doctorId,
    user: req.userId,
  });

  try {
    const booking = await newBooking.save();

    await Doctor.updateOne(
      {
        _id: doctorId,
      },
      {
        $push: {
          appointments: booking._id,
        },
      }
    );

    await User.updateOne(
      {
        _id: req.userId,
      },
      {
        $push: { appointments: booking._id },
      }
    );

    res.status(200).json({
      success: true,
      message: "Appointment submited",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "There was a server site error",
    });
  }
};

export const getAllBooking = async (req, res) => {
  try {
    const booking = await Booking.find({})
      .populate("user")
      .populate("doctor", "name photo specialization");

    res.status(200).json({
      success: true,
      message: "Successful get All Booking",
      data: booking,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Not found All booking",
    });
  }
};

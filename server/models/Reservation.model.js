import mongoose from 'mongoose';

const ReservationSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      required: true,
    },
    hotelID: {
      type: String,
      required: true,
    },
    roomID: {
      type: String,
      required: true,
    },
    checkInDate: {
      type: Date,
      required: true,
    },
    checkOutDate: {
      type: Date,
      required: true,
    },
    services: {
      type: [Object],
    }
  },
  { timestamps: true }
)

export default mongoose.model("Reservation", ReservationSchema);
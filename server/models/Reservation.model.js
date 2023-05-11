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
    },
    checkInDate: {
      type: Number,
      required: true,
    },
    checkOutDate: {
      type: Number,
      required: true,
    },
    services: {
      type: [Object],
    }
  },
  { timestamps: true }
)

export default mongoose.model("Reservation", ReservationSchema);
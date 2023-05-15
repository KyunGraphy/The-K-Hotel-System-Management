import mongoose from 'mongoose';

const ReservationSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    hotelID: {
      type: String,
      required: true,
    },
    adult: {
      type: Number,
      required: true,
      min: 1,
    },
    children: {
      type: Number,
      required: true,
      min: 0,
    },
    singleRoom: {
      type: Number,
      required: true,
      min: 0,
    },
    doubleRoom: {
      type: Number,
      required: true,
      min: 0,
    },
    isOnline: {
      type: Boolean,
      required: true,
    },
    roomID: {
      type: [String],
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
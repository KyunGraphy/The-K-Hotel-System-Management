import mongoose from 'mongoose';

const ReservationSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
    },
    name: {
      type: String,
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
    rooms: {
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
    isCheckIn: {
      type: Boolean,
      default: false,
    },
    isCheckOut: {
      type: Boolean,
      default: false,
    },
    services: {
      type: [{
        serviceId: {
          type: String,
        },
        quantity: {
          type: Number,
        }
      }],
    }
  },
  { timestamps: true }
)

export default mongoose.model("Reservation", ReservationSchema);

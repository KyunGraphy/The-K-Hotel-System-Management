import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema(
  {
    number: {
      type: String,
      required: true,
    },
    type: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
      required: true,
    },
    unavailableDate: {
      type: [Date],
    }
  },
  { timestamps: true }
)

export default mongoose.model("Room", RoomSchema);
import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema(
  {
    number: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    unavailableDate: {
      type: [Date],
    }
  },
  { timestamps: true }
)

export default mongoose.model("Room", RoomSchema);
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
      type: String,
      required: true,
      default: 'Maintenance',
    },
    unavailableDate: {
      type: [Number],
    },
    facility: {
      type: [{
        facilityId: {
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

export default mongoose.model("Room", RoomSchema);
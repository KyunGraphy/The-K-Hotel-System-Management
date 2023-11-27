import mongoose from "mongoose";

const FacilitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    default: 0,
    required: true,
  },
  using: {
    type: Number,
    default: 0,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
})

export default mongoose.model('Facility', FacilitySchema);
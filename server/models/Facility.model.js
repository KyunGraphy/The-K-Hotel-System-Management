import mongoose from "mongoose";

const FacilitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    }
  },
  unitPurchasePrice: {
    type: Number,
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
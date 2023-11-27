import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  serviceName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  unit: {
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
  capacity: {
    type: Number,
    required: true,
  },
})

export default mongoose.model('Service', ServiceSchema);

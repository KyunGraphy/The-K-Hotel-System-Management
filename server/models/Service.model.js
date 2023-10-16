import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  serviceName: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  }
})

export default mongoose.model('Service', ServiceSchema);

import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  name: {
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
  unitPurchasePrice: {
    type: Number,
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

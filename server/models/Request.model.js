import mongoose from 'mongoose';

const RequestSchema = new mongoose.Schema(
  {
    itemId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    isService: {
      type: Boolean,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    inCart: {
      type: Boolean,
    },
    isFromShop: {
      type: Boolean,
    },
  },
  { timestamps: true },
);

export default mongoose.model('Request', RequestSchema);

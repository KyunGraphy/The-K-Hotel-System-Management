import mongoose from 'mongoose';

const RequestSchema = new mongoose.Schema({
  itemId: {
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
  isDone: {
    type: Boolean,
    default: false,
  }
});

export default mongoose.model('Request', RequestSchema);

import mongoose from 'mongoose';

const BillSchema = new mongoose.Schema({
  billID: {
    type: String,
  },
  isReservation: {
    type: Boolean,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  }
}, {
  timestamps: true,
});

export default mongoose.model('BillSchema', BillSchema);
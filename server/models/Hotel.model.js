import mongoose from 'mongoose';

const HotelSchema = new mongoose.Schema({
  department: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  photos: {
    type: [String],
  },
  description: {
    type: String,
    required: true,
  },
  rooms: {
    type: [String],
  },
})

export default mongoose.model("Hotel", HotelSchema);
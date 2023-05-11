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
    public_id: {
      type: String,
    },
    url: {
      type: String,
    }
  },
  description: {
    type: String,
    required: true,
  },
  rooms: {
    type: [String],
  },
  comments: {
    type: [String],
  },
})

export default mongoose.model("Hotel", HotelSchema);
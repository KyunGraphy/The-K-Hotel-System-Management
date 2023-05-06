import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  hotelID: {
    type: String,
    require: true,
  },
  userID: {
    type: String,
    require: true,
  },
  rating: {
    type: Number,
    require: true,
  },
  description: {
    type: String,
  },
}, {
  timestamps: true,
})

export default mongoose.model('Comments', CommentSchema);
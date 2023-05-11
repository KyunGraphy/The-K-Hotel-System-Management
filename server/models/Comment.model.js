import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
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
    require: true,
  },
}, {
  timestamps: true,
})

export default mongoose.model('Comment', CommentSchema);
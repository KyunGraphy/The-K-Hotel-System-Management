import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
    required: true,
  },
  country: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
  },
  salary: {
    type: Number,
  },
}, {
  timestamps: true,
})

export default mongoose.model("User", UserSchema);
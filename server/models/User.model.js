import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  profilePicture: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    }
  },
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
  creditCard: {
    type: String,
  },
  visaCard: {
    type: String,
  },
  paypal: {
    type: String,
  },
  country: {
    common: {
      type: String
    },
    flags: {
      type: String
    }
  },
  lang: {
    type: String,
    default: 'eng',
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  hotelId: {
    type: String,
  },
  role: {
    type: String,
  },
  adminId: {
    type: String,
    unique: true,
  },
  salary: {
    type: Number,
  },
}, {
  timestamps: true,
})

export default mongoose.model("User", UserSchema);
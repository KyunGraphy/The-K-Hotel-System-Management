import mongoose from "mongoose";

const FacilitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
})

export default mongoose.model('Facility', FacilitySchema);
import mongoose from "mongoose";

const FacilitySchema = new mongoose.Schema({
  facilityName: {
    type: String,
    required: true,
  },
})

export default mongoose.model('Facility', FacilitySchema);
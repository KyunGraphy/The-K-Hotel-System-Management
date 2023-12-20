import Facility from '../models/Facility.model.js';
import Room from '../models/Room.model.js';
import cloudinary from "../utils/cloudinary.js"

export const getAllFacilities = async (req, res, next) => {
  try {
    const facilities = await Facility.find();
    res.status(200).json(facilities);
  } catch (err) {
    next(err);
  }
};

export const getOneFacility = async (req, res, next) => {
  try {
    const facility = await Facility.findById(req.params.facilityId);
    res.status(200).json(facility)
  } catch (err) {
    next(err);
  }
};

export const createFacility = async (req, res, next) => {
  try {
    const result = await cloudinary.uploader.upload(req.body.facilityImg, {
      folder: "facility",
    })

    const newFacility = new Facility({
      name: req.body.name,
      capacity: Number(req.body.capacity),
      img: {
        public_id: result.public_id,
        url: result.secure_url,
      },
      using: 0,
      amount: 0,
    })
    await newFacility.save();
    res.status(200).json(newFacility);
  } catch (err) {
    next(err);
  }
};

export const deleteFacility = async (req, res, next) => {
  try {
    await Facility.findByIdAndDelete(req.params.facilityId)
    res.status(200).json({
      message: 'Facility deleted successfully'
    })
  } catch (err) {
    next(err);
  }
};

export const getRoomFacility = async (req, res, next) => {
  try {
    const data = await Room.findById(req.params.roomId);
    const roomFacilityList = await Promise.all(
      data.facility.map(item => Facility.findById(item.facilityId))
    )
    res.status(200).json(roomFacilityList);
  } catch (err) {
    next(err);
  }
};

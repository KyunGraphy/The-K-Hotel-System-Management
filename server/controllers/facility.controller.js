import Facility from '../models/Facility.model.js';

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
  const newFacility = new Facility(req.body)
  try {
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
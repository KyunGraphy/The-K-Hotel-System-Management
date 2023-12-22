import Facility from '../models/Facility.model.js';
import Request from '../models/Request.model.js';
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
      unitPurchasePrice: Number(req.body.unitPurchasePrice),
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

// Send request
export const facilityRequest = async (req, res, next) => {
  try {
    const isExisted = await Request.find({ itemId: req.body.itemId })

    if (isExisted.length === 0) {
      const newRequest = new Request({
        itemId: req.body.itemId,
        isService: false,
        quantity: Number(req.body.quantity),
        isDone: false,
      })
      await newRequest.save();
      res.status(200).json(newRequest);
    } else {
      const updateRequest = await Request.findByIdAndUpdate(
        isExisted[0]._id,
        {
          $set: {
            quantity: isExisted[0].quantity + Number(req.body.quantity)
          }
        },
        { new: true }
      )
      res.status(201).json(updateRequest);
    }
  } catch (err) {
    next(err);
  }
};

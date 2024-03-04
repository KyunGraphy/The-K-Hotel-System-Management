import { HTTPStatus } from '../constants/Constants.js';
import Facility from '../models/Facility.model.js';
import Hotel from '../models/Hotel.model.js';
import Room from '../models/Room.model.js';
import { createError } from "../utils/error.js";

export const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(HTTPStatus.OK).json(rooms);
  } catch (err) {
    next(err);
  }
};

export const getOneRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.roomId);
    res.status(HTTPStatus.OK).json(room);
  } catch (err) {
    next(err);
  }
};

export const createRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.hotelId);
    const roomsNum = await Promise.all(
      hotel.rooms.map(async (item) => {
        const room = await Room.findById(item);
        return room.number
      })
    )

    // Catch exceptions if room number is already exists
    if (roomsNum.includes(Number(req.body.number))) {
      return next(createError(HTTPStatus.NOT_ACCEPT, 'Room number is already existed!'))
    }

    // Create new room
    const newRoom = new Room(req.body);
    const savedRoom = await newRoom.save();

    await Hotel.findByIdAndUpdate(
      req.params.hotelId,
      { $push: { rooms: savedRoom._id } },
    )

    res.status(HTTPStatus.CREATED).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

export const updateRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.hotelId)
    if (req.body.number) {
      const roomsNum = await Promise.all(
        hotel.rooms.map(async (item) => {
          const room = await Room.findById(item)
          return room.number
        })
      )

      if (roomsNum.includes(req.body.number)) {
        return next(createError(HTTPStatus.FORBIDDEN, 'Room number is already existed!'))
      }
    }

    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.roomId,
      { $set: req.body },
      { new: true }
    )
    res.status(HTTPStatus.ACCEPTED).json(updatedRoom)
  } catch (err) {
    next(err);
  }
};

export const toggleStatusRooms = async (req, res) => {
  try {
    const { checked } = req.body;
    let status = checked ? 'Maintenance' : 'Available';

    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.roomId,
      { $set: { status } },
      { new: true }
    )
    res.status(HTTPStatus.ACCEPTED).json(updatedRoom)
  } catch (err) {
    res.status(HTTPStatus.FORBIDDEN).json({
      message: 'Something error: ' + err.message
    })
  }
}

export const deleteRooms = async (req, res, next) => {
  try {
    await Room.findByIdAndDelete(req.params.roomId);
    try {
      await Hotel.findByIdAndUpdate(
        req.params.hotelId,
        { $pull: { rooms: req.params.roomId } }
      )
    } catch (err) {
      next(err);
    }
    res.status(HTTPStatus.ACCEPTED).json({
      message: 'Room deleted successfully'
    })
  } catch (err) {
    next(err);
  }
};

export const updateFacility = async (req, res, next) => {
  try {
    const roomFacility = await Room.findById(req.params.roomId);
    const facilityExisted = roomFacility.facility.some(item => item.facilityId === req.body.facilityId)

    if (facilityExisted) {
      const facilityQuantity = roomFacility.facility.filter(item => item.facilityId === req.body.facilityId)[0].quantity

      const newFacility = {
        ...req.body,
        quantity: req.body.quantity + facilityQuantity,
      }

      // Remove existing facility
      await Room.findByIdAndUpdate(
        req.params.roomId,
        { $pull: { facility: { facilityId: req.body.facilityId } } }
      )

      // Update quantity of the previous facility
      await Room.findByIdAndUpdate(
        req.params.roomId,
        { $push: { facility: newFacility } },
      )

      // Update quantity in facility database
      const facility = await Facility.findById(req.body.facilityId)
      await Facility.findByIdAndUpdate(
        req.body.facilityId,
        {
          using: facility.using + req.body.quantity,
          amount: facility.amount - req.body.quantity,
        },
        { new: true },
      )
      res.status(HTTPStatus.ACCEPTED).json({
        msg: 'Facility updated successfully',
      })
    } else {
      await Room.findByIdAndUpdate(
        req.params.roomId,
        { $push: { facility: req.body } },
      )

      // Update quantity in facility database
      const facility = await Facility.findById(req.body.facilityId)
      await Facility.findByIdAndUpdate(
        req.body.facilityId,
        {
          using: facility.using + req.body.quantity,
          amount: facility.amount - req.body.quantity,
        },
        { new: true },
      )
    }
    res.status(HTTPStatus.ACCEPTED).json({
      message: "Room's facility updated successfully",
    })
  } catch (err) {
    next(err);
  }
};

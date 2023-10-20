import Hotel from '../models/Hotel.model.js';
import Room from '../models/Room.model.js';

export const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};

export const getOneRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.roomId);
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};

export const createRooms = async (req, res, next) => {
  const newRoom = new Room(req.body);
  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(
        req.params.hotelId,
        { $push: { rooms: savedRoom._id } },
      )
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

export const updateRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.hotelId)
    const roomsNum = await Promise.all(
      hotel.rooms.map(async (item) => {
        const room = await Room.findById(item)
        return room.number
      })
    )
    if (roomsNum.includes(req.body.number)) {
      res.status(403).json({
        message: 'Room number is already existed'
      })
    }
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.roomId,
      { $set: req.body },
      { new: true }
    )
    res.status(200).json(updatedRoom)
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
    res.status(200).json(updatedRoom)
  } catch (err) {
    res.status(403).json({
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
    res.status(200).json({
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
    } else {
      await Room.findByIdAndUpdate(
        req.params.roomId,
        { $push: { facility: req.body } },
      )
    }
    res.status(200).json({
      message: "Room's facility updated successfully",
    })
  } catch (err) {
    next(err);
  }
};
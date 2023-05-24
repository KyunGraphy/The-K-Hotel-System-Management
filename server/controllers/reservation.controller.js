import Reservation from "../models/Reservation.model.js";
import User from "../models/User.model.js";
import Hotel from "../models/Hotel.model.js";
import Room from "../models/Room.model.js";

export const createReservation = async (req, res, next) => {
  req.body.hotelID = req.params.hotelId
  const reservation = new Reservation(req.body);
  try {
    if (req.body.userId) {
      // Booking online
      reservation.userID = req.body.userId
      const user = await User.findOne({ _id: req.body.userId });
      reservation.name = user.name
      try {
        const savedReservation = await reservation.save();
        res.status(200).json(savedReservation);
      } catch (err) {
        next(err);
      }
    } else {
      // Booking directly
      const savedReservation = await reservation.save();
      res.status(200).json(savedReservation);
    }
  } catch (err) {
    next(err);
  }
};

export const getOneReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.findById(req.params.reservationId);
    try {
      const hotel = await Hotel.findById(reservation.hotelID);
      res.status(200).json({
        ...reservation._doc,
        department: hotel.department
      });
    } catch (err) {
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

export const getHotelReservation = async (req, res, next) => {
  try {
    const list = await Reservation.find({ hotelID: req.params.hotelId });
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

export const updateReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.reservationId,
      { $set: req.body },
      { new: true }
    )
    res.status(200).json(reservation)
  } catch (err) {
    next(err);
  }
}

export const deleteOneReservation = async (req, res, next) => {
  try {
    await Reservation.findByIdAndDelete(req.params.reservationId)
    res.status(200).json({
      message: 'Reservation deleted successfully'
    })
  } catch (err) {
    next(err);
  }
};

export const deleteHotelReservation = async (req, res, next) => {
  console.log(req.params)
  try {
    const list = await Reservation.find({ hotelID: req.params.hotelId })
    await Promise.all(
      list.map(item => {
        return Reservation.findByIdAndDelete(item._id)
      })
    )
    res.status(200).json({
      message: 'Hotel delete reservation successful'
    })
  } catch (err) {
    next(err);
  }
};

export const assignReservation = async (req, res, next) => {
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  const startDate = new Date(req.body.date[0].startDate).getTime();
  const endDate = new Date(req.body.date[0].endDate).getTime();
  let start = startDate;

  async function handleBookingDates() {
    while (start <= endDate) {
      try {
        await Room.findByIdAndUpdate(
          req.body.roomId,
          { $push: { unavailableDate: start } },
        )
      } catch (err) {
        next(err);
      }
      start += MILLISECONDS_PER_DAY;
    }
  }

  try {
    await Reservation.findByIdAndUpdate(
      req.params.reservationId,
      { $push: { rooms: req.body.roomId } },
    )
    try {
      await handleBookingDates()
      res.status(200).json({
        msg: 'Assign successfully'
      })
    } catch (err) {
      next(err);
    }
  } catch (err) {
    next(err);
  }
};
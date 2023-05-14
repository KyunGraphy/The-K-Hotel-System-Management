import Reservation from "../models/Reservation.model.js";
import User from "../models/User.model.js";

export const createReservation = async (req, res, next) => {
  req.body.userID = req.userId
  req.body.hotelID = req.params.hotelId
  const reservation = new Reservation(req.body);
  try {
    const savedReservation = await reservation.save();
    res.status(200).json(savedReservation);
  } catch (err) {
    next(err);
  }
};

export const getOneReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.findById(req.params.reservationId);
    res.status(200).json(reservation);
  } catch (err) {
    next(err);
  }
};

export const getHotelReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.find({ hotelID: req.params.hotelId });
    const user = await Promise.all(
      reservation.map(item => {
        return User.findById(item.userID)
      })
    )
    const list = reservation.map((item, i) => {
      return {
        ...item._doc,
        name: user[i].name
      }
    })
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
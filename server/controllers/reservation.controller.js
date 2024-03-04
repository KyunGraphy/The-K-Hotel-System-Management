import Reservation from "../models/Reservation.model.js";
import User from "../models/User.model.js";
import Hotel from "../models/Hotel.model.js";
import Room from "../models/Room.model.js";
import Service from "../models/Service.model.js";
import { bookingSuccessMailer } from "../utils/mailer.js";
import { HTTPStatus } from "../constants/Constants.js";

export const createReservation = async (req, res, next) => {
  req.body.hotelID = req.params.hotelId
  const reservation = new Reservation(req.body);
  try {
    if (req.body.isOnline) {
      // Booking online
      const savedReservation = await reservation.save();
      bookingSuccessMailer(req.body)
      res.status(HTTPStatus.CREATED).json(savedReservation);
    } else {
      // Booking directly
      const savedReservation = await reservation.save();
      res.status(HTTPStatus.CREATED).json(savedReservation);
    }
  } catch (err) {
    next(err);
  }
};

export const getOneReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.findById(req.params.reservationId);
    const data = await Promise.all([
      Hotel.findById(reservation.hotelID),
      User.findById(reservation.userID),
    ])

    res.status(HTTPStatus.OK).json({
      ...reservation._doc,
      data
    });
  } catch (err) {
    next(err);
  }
};

// Handle reservations services
export const getReservationService = async (req, res, next) => {
  try {
    const reservation = await Reservation.findById(req.params.reservationId)
    const serviceList = await Service.find()

    const servicesIds = reservation.services.map(item => item.serviceId)

    const result = serviceList.map(item => {
      if (servicesIds.includes(item.id)) {
        const index = servicesIds.indexOf(item.id)

        return {
          ...item._doc,
          qty: reservation.services[index].qty,
        }
      } else {
        return {
          ...item._doc,
          qty: 0,
        }
      }
    })
    res.status(HTTPStatus.OK).json(result);
  } catch (err) {
    next(err);
  }
};

export const updateService = async (req, res, next) => {
  try {
    // Get reservation services
    const reservation = await Reservation.findById(req.params.reservationId)
    const servicesList = [...reservation.services]

    // Filter reservation services id
    const servicesIds = servicesList.map(item => item.serviceId)

    // Get service instances by reservation service id
    const serviceItem = await Service.findById(req.body.id)

    if (servicesIds.includes(req.body.id)) {
      const index = servicesIds.indexOf(req.body.id)

      const diff = req.body.qty - servicesList[index]._doc.qty
      if (diff > serviceItem.amount) {
        return res.status(HTTPStatus.NOT_ACCEPT).json({
          msg: 'Service quantity is not enough to satisfy',
        })
      }

      await Promise.all([
        Reservation.updateOne(
          { _id: req.params.reservationId, 'services.serviceId': req.body.id },
          {
            $set: { 'services.$.qty': req.body.qty }
          },
        ),
        Service.findByIdAndUpdate(
          req.body.id,
          {
            $set: {
              amount: serviceItem.amount - diff,
            }
          },
        )
      ])

      return res.status(HTTPStatus.ACCEPTED).json({
        msg: 'Service quantity satisfy',
      })
    }

    // Push new service item into reservation service queue
    servicesList.push({
      serviceId: req.body.id,
      qty: req.body.qty,
    })

    // Update service quantity in warehouse
    await Promise.all([
      Reservation.findByIdAndUpdate(
        req.params.reservationId,
        {
          $set: {
            services: servicesList,
          }
        },
      ),
      Service.findByIdAndUpdate(
        req.body.id,
        {
          $set: {
            amount: serviceItem.amount - req.body.qty,
          }
        },
      )
    ])

    return res.status(HTTPStatus.ACCEPTED).json({
      msg: 'Service quantity satisfy',
    })
  } catch (err) {
    next(err)
  }
};

export const getAllReservation = async (req, res, next) => {
  try {
    const list = await Reservation.find()
    res.status(HTTPStatus.OK).json(list);
  } catch (err) {
    next(err);
  }
};

export const getHotelReservation = async (req, res, next) => {
  try {
    const list = await Reservation.find({ hotelID: req.params.hotelId });
    res.status(HTTPStatus.OK).json(list);
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
    res.status(HTTPStatus.ACCEPTED).json(reservation)
  } catch (err) {
    next(err);
  }
}

export const deleteOneReservation = async (req, res, next) => {
  try {
    await Reservation.findByIdAndDelete(req.params.reservationId)
    res.status(HTTPStatus.ACCEPTED).json({
      message: 'Reservation deleted successfully'
    })
  } catch (err) {
    next(err);
  }
};

export const deleteHotelReservation = async (req, res, next) => {
  try {
    const list = await Reservation.find({ hotelID: req.params.hotelId })
    await Promise.all(
      list.map(item => {
        return Reservation.findByIdAndDelete(item._id)
      })
    )
    res.status(HTTPStatus.ACCEPTED).json({
      message: 'Hotel delete reservation successful'
    })
  } catch (err) {
    next(err);
  }
};

// Handle assign/remove reservations requests
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
      res.status(HTTPStatus.ACCEPTED).json({
        msg: 'Assign successfully'
      })
    } catch (err) {
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

export const removeReservation = async (req, res, next) => {
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  const startDate = new Date(req.body.date[0].startDate).getTime();
  const endDate = new Date(req.body.date[0].endDate).getTime();
  let start = startDate;

  async function handleRemoveDates() {
    while (start <= endDate) {
      try {
        await Room.findByIdAndUpdate(
          req.body.roomId,
          { $pull: { unavailableDate: start } },
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
      { $pull: { rooms: req.body.roomId } },
    )
    try {
      await handleRemoveDates()
      res.status(HTTPStatus.ACCEPTED).json({
        msg: 'Remove successfully'
      })
    } catch (err) {
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

// Get user reservations
export const getUserReservations = async (req, res, next) => {
  try {
    const reservationList = await Reservation.find({ userID: req.params.userId })
    const hotelList = await Promise.all(
      reservationList.map(item => {
        return Hotel.findById(item.hotelID)
      })
    )
    const roomList = await Promise.all(
      reservationList.map(async (item) =>
        await Promise.all(
          item.rooms.map(room => {
            return Room.findById(room)
          })
        ),
      )
    )

    const result = reservationList.map((reservation, index) => {
      return {
        id: reservation._id,
        // name: reservation.name,
        adult: reservation.adult,
        children: reservation.children,
        singleRoom: reservation.singleRoom,
        doubleRoom: reservation.doubleRoom,
        checkInDate: new Date(reservation.checkInDate).getDate() + "/" + (new Date(reservation.checkInDate).getMonth() + 1) + "/" + new Date(reservation.checkInDate).getFullYear(),
        checkOutDate: new Date(reservation.checkOutDate).getDate() + "/" + (new Date(reservation.checkOutDate).getMonth() + 1) + "/" + new Date(reservation.checkOutDate).getFullYear(),
        createdAt: new Date(reservation.createdAt).getDate() + "/" + (new Date(reservation.createdAt).getMonth() + 1) + "/" + new Date(reservation.createdAt).getFullYear(),
        department: hotelList[index].department,
        rooms: roomList[index].map(room => room.number),
      };
    })

    res.status(HTTPStatus.OK).json(result);
  } catch (err) {
    next(err);
  }
};

export const getUserReservationsCount = async (req, res, next) => {
  try {
    const reservationList = await Reservation.find({ userID: req.params.userId })
    res.status(HTTPStatus.OK).json({ count: reservationList.length });
  } catch (err) {
    next(err);
  }
};

// Get activity
export const getActivity = async (req, res, next) => {
  let result = {
    arrival: [],
    departure: [],
    stay: [],
  }

  try {
    const reservationList = await Reservation.find({
      $or: [
        { checkInDate: { $eq: Number(req.params.date) } },
        { checkOutDate: { $eq: Number(req.params.date) } },
        {
          $and: [
            { checkInDate: { $lt: Number(req.params.date) } },
            { checkOutDate: { $gt: Number(req.params.date) } },
          ],
        }
      ],
    })
    reservationList.map(item => {
      if (item.checkInDate === Number(req.params.date)) {
        result.arrival.push(item)
      } else if (item.checkOutDate === Number(req.params.date)) {
        result.departure.push(item)
      } else {
        result.stay.push(item)
      }
    })
    res.status(HTTPStatus.OK).json(result);
  } catch (err) {
    next(err);
  }
};

export const getHotelActivity = async (req, res, next) => {
  let result = {
    arrival: [],
    departure: [],
    stay: [],
  }

  try {
    const reservationList = await Reservation.find({
      $and: [
        { hotelID: { $eq: req.params.hotelId } },
        {
          $or: [
            { checkInDate: { $eq: Number(req.params.date) } },
            { checkOutDate: { $eq: Number(req.params.date) } },
            {
              $and: [
                { checkInDate: { $lt: Number(req.params.date) } },
                { checkOutDate: { $gt: Number(req.params.date) } },
              ],
            }
          ],
        },
      ],
    })
    reservationList.map(item => {
      if (item.checkInDate === Number(req.params.date)) {
        result.arrival.push(item)
      } else if (item.checkOutDate === Number(req.params.date)) {
        result.departure.push(item)
      } else {
        result.stay.push(item)
      }
    })
    res.status(HTTPStatus.OK).json(result);
  } catch (err) {
    next(err);
  }
};

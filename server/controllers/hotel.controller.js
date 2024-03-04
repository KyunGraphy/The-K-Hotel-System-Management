import { HTTPStatus } from '../constants/Constants.js';
import Hotel from '../models/Hotel.model.js';
import Room from '../models/Room.model.js';
import User from '../models/User.model.js';

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body)

  try {
    const savedHotel = await newHotel.save();
    res.status(HTTPStatus.CREATED).json(savedHotel);
  } catch (err) {
    next(err);
  }
};

export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.hotelId,
      { $set: req.body },
      { new: true }
    )
    res.status(HTTPStatus.ACCEPTED).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};

export const getOneHotels = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.hotelId);
    res.status(HTTPStatus.OK).json(hotel);
  } catch (err) {
    next(err);
  }
};

export const getAllHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.find();
    res.status(HTTPStatus.OK).json(hotels);
  } catch (err) {
    next(err);
  }
};

export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.hotelId);
    const list = await Promise.all(
      hotel.rooms.map(room => {
        return Room.findById(room);
      })
    )
    res.status(HTTPStatus.OK).json(list);
  } catch (err) {
    next(err);
  }
};

export const getSearchRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.hotelId);
    const list = await Promise.all(
      hotel.rooms.map(room => {
        return Room.findById(room)
      })
    )
    const searchList = list.filter(room => {
      return room.number.toString().includes(req.params.search)
    })
    res.status(HTTPStatus.OK).json(searchList);
  } catch (err) {
    next(err);
  }
};

export const getHotelStaffs = async (req, res, next) => {
  try {
    const { staffs } = await Hotel.findById(req.params.hotelId);

    const staffsList = await Promise.all(
      staffs.map(id => User.findById(id)),
    );

    res.status(HTTPStatus.OK).send(staffsList);
  } catch (err) {
    next(err);
  }
};

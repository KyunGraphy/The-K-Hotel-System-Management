import Hotel from '../models/Hotel.model.js';
import Room from '../models/Room.model.js';

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body)

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};

export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    )
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};

export const getOneHotels = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.hotelId);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

export const getAllHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
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
    res.status(200).json(list);
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
    res.status(200).json(searchList);
  } catch (err) {
    next(err);
  }
};
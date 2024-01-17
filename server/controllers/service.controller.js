import Service from "../models/Service.model.js";
import Request from '../models/Request.model.js';
import cloudinary from "../utils/cloudinary.js"

export const getOneServices = async (req, res, next) => {
  try {
    const data = await Service.findById(req.params.serviceId);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

export const getAllServices = async (req, res, next) => {
  try {
    const data = await Service.find();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

export const createService = async (req, res, next) => {
  try {
    const result = await cloudinary.uploader.upload(req.body.serviceImg, {
      folder: "service",
    })

    const newService = new Service({
      name: req.body.name,
      capacity: Number(req.body.capacity),
      price: Number(req.body.price),
      unit: req.body.unit,
      unitPurchasePrice: Number(req.body.unitPurchasePrice),
      img: {
        public_id: result.public_id,
        url: result.secure_url,
      },
      amount: 0,
    })
    await newService.save();
    res.status(200).json(newService);
  } catch (err) {
    next(err);
  }
};

export const updateService = async (req, res, next) => {
  try {
    const updateService = await Service.findByIdAndUpdate(
      req.params.serviceId,
      { $set: req.body },
      { new: true }
    )
  } catch (err) {
    next(err);
  }
};

// Send request
export const serviceRequest = async (req, res, next) => {
  try {
    const newRequest = new Request({
      itemId: req.body.itemId,
      isService: true,
      quantity: req.body.quantity,
      description: req.body.description,
      inCart: false,
      isFromShop: false,
    })
    await newRequest.save();
    res.status(200).json(newRequest);
  } catch (err) {
    next(err);
  }
};

export const serviceCart = async (req, res, next) => {
  try {
    const isExisted = await Request.find({
      itemId: req.body.itemId,
      isFromShop: true,
    })

    if (isExisted.length === 0) {
      const newRequest = new Request({
        itemId: req.body.itemId,
        isService: true,
        quantity: req.body.quantity,
        inCart: true,
        isFromShop: true,
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

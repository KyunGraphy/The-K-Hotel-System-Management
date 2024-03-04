import Service from "../models/Service.model.js";
import Request from '../models/Request.model.js';
import cloudinary from "../utils/cloudinary.js"
import { HTTPStatus } from "../constants/Constants.js";

export const getOneServices = async (req, res, next) => {
  try {
    const data = await Service.findById(req.params.serviceId);
    res.status(HTTPStatus.OK).json(data);
  } catch (err) {
    next(err);
  }
};

export const getAllServices = async (req, res, next) => {
  try {
    const data = await Service.find();
    res.status(HTTPStatus.OK).json(data);
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
    res.status(HTTPStatus.CREATED).json(newService);
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

    res.status(HTTPStatus.ACCEPTED).json(updateService)
  } catch (err) {
    next(err);
  }
};

// Send request
export const serviceRequest = async (req, res, next) => {
  try {
    const { name } = await Service.findById(req.body.itemId);

    const newRequest = new Request({
      ...req.body,
      name: name,
      isService: true,
      inCart: false,
      isFromShop: false,
    })
    await newRequest.save();
    res.status(HTTPStatus.CREATED).json(newRequest);
  } catch (err) {
    next(err);
  }
};

export const serviceCart = async (req, res, next) => {
  try {
    const { name } = await Service.findById(req.body.itemId);

    const isExisted = await Request.find({
      itemId: req.body.itemId,
      isFromShop: true,
    })

    if (isExisted.length === 0) {
      const newRequest = new Request({
        ...req.body,
        name: name,
        isService: true,
        inCart: true,
        isFromShop: true,
      })
      await newRequest.save();
      res.status(HTTPStatus.CREATED).json(newRequest);
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
      res.status(HTTPStatus.ACCEPTED).json(updateRequest);
    }
  } catch (err) {
    next(err);
  }
};

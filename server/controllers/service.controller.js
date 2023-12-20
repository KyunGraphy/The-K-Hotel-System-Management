import Service from "../models/Service.model.js";
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

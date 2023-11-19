import Service from "../models/Service.model.js";

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
    const newService = new Service(req.body);
    await newService.save();
    res.status(201).json(newService);
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
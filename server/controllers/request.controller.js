import Request from "../models/Request.model.js";

export const getAllRequests = async (req, res, next) => {
  try {
    const requestsList = await Promise.all([
      Request.find({
        isService: false,
        inCart: false,
      }),
      Request.find({
        isService: true,
        inCart: false,
      }),
      Request.find({
        inCart: true,
      }),
    ]);

    res.status(200).json(requestsList)
  } catch (err) {
    next(err);
  }
};

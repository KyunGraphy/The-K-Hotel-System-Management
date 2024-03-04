import Request from "../models/Request.model.js";
import Service from "../models/Service.model.js";
import Facility from "../models/Facility.model.js";
import { HTTPStatus } from "../constants/Constants.js";

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
    ]);

    res.status(HTTPStatus.OK).json(requestsList)
  } catch (err) {
    next(err);
  }
};

export const getCartRequests = async (req, res, next) => {
  try {
    const requestsCart = await Request.find({ inCart: true, })

    const cartList = await Promise.all(
      requestsCart.map(async (request) => {
        if (request.isService) {
          const item = await Service.findById(request.itemId);
          const { _id, ...otherDetails } = item._doc;
          return {
            ...request._doc,
            ...otherDetails,
          }
        } else {
          const item = await Facility.findById(request.itemId);
          const { _id, ...otherDetails } = item._doc;
          return {
            ...request._doc,
            ...otherDetails,
          }
        }
      }
      )
    )

    res.status(HTTPStatus.OK).json(cartList)
  } catch (err) {
    next(err);
  }
}

export const addOrder = async (req, res, next) => {
  try {
    const updateRequest = await Promise.all(
      req.body.ids.map(async id => {
        await Request.findByIdAndUpdate(
          id,
          {
            $set: {
              inCart: true,
            }
          },
          { new: true }
        )
      })
    )
    res.status(HTTPStatus.CREATED).json(updateRequest)
  } catch (err) {
    next(err);
  }
};

export const removeOrder = async (req, res, next) => {
  if (req.body.isFromShop) {
    await Request.findByIdAndDelete(req.params.id)
    res.status(HTTPStatus.ACCEPTED).json({
      msg: 'Order deleted successfully',
    })
  } else {
    await Request.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          inCart: false,
        }
      },
      { new: true }
    )
    res.status(HTTPStatus.ACCEPTED).json({
      msg: 'Order deleted successfully',
    })
  }
}

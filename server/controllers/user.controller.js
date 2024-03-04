import { createError } from "../utils/error.js";

import User from '../models/User.model.js';
import Hotel from '../models/Hotel.model.js';
import cloudinary from "../utils/cloudinary.js"
import { HTTPStatus } from "../constants/Constants.js";

export const getUser = async (req, res, next) => {
  try {
    const users = await User.findById(req.params.id);
    res.status(HTTPStatus.OK).json(users);
  } catch (err) {
    next(err);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(HTTPStatus.OK).json(users);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    if (req.body.hasOwnProperty('isStaff')) {
      // Update Admin object
      if (req.isAdmin) {
        const updateUser = await Promise.all([
          User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
          ),
          Hotel.findByIdAndUpdate(
            req.body.oldHotelId,
            { $pull: { staffs: req.params.id } },
            { new: true }
          ),
          Hotel.findByIdAndUpdate(
            req.body.hotelId,
            { $push: { staffs: req.params.id } },
            { new: true }
          ),
        ])
        res.status(HTTPStatus.ACCEPTED).json(updateUser);
      } else {
        return next(createError(HTTPStatus.FORBIDDEN, "Something wrong!"))
      }
    } else {
      // Update Customer object
      if (req.params.id === req.userId || req.isAdmin) {
        const updateUser = await User.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(HTTPStatus.ACCEPTED).json(updateUser);
      } else {
        return next(createError(HTTPStatus.FORBIDDEN, "You can only update your account!"))
      }
    }

  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    if (req.params.id === req.userId || req.isAdmin) {
      await User.findByIdAndDelete(req.params.id);
      res.status(HTTPStatus.ACCEPTED).json({
        message: 'User deleted',
      })
    } else {
      return next(createError(HTTPStatus.FORBIDDEN, "You can only delete your account!"))
    }
  } catch (err) {
    next(err);
  }
};

export const uploadAvatar = async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.params.userId)

    if (currentUser.profilePicture.public_id !== undefined) {
      await cloudinary.uploader.destroy(currentUser.profilePicture?.public_id);
    }

    const result = await cloudinary.uploader.upload(req.body.avatarImg, {
      folder: "avatar",
    })

    const newUpdate = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          profilePicture: {
            public_id: result.public_id,
            url: result.secure_url,
          }
        }
      },
      { new: true }
    )
    res.status(HTTPStatus.ACCEPTED).json({
      success: true,
      newUpdate
    })
  } catch (err) {
    next(err)
  }
};

export const removeAvatar = async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.params.userId)

    if (currentUser.profilePicture.public_id !== undefined) {
      await cloudinary.uploader.destroy(currentUser.profilePicture?.public_id);

      const newUpdate = await User.findByIdAndUpdate(
        req.params.userId,
        {
          $set: {
            profilePicture: ""
          }
        },
        { new: true }
      )
      res.status(HTTPStatus.ACCEPTED).json({
        msg: 'Remove profile picture successfully',
        newUpdate,
      });
    }
    return next(createError(HTTPStatus.FORBIDDEN, "Profile picture is not valid!"))
  } catch (err) {
    next(err)
  }
}

export const getAllStaffs = async (req, res, next) => {
  try {
    const list = await User.find({ isAdmin: true })
    res.status(HTTPStatus.OK).json(list)
  } catch (err) {
    next(err);
  }
};

import { createError } from "../utils/error.js";

import User from '../models/User.model.js';
import cloudinary from "../utils/cloudinary.js"

export const getUser = async (req, res, next) => {
  try {
    const users = await User.findById(req.params.id);
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    if (req.params.id === req.userId || req.isAdmin) {
      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updateUser);
    } else {
      return next(createError(403, "You can only update your account!"))
    }
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    if (req.params.id === req.userId || req.isAdmin) {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({
        message: 'User deleted',
      })
    } else {
      return next(createError(403, "You can only delete your account!"))
    }
  } catch (err) {
    next(err);
  }
};

export const uploadAvatar = async (req, res) => {
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
    res.status(201).json({
      success: true,
      newUpdate
    })
  } catch (err) {
    console.log(err)
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
      res.status(200).json({
        msg: 'Remove profile picture successfully',
        newUpdate,
      });
    }
    return next(createError(403, "Profile picture is not valid!"))
  } catch (err) {
    console.log(err)
  }
}
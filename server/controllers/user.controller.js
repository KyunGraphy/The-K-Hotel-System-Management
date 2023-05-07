import { createError } from "../utils/error.js";

import User from '../models/User.model.js';

export const getUser = async (req, res, next) => {
  try {
    const users = await User.findOne({ _id: req.params.id });
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
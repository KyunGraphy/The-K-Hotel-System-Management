import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.model.js";
import Hotel from "../models/Hotel.model.js";
import { sendOTPMailer } from "../utils/mailer.js";

import { createError } from "../utils/error.js";
import { HTTPStatus, defaultPassword, padWithLeadingZeros, roleKeys } from "../constants/Constants.js";

export const register = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    if (user) {
      return next(createError(HTTPStatus.NOT_ACCEPT, 'Username has already existed!'))
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    })

    await newUser.save();
    res.status(HTTPStatus.CREATED).json(newUser);
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user)
      return next(createError(HTTPStatus.NOT_ACCEPT, "User not found!"))

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    )
    if (!isPasswordCorrect)
      return next(createError(HTTPStatus.NOT_ACCEPT, "Wrong password or username!"));

    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
        role: user.role || null,
      },
      process.env.JWT_KEY,
      { expiresIn: "1d" }
    );

    const { password, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(HTTPStatus.OK)
      .json(otherDetails);
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  res
    .clearCookie("access_token", {
      sameSite: 'none',
      secure: true,
    })
    .status(HTTPStatus.OK)
    .json({
      message: 'Logout successful'
    });
};

export const changePassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (req.userId !== user.id)
      return next(createError(HTTPStatus.UNAUTHORIZED, "You are not authorization!"))

    if (!user)
      return next(createError(HTTPStatus.NOT_ACCEPT, "Wrong password or username!"))

    const isPasswordCorrect = await bcrypt.compare(
      req.body.currentPassword,
      user.password
    )
    if (!isPasswordCorrect)
      return next(createError(HTTPStatus.NOT_ACCEPT, "Wrong password or username!"));

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.newPassword, salt);

    const updateUser = await User.findOneAndUpdate(
      { username: req.body.username },
      { $set: { password: hash } },
      { new: true }
    );
    res.status(HTTPStatus.ACCEPTED).json(updateUser);
  } catch (err) {
    next(err);
  }
};

export const newStaff = async (req, res, next) => {
  try {
    const admin = await User.find({ isAdmin: true })
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(defaultPassword, salt);
    const roleKey = roleKeys[req.body.role]
    const roleNum = padWithLeadingZeros(admin.length + 1, 3)

    if (!roleKey)
      return next(createError(HTTPStatus.NOT_ACCEPT, "Invalid role!"))

    const newStaff = new User({
      ...req.body,
      username: `admin${admin.length + 1}`,
      password: hash,
      isAdmin: true,
      hotelId: (req.body.role !== 'Director') ? req.params.hotelId : undefined,
      adminId: `${roleKey}${roleNum}`
    })

    const savedStaff = await newStaff.save();

    if (req.body.role !== 'Director') {
      await Hotel.findByIdAndUpdate(
        req.params.hotelId,
        { $push: { staffs: savedStaff._id } },
        { new: true }
      )
    }

    res.status(HTTPStatus.CREATED).json(savedStaff)
  } catch (err) {
    next(err)
  }
};

// Forget password API
let OTP = null

export const verifyUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      username: req.body.username,
    })

    if (!user) {
      return next(createError(HTTPStatus.NOT_ACCEPT, 'User not found. Please try again!'));
    }

    // Handle Send OTP via email address
    OTP = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    sendOTPMailer(user, OTP, req.body.email)

    res.status(HTTPStatus.ACCEPTED).json({
      OTP,
      user,
    })
  } catch (err) {
    next(err);
  }
};

export const verifyOTP = (req, res, next) => {
  if (req.body.OTP !== OTP) {
    next(createError(HTTPStatus.NOT_ACCEPT, 'Incorrect OTP'))
  } else {
    res.status(HTTPStatus.ACCEPTED).json({
      msg: 'Accept request'
    })
  }
};

export const changePw = async (req, res, next) => {
  try {
    console.log(req.body);
    res.status(HTTPStatus.ACCEPTED).json({
      msg: 'Accept request',
    });
  } catch (err) {
    next(err);
  }
};
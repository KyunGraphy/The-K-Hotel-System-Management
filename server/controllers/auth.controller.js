import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";
import { padWithLeadingZeros, roleKeys } from "../constants/Constants.js";

import User from "../models/User.model.js";
import Hotel from "../models/Hotel.model.js";

export const register = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    if (user) {
      return next(createError(401, 'Username has already existed!'))
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    })

    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user)
      return next(createError(404, "User not found!"))

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    )
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

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
      .status(200)
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
    .status(200)
    .json({
      message: 'Logout successful'
    });
};

export const changePassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (req.userId !== user.id)
      return next(createError(404, "You are not authorization!"))

    if (!user)
      return next(createError(404, "Wrong password or username!"))

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    )
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.newPassword, salt);

    const updateUser = await User.findOneAndUpdate(
      { username: req.body.username },
      { $set: { password: hash } },
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (err) {
    next(err);
  }
};

export const newStaff = async (req, res, next) => {
  try {
    const admin = await User.find({ isAdmin: true })
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync('1234', salt);
    const roleKey = roleKeys[req.body.role]
    const roleNum = padWithLeadingZeros(admin.length + 1, 3)

    if (!roleKey)
      return next(createError(400, "Invalid role!"))

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

    res.status(200).json(savedStaff)
  } catch (err) {
    console.log(err)
    next(err)
  }
};

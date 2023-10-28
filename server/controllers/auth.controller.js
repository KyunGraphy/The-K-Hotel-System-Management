import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";
import { padWithLeadingZeros, roleKeys } from "../constants/Constants.js";

import User from "../models/User.model.js";

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

    const newStaff = new User({
      ...req.body,
      username: `admin${admin.length + 1}`,
      password: hash,
      isAdmin: true,
      hotelId: req.params.hotelId,
      adminId: `${roleKey}${roleNum}`
    })

    await newStaff.save();

    res.status(200).json(newStaff)
  } catch (err) {
    console.log(err)
    next(err)
  }
};

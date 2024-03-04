import jwt from 'jsonwebtoken';
import { createError } from '../utils/error.js';
import { HTTPStatus } from '../constants/Constants.js';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(createError(HTTPStatus.UNAUTHORIZED, "You are not authenticated!"));

  jwt.verify(token, process.env.JWT_KEY, (err, user) => {
    if (err) return next(createError(HTTPStatus.FORBIDDEN, "Token is not valid!"));
    req.userId = user.id;
    req.isAdmin = user.isAdmin;
    next();
  });
};

export const verifyAdmin = (req, res, next) => {
  if (!req.isAdmin) return next(createError(HTTPStatus.UNAUTHORIZED, "You are not admin!"))
  next();
};
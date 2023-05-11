import Comment from "../models/Comment.model.js"
import Hotel from "../models/Hotel.model.js";
import { createError } from "../utils/error.js";

export const getHotelComments = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.hotelId);
    const list = await Promise.all(
      hotel.comments.map(comment => {
        return Comment.findById(comment);
      })
    )
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
}

export const createComment = async (req, res, next) => {
  req.body.userID = req.userId
  const comment = new Comment(req.body);

  try {
    const savedComment = await comment.save();
    try {
      await Hotel.findByIdAndUpdate(
        req.params.hotelId,
        { $push: { comments: savedComment._id } }
      )
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedComment)
  } catch (err) {
    next(err);
  }
}

export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (comment.userID === req.userId || req.isAdmin) {
      try {
        await Comment.findByIdAndDelete(req.params.commentId)
        try {
          await Hotel.findByIdAndUpdate(
            req.params.hotelId,
            { $pull: { comments: req.params.commentId } }
          )
        } catch (err) {
          next(err);
        }
        res.status(200).json({
          message: 'Comment deleted successfully'
        })
      } catch (err) {
        next(err);
      }
    }

    return next(createError(403, 'You only delete your own account!'));
  } catch (err) {
    next(err);
  }
}

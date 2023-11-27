import axios from "axios";
import React, { useState } from 'react'
import { BsFillSendFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { Box, Rating } from "@mui/material";

import { Toastify } from "../toastify/Toastify";

// ----------------------------------------------------------------
const CommentMsg = ({ reFetch }) => {
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")
  const [errMsg, setErrMsg] = useState("");
  const params = useParams()

  const handleSendComment = async () => {
    if (comment === '') {
      setErrMsg('Please type your comment before sending');

      setTimeout(function () {
        setErrMsg('')
      }, 10000);
      return;
    }

    const cmtForm = {
      rating,
      description: comment
    };

    try {
      await axios.post(`/comment/${params.id}`, cmtForm)
      reFetch()
    } catch (err) {
      if (err.response.data.message === 'You are not authenticated!') {
        setErrMsg('You have to login to send comment!');
        setTimeout(function () {
          setErrMsg('');
        }, 10000)
      } else {
        setErrMsg('Something went wrong!');
      }
    }
  }

  return (
    <React.Fragment>
      {errMsg && <Toastify msg={errMsg} type="error" />}
      <div className="hotelCommentMsg">
        <Box>
          <Rating
            name="half-rating"
            precision={0.5}
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />
        </Box>

        <div className="inputBox">
          <span className="icon">
            <BsFillSendFill
              style={{ cursor: "pointer" }}
              title="Send comment"
              onClick={handleSendComment}
            />
          </span>
          <input
            type="text"
            id="description"
            placeholder="Type your comment"
            onChange={(e) => setComment(e.target.value)}
            autoComplete="off"
          />
        </div>
      </div>
    </React.Fragment>
  )
}

export default CommentMsg
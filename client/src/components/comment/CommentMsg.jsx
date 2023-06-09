import { BsFillSendFill } from "react-icons/bs";
import React, { useState } from 'react'
import { useParams } from "react-router-dom";
import axios from "axios";
import Alert from "../alert/Alert";

const CommentMsg = ({ reFetch }) => {
  const [openRating, setOpenRating] = useState(false);
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")
  const [errMsg, setErrMsg] = useState("");
  const params = useParams()

  const handleRating = (number) => {
    setRating(number);
  };

  const handleSendComment = async () => {
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
        }, 3000)
      } else {
        setErrMsg('Something went wrong!');
      }
    }
  }

  return (
    <div className="hotelCommentMsg">
      <Alert msg={errMsg} type="danger" />
      <div className="inputBox" onClick={() => setOpenRating(!openRating)}>
        <input
          type="text"
          className="starInput"
          id="rating"
          placeholder={rating}
          autoComplete="off"
        />
        <div className="hotelRating">
          <ion-icon name="star"></ion-icon>
        </div>
        {openRating && (<div className='countryOptions'>
          <p onClick={() => handleRating(5)} >
            5<ion-icon name="star" style={{ color: '#febb02' }}></ion-icon>
          </p>
          <p onClick={() => handleRating(4)} >
            4<ion-icon name="star" style={{ color: '#febb02' }}></ion-icon>
          </p>
          <p onClick={() => handleRating(3)} >
            3<ion-icon name="star" style={{ color: '#febb02' }}></ion-icon>
          </p>
          <p onClick={() => handleRating(2)} >
            2<ion-icon name="star" style={{ color: '#febb02' }}></ion-icon>
          </p>
          <p onClick={() => handleRating(1)} >
            1<ion-icon name="star" style={{ color: '#febb02' }}></ion-icon>
          </p>
        </div>)}
      </div>

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
  )
}

export default CommentMsg
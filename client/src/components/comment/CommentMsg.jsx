import { BsFillSendFill } from "react-icons/bs";
import React, { useState } from 'react'
import { useParams } from "react-router-dom";
import axios from "axios";
import { Toastify } from "../toastify/Toastify";

// ----------------------------------------------------------------
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
        <div className="inputBox" onClick={() => setOpenRating(!openRating)}>
          <span
            className="starInput"
            id="rating"
          >
            {Array(rating).fill(null).map(index => (
              <div className="hotelRating">
                <ion-icon name="star"></ion-icon>
              </div>
            ))}
          </span>
          {openRating && (
            <div className='countryOptions' style={{ top: '50px' }}>
              <p onClick={() => handleRating(5)} >
                {Array(5).fill(null).map(index => (
                  <ion-icon key={index} name="star" style={{ color: '#febb02' }}></ion-icon>
                ))}
              </p>
              <p onClick={() => handleRating(4)} >
                {Array(4).fill(null).map(index => (
                  <ion-icon key={index} name="star" style={{ color: '#febb02' }}></ion-icon>
                ))}
              </p>
              <p onClick={() => handleRating(3)} >
                {Array(3).fill(null).map(index => (
                  <ion-icon key={index} name="star" style={{ color: '#febb02' }}></ion-icon>
                ))}
              </p>
              <p onClick={() => handleRating(2)} >
                {Array(2).fill(null).map(index => (
                  <ion-icon key={index} name="star" style={{ color: '#febb02' }}></ion-icon>
                ))}
              </p>
              <p onClick={() => handleRating(1)} >
                {Array(1).fill(null).map(index => (
                  <ion-icon key={index} name="star" style={{ color: '#febb02' }}></ion-icon>
                ))}
              </p>
            </div>)
          }
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
    </React.Fragment>
  )
}

export default CommentMsg
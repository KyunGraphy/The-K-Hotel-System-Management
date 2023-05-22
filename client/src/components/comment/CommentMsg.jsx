import { BsFillSendFill } from "react-icons/bs";
import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import axios from "axios";

const CommentMsg = ({ reFetch }) => {
  const [openRating, setOpenRating] = useState(false);
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")
  const params = useParams()

  useEffect(() => {
    function handleCloseRating(e) {
      (e.target.className !== 'countryInput') ? setOpenRating(false) : setOpenRating(true);
    }

    window.addEventListener('click', handleCloseRating);
    return () => {
      window.removeEventListener('click', handleCloseRating);
    };
  });

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
      console.log(err);
    }
  }

  return (
    <div className="hotelCommentMsg">
      <div className="inputBox">
        <input
          type="text"
          className="countryInput"
          id="rating"
          placeholder={rating}
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
        />
      </div>
    </div>
  )
}

export default CommentMsg
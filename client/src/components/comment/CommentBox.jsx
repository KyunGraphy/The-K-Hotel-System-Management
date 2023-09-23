import React, { useState } from 'react'
import useFetch from '../../hooks/useFetch'
import RatingStars from './RatingStars'
import Skeleton from 'react-loading-skeleton'
import { BiDotsVertical } from "react-icons/bi";
import { useParams } from "react-router-dom";
import 'react-loading-skeleton/dist/skeleton.css'
import axios from 'axios';
import { format } from "timeago.js"
import { Toastify } from '../toastify/Toastify'

// ----------------------------------------------------------------
const CommentBox = ({ item, reFetch }) => {
  const [openCommentOption, setOpenCommentOption] = useState(false)
  const [errMsg, setErrMsg] = useState("");
  const params = useParams()

  const { data, loading } = useFetch(`/users/${item.userID}`)

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`/comment/${params.id}/${commentId}`)
      reFetch()
    } catch (err) {
      setErrMsg(err.response.data.message);
      setOpenCommentOption(!openCommentOption)
      setTimeout(function () {
        setErrMsg('');
      }, 10000)
    }
  };

  return (
    <React.Fragment>
      {errMsg && <Toastify msg={errMsg} type="error" />}
      <div className='hotelCommentBox'>
        <img
          src='https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg'
          alt=''
          className='hotelCommentAvatar'
        />
        <div className='hotelCommentContent'>
          {loading ? (
            <React.Fragment>
              <p><Skeleton count={2} /></p>
            </React.Fragment>
          ) : (
            <div className='hotelCommentTitle'>
              <div>
                <h4>{data.name}</h4>
                <div>{format(item.createdAt)}</div>
              </div>
              <div>
                <RatingStars star={item.rating} />
              </div>
              <div className='hotelCommentOption'>
                <BiDotsVertical onClick={() => setOpenCommentOption(!openCommentOption)} />
                {openCommentOption && <div>
                  <span onClick={() => handleDeleteComment(item._id)}>Delete</span>
                </div>}
              </div>
            </div>
          )}
          <div>{item.description}</div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default CommentBox
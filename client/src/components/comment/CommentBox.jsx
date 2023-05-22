import React from 'react'
import useFetch from '../../hooks/useFetch'
import RatingStars from './RatingStars'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const CommentBox = ({ item }) => {
  const { data, loading } = useFetch(`/users/${item.userID}`)
  const createdAt = new Date(item.createdAt).getDate() + '/' + (new Date(item.createdAt).getMonth() + 1) + '/' + new Date(item.createdAt).getFullYear();

  return (
    <div className='hotelCommentBox'>
      <img
        src='https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg'
        alt=''
        className='hotelCommentAvatar'
      />
      <div className='hotelCommentContent'>
        {loading ? (
          <>
            <p><Skeleton count={2} /></p>
          </>
        ) : (
          <div className='hotelCommentTitle'>
            <div>
              <h4>{data.name}</h4>
              <div>Created at: {createdAt}</div>
            </div>
            <div>
              <RatingStars star={item.rating} />
            </div>
          </div>
        )}
        <div>{item.description}</div>
      </div>
    </div>
  )
}

export default CommentBox
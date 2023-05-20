import React from 'react'
import './comment.css'
import CommentBox from './CommentBox'
import useFetch from '../../hooks/useFetch'

const Comment = ({ hotelId }) => {
  const { data, loading } = useFetch(`/comment/${hotelId}`)

  return (
    <div className='hotelComment'>
      <h3>Comment</h3>
      {loading ? (
        <>Please wait...</>
      ) : (
        <>
          {data.map(item => (
            <CommentBox key={item._id} item={item} />
          ))}
        </>
      )}
    </div>
  )
}

export default Comment
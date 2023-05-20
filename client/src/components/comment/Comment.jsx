import React from 'react'
import CommentBox from './CommentBox'
import useFetch from '../../hooks/useFetch'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import './comment.css'

const Comment = ({ hotelId }) => {
  const { data, loading } = useFetch(`/comment/${hotelId}`)

  return (
    <div className='hotelComment'>
      <h3>Comment</h3>
      {loading ? (
        <>
          <div className="listSkeleton">
            <p><Skeleton width={120} height={120} circle="true" /></p>
            <p><Skeleton count={5} /></p>
          </div>
          <div className="listSkeleton">
            <p><Skeleton width={120} height={120} circle="true" /></p>
            <p><Skeleton count={5} /></p>
          </div>
          <div className="listSkeleton">
            <p><Skeleton width={120} height={120} circle="true" /></p>
            <p><Skeleton count={5} /></p>
          </div></>
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
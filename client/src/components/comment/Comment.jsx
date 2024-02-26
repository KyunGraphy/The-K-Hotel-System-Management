import React, { useContext } from 'react'
import CommentBox from './CommentBox'
import useFetch from '../../hooks/useFetch'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import './comment.css'
import CommentMsg from './CommentMsg'
import { Languages } from '../../constants/Languages'
import { AuthContext } from '../../contexts/AuthContext'

// ----------------------------------------------------------------
const Comment = ({ hotelId }) => {
  const { data, loading, reFetch } = useFetch(`/comment/${hotelId}`)
  const { lang } = useContext(AuthContext)

  return (
    <div className='hotelComment'>
      <h3>{Languages.other.cmt[lang]}</h3>
      {loading ? (
        <React.Fragment>
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
          </div></React.Fragment>
      ) : (
        <React.Fragment>
          {data.map(item => (
            <CommentBox key={item._id} item={item} reFetch={reFetch} />
          ))}
          <CommentMsg reFetch={reFetch} />
        </React.Fragment>
      )}
    </div>
  )
}

export default Comment
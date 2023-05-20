import React from 'react'
import useFetch from '../../hooks/useFetch'

const CommentBox = ({ item }) => {
  const { data } = useFetch(`/users/${item.userID}`)

  return (
    <div className='hotelCommentBox'>
      <img
        src='https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg'
        alt=''
        className='hotelCommentAvatar'
      />
      <div className='hotelCommentContent'>
        <div className='hotelCommentTitle'>
          <div>
            <h4>{data.name}</h4>
            <div>5 minutes ago</div>
          </div>
          <div>
            <ion-icon name="star"></ion-icon>
            <ion-icon name="star"></ion-icon>
            <ion-icon name="star"></ion-icon>
            <ion-icon name="star"></ion-icon>
            <ion-icon name="star-outline"></ion-icon>
          </div>
        </div>
        <div>{item.description}</div>
      </div>
    </div>
  )
}

export default CommentBox
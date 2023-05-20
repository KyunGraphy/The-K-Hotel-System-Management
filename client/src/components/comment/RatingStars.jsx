import React from 'react'

const RatingStars = ({ star }) => {
  const list = []
  for (var i = 0; i < 5; i++) {
    if (i < star) {
      list.push(<ion-icon name="star"></ion-icon>)
    } else {
      list.push(<ion-icon name="star-outline"></ion-icon>)
    }
  }

  return (
    <div>
      {list}
    </div>
  )
}

export default RatingStars
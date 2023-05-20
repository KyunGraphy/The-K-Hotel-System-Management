import React from 'react'

const RatingStars = ({ star }) => {
  const starFilled = new Array(star)
  const starOutline = new Array(star)

  for (let i = 0; i < starFilled.length; i++) {
    starFilled.push(star)
  }
  for (let i = 0; i < starOutline.length; i++) {
    starOutline.push(star)
  }

  return (
    <div>
      <ion-icon name="star"></ion-icon>
      {starFilled.map(star => (
        <ion-icon name="star"></ion-icon>
      ))}
      {starOutline.map(star => (
        <ion-icon name="star-outline"></ion-icon>
      ))}
    </div>
  )
}

export default RatingStars
import React, { useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch'

const Rating = ({ hotelId }) => {
  const { data } = useFetch(`/comment/${hotelId}`)
  const [rate, setRate] = useState()

  useEffect(() => {
    if (data.length > 0) {
      const rates = data.map(item => item.rating)
      const calculateRating = (rating) => {
        return rating.reduce(getSum, 0)

        function getSum(total, num) {
          return total + num
        }
      }
      setRate((calculateRating(rates) / data.length).toFixed(1))
    }
  }, [data])
  return (
    <div className="fpRating">
      <button>{rate}</button>
      <span>{(rate > 3.5) ? "Excellent" : "Good"}</span>
    </div>
  )
}

export default Rating
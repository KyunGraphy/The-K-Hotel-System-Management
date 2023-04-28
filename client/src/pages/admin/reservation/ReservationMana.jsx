import React from 'react'
import './styles/reservation.css'
import ReservationItem from './ReservationItem'

const ReservationMana = () => {
  return (
    <div className='reservation'>
      <h2>Reservation List</h2>
      <div className='reservationList'>
        <ReservationItem />
      </div>
    </div>
  )
}

export default ReservationMana
import React from 'react'
import "./styles/reservation.css";

const ReservationTable = () => {
  return (
    <div className='reservationTable'>
      <div className='reservationHeader'>
        <input type='checkbox' />
        <p>User ID</p>
        <p>Room type</p>
        <p>Check In Date</p>
        <p>Check Out Date</p>
        <p>Action</p>
      </div>
      <section>
        <div className='reservationData'>
          <input type='checkbox' />
          <p>626c391cb07624ccb8571982</p>
          <p>Single</p>
          <p>Mon 1st Jan</p>
          <p>Thu 4th Jan</p>
          <p className='actBtn'>
            <div className='viewBtn'>View</div>
            <div className='delBtn'>Delete</div>
          </p>
        </div>
        <div className='reservationData'>
          <input type='checkbox' />
          <p>626c391cb07624ccb8571982</p>
          <p>Single</p>
          <p>Mon 1st Jan</p>
          <p>Thu 4th Jan</p>
          <p className='actBtn'>
            <div className='viewBtn'>View</div>
            <div className='delBtn'>Delete</div>
          </p>
        </div>
        <div className='reservationData'>
          <input type='checkbox' />
          <p>626c391cb07624ccb8571982</p>
          <p>Single</p>
          <p>Mon 1st Jan</p>
          <p>Thu 4th Jan</p>
          <p className='actBtn'>
            <div className='viewBtn'>View</div>
            <div className='delBtn'>Delete</div>
          </p>
        </div>
      </section>
    </div>
  )
}

export default ReservationTable
import React from 'react'
import "./styles/reservation.css";

const ReservationTable = () => {
  return (
    <div className='reservationTable'>
      <div className='reservationHeader'>
        <input type='checkbox' className='headerCheckbox' />
        <p className='headerUserID'>User ID</p>
        <p className='headerRoom'>Room type</p>
        <p className='headerInDate'>Check In Date</p>
        <p className='headerOutDate'>Check Out Date</p>
        <p className='headerAction'>Action</p>
      </div>
      <div className='reservationData'>
        <input type='checkbox' />
        <p>626c391cb07624ccb8571982</p>
        <p>Single</p>
        <p>Mon 1st Jan</p>
        <p>Thu 4th Jan</p>
        <p className='actBtn'>
          <div className='assBtn'>Assign</div>
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
          <div className='assBtn'>Assign</div>
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
          <div className='assBtn'>Assign</div>
          <div className='delBtn'>Delete</div>
        </p>
      </div>
    </div>
  )
}

export default ReservationTable
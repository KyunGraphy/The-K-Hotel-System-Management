import React from 'react'
import "./styles/reservation.css";

import { AiOutlineUser, AiOutlineDashboard } from "react-icons/ai";
import { RiHotelBedLine } from "react-icons/ri";
import { IoPersonAdd, IoTrashSharp } from "react-icons/io5";

const ReservationItem = () => {
  return (
    <div className='reservationItem'>
      <div className='reservationHeader'>
        <div>
          <AiOutlineUser />
          UserID: 1234567890
        </div>
        <div>
          <RiHotelBedLine />
          The K Cong Hoa
        </div>
        <div>
          <AiOutlineDashboard />
          Mon 24th April
        </div>
      </div>
      <div className='reservationInfo'>
        <div>
          <p className='reservationTitle'>Customer Name</p>
          <p className='reservationData'>John Wick</p>
        </div>
        <div>
          <p className='reservationTitle'>Room Type</p>
          <p className='reservationData'>Single</p>
        </div>
        <div>
          <p className='reservationTitle'>Check in date:</p>
          <p className='reservationData'>Thu 27th April</p>
        </div>
        <div>
          <p className='reservationTitle'>Check out date:</p>
          <p className='reservationData'>Sat 29th April</p>
        </div>
        <div className='reservationAssign'>
          <button>
            <IoPersonAdd />
            Assign
          </button>
          <IoTrashSharp className='delReservation' />
        </div>
      </div>
    </div>
  )
}

export default ReservationItem
import React from 'react'

import { IoPeopleOutline, IoPersonOutline } from "react-icons/io5";

const Room = ({ room }) => {
  const statusMap = {
    'Available': 'bgGreen',
    'Booked': 'bgRed',
    'Using': 'bgOrange',
    'Check Out': 'bgPurple',
    'Maintenance': 'bgGrey',
  }

  return (
    <div
      className={`${statusMap[room.status]} room`}
      onClick={null}
    >
      <p>
        {(room.number < 10) ? room.number.toString().padStart(3, '0') : room.number}
      </p>
      <p>
        {room.type === 'Single' && <IoPersonOutline />}
        {room.type === 'Double' && <IoPeopleOutline />}
        {room.type}
      </p>
    </div>
  )
}

export default Room
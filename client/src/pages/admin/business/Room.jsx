import React, { useState } from 'react'
import { IoPeopleOutline, IoPersonOutline } from "react-icons/io5";
import { TbCrown } from "react-icons/tb";

import './styles/rooms.css'

const Room = ({ room }) => {
  const [openRoomTools, setOpenRoomTools] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [roomModal, setRoomModal] = useState();

  const statusMap = {
    'Available': 'bgGreen',
    'Booked': 'bgRed',
    'Using': 'bgOrange',
    'Check Out': 'bgPurple',
    'Maintenance': 'bgGrey',
  }

  const handleClickRoom = (room) => {
    setRoomModal(room);
    setOpenRoomTools(!openRoomTools);
  };

  return (
    <span
      className={`${statusMap[room.status]} roomItem`}
      onClick={() => handleClickRoom(room)}
    >
      {room?.type === 'Single' && <IoPersonOutline />}
      {room?.type === 'Double' && <IoPeopleOutline />}
      {room?.type === 'Royal' && <TbCrown />}
      {(room.number < 10) ? room.number.toString().padStart(3, '0') : room.number}

      {(openRoomTools && room.status === 'Available') && <div className='roomTools'>
        <div>Edit</div>
        <div>Maintenance</div>
        <div>Delete</div>
        <p>Cancel</p>
      </div>}
    </span>
  )
}

export default Room
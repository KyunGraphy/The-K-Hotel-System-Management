import React, { useState } from 'react'
import { IoPeopleOutline, IoPersonOutline } from "react-icons/io5";
import { TbCrown } from "react-icons/tb";

import './styles/rooms.css'

const Room = ({ room, listRooms, setListRooms }) => {
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

  const handleSetMaintenance = (roomId) => {
    const newListRooms = listRooms.map(room => {
      if (room.id === roomId) {
        return {
          ...room,
          status: 'Maintenance'
        }
      }

      return { ...room }
    })

    setListRooms(newListRooms)
  }

  return (
    <span
      className={`${statusMap[room.status]} bItem`}
      onClick={() => handleClickRoom(room)}
    >
      {room?.type === 'Single' && <IoPersonOutline />}
      {room?.type === 'Double' && <IoPeopleOutline />}
      {room?.type === 'Royal' && <TbCrown />}
      {(room.number < 10) ? room.number.toString().padStart(3, '0') : room.number}

      {(openRoomTools && room.status === 'Available') && <div className='bTools'>
        <div>Edit</div>
        <div onClick={() => handleSetMaintenance(room.id)}>Maintenance</div>
        <div>Delete</div>
        <p>Cancel</p>
      </div>}
    </span>
  )
}

export default Room
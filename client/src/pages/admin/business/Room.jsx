import React, { useEffect, useState } from 'react'

import { IoPeopleOutline, IoPersonOutline } from "react-icons/io5";

const Room = ({ room, listRooms, setListRooms }) => {
  const [openRoomTools, setOpenRoomTools] = useState(false);

  const statusMap = {
    'Available': 'bgGreen',
    'Booked': 'bgRed',
    'Using': 'bgOrange',
    'Check Out': 'bgPurple',
    'Maintenance': 'bgGrey',
  }

  useEffect(() => {
    function handleEscape(e) {
      if (e.key === 'Escape') {
        setOpenRoomTools(false);
      }
    }
    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  });

  const handleClickRoom = (room) => {
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
    <div
      className={`${statusMap[room.status]} room`}
      onClick={() => handleClickRoom(room)}
    >
      <p>
        {(room.number < 10) ? room.number.toString().padStart(3, '0') : room.number}
      </p>
      <p>
        {room.type === 'Single' && <IoPersonOutline />}
        {room.type === 'Double' && <IoPeopleOutline />}
        {room.type}
      </p>
      {(openRoomTools && room.status === 'Available') && <div className='roomTools'>
        <div>Edit</div>
        <div onClick={() => handleSetMaintenance(room.id)}>Maintenance</div>
        <div>Delete</div>
        <p>Cancel</p>
      </div>}
    </div>
  )
}

export default Room
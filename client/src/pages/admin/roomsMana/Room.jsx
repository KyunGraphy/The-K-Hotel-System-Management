import React, { useContext } from 'react'
import { RoomContext } from '../../../contexts/RoomContext';
import { IoPeopleOutline, IoPersonOutline } from "react-icons/io5";

// ----------------------------------------------------------------
const Room = ({ room }) => {
  const statusMap = {
    'Available': 'bgGreen',
    'Booked': 'bgRed',
    'Using': 'bgOrange',
    'Check Out': 'bgPurple',
    'Maintenance': 'bgGrey',
  }

  const { dispatch } = useContext(RoomContext)

  const handleSetRoom = (roomId) => {
    dispatch({ type: "SET_ROOM", payload: roomId })
  };

  return (
    <div
      className={`${statusMap[room.status]} room`}
      onClick={() => handleSetRoom(room._id)}
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
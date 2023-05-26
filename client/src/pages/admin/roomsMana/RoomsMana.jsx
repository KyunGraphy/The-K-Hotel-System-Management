import React, { useContext } from 'react'
import Rooms from './Rooms'
import './styles/rooms.css'

import { listRoomsMock } from "../../../mocks/ListRooms.js";
import Statusbar from '../../../components/statusbar/Statusbar';
import RoomDetails from './RoomDetails';
import { RoomContext } from '../../../contexts/RoomContext';

const RoomsMana = () => {
  const { roomId } = useContext(RoomContext)

  const roomsStatus = [
    {
      status: 'Available',
      count: listRoomsMock.filter((room) => room.status === 'Available').length,
      bg: '#32CD32',
    },
    {
      status: 'Booked',
      count: listRoomsMock.filter((room) => room.status === 'Booked').length,
      bg: '#ff0000',
    },
    {
      status: 'Using',
      count: listRoomsMock.filter((room) => room.status === 'Using').length,
      bg: '#FF8C00',
    },
    // {
    //   status: 'Check Out',
    //   count: listRoomsMock.filter((room) => room.status === 'Check Out').length,
    //   bg: '#5d4b63',
    // },
    {
      status: 'Maintenance',
      count: listRoomsMock.filter((room) => room.status === 'Maintenance').length,
      bg: '#737373',
    },
  ];

  return (
    <div className='roomsMana'>
      {roomId ? (
        <RoomDetails />
      ) : (
        <div>
          <Statusbar roomsStatus={roomsStatus} />
          <Rooms />
        </div>
      )}
    </div>
  )
}

export default RoomsMana
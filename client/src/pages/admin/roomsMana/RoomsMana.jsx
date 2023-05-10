import React, { useState } from 'react'
import Rooms from './Rooms'
import './styles/rooms.css'

import { listRoomsMock } from "../../../mocks/ListRooms.js";
import Statusbar from '../../../components/statusbar/Statusbar';
import RoomDetails from './RoomDetails';

const RoomsMana = () => {
  const [listRooms, setListRooms] = useState(listRoomsMock);
  const [openRoomDetails, setOpenRoomDetails] = useState(true);
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
      {openRoomDetails ? (
        <RoomDetails />
      ) : (
        <p>
          <Statusbar roomsStatus={roomsStatus} />
          <Rooms listRooms={listRooms} />
        </p>
      )}
    </div>
  )
}

export default RoomsMana
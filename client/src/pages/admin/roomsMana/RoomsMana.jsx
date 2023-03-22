import React, { useEffect, useState } from 'react'
import Rooms from './Rooms'
import './roomsMana.css'
import Statusbar from './Statusbar'

import { listRoomsMock } from "../../../mocks/ListRooms.js";

const RoomsMana = () => {
  const [listRooms, setListRooms] = useState(listRoomsMock);
  const [filter, setFilter] = useState({
    floor: 0,
  });
  const [roomsStatus, setRoomsStatus] = useState([
    {
      status: 'Available',
      count: listRoomsMock.filter((room) => room.status === 'Available').length,
      bg: '#32CD32',
    },
    {
      status: 'Booked',
      count: listRoomsMock.filter((room) => room.status === 'Booked').length,
      bg: '#800834',
    },
    {
      status: 'Using',
      count: listRoomsMock.filter((room) => room.status === 'Using').length,
      bg: '#ee4540',
    },
    {
      status: 'Check Out',
      count: listRoomsMock.filter((room) => room.status === 'Check Out').length,
      bg: '#5d4b63',
    },
    {
      status: 'Maintenance',
      count: listRoomsMock.filter((room) => room.status === 'Maintenance').length,
      bg: '#737373',
    },
  ]);

  return (
    <div className='roomsMana'>
      <Statusbar roomsStatus={roomsStatus} />
      <Rooms listRooms={listRooms} />
    </div>
  )
}

export default RoomsMana
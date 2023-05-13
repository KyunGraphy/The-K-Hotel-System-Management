import React, { useState } from 'react'
import Rooms from './Rooms'

import './styles/business.css'

import { listRoomsMock } from "../../../mocks/ListRooms.js";
import Statusbar from '../../../components/statusbar/Statusbar';

const Business = () => {
  const [listRooms, setListRooms] = useState(listRoomsMock);
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
    <div className='business'>
      <Statusbar roomsStatus={roomsStatus} />
      <Rooms listRooms={listRooms} setListRooms={setListRooms} />
    </div>
  )
}

export default Business
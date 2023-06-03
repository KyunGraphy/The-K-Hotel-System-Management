import React, { useContext } from 'react'
import Rooms from './Rooms'
import './styles/rooms.css'

import Statusbar from '../../../components/statusbar/Statusbar';
import RoomDetails from './RoomDetails';
import { RoomContext } from '../../../contexts/RoomContext';

const RoomsMana = () => {
  const { roomId } = useContext(RoomContext)

  const roomsStatus = [
    {
      status: 'Available',
      bg: '#32CD32',
    },
    {
      status: 'Booked',
      bg: '#ff0000',
    },
    {
      status: 'Using',
      bg: '#FF8C00',
    },
    // {
    //   status: 'Check Out',
    //   bg: '#5d4b63',
    // },
    {
      status: 'Maintenance',
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
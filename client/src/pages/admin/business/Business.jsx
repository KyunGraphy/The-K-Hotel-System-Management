import React, { useContext } from 'react'
import { RoomContext } from '../../../contexts/RoomContext';
import Rooms from './Rooms'
import './styles/business.css'

import Statusbar from '../../../components/statusbar/Statusbar';
import BusinessDetail from './BusinessDetail';

const Business = () => {
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
    <div className='business'>
      {roomId ? (
        <BusinessDetail />
      ) : (
        <div>
          <Statusbar roomsStatus={roomsStatus} />
          <Rooms />
        </div>
      )}
    </div>
  )
}

export default Business
import React, { useContext } from 'react'
import { RoomContext } from '../../../contexts/RoomContext';
import Rooms from './Rooms'
import './styles/rooms.css'

import Statusbar from '../../../components/statusbar/Statusbar';
import RoomDetails from './RoomDetails';
import { roomsStatus } from '../../../constants/Constant';

// ----------------------------------------------------------------
const RoomsMana = () => {
  const { roomId } = useContext(RoomContext)

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
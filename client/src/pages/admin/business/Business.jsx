import React, { useContext } from 'react'
import { RoomContext } from '../../../contexts/RoomContext';
import Rooms from './Rooms'
import './styles/business.css'

import Statusbar from '../../../components/statusbar/Statusbar';
import BusinessDetail from './BusinessDetail';
import { roomsStatus } from '../../../constants/Constant';

// ----------------------------------------------------------------
const Business = () => {
  const { roomId } = useContext(RoomContext)

  return (
    <div className='business'>
      {roomId ? (
        <BusinessDetail />
      ) : (
        <div>
          <Statusbar roomsStatus={roomsStatus} hasAddBtn={true} />
          <Rooms />
        </div>
      )}
    </div>
  )
}

export default Business
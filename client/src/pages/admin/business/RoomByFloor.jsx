import React from 'react'
import './styles/rooms.css'

import Room from './Room';

const RoomByFloor = ({ rooms }) => {
  // const roomsContext = useContext(RoomsManaContext)

  // const handleClickRoom = () => {
  //   roomsContext.setShowRoomInfo(!roomsContext.showRoomInfo);
  // };


  return (
    <div className='room'>
      <div className='roomFloor'>{rooms.title} Floor</div>
      <div className='roomField'>
        {rooms.rooms.map((room, index) => (
          <Room
            key={index}
            room={room}
          />
        ))}
      </div>
    </div>
  )
}

export default RoomByFloor
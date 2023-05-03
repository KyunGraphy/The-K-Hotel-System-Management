import React from 'react'
import './styles/rooms.css'

import Room from './Room';

const RoomByFloor = ({ rooms, listRooms, setListRooms }) => {

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
            listRooms={listRooms}
            setListRooms={setListRooms}
          />
        ))}
      </div>

    </div>
  )
}

export default RoomByFloor
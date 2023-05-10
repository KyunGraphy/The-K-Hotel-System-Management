import React from 'react'
import './styles/rooms.css'
import Room from './Room'

const Rooms = ({ listRooms }) => {
  return (
    <div className='rooms'>
      {listRooms.map((room, index) => (
        <Room key={index} room={room} />
      ))}
    </div>
  )
}

export default Rooms
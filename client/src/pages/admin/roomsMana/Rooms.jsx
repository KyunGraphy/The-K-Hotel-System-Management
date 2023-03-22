import React from 'react'
import Room from './Room'
import './rooms.css'

const Rooms = ({ listRooms }) => {

  return (
    <div className='rooms'>
      {(listRooms.length === 0) ? <p className='noRoom'>Room not found</p> : listRooms?.map((room, index) => (
        <Room key={index} room={room} />
      ))}
    </div>
  )
}

export default Rooms
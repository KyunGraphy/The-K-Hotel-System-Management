import React from 'react'
import Room from './Room'

const Rooms = ({ listRooms, setListRooms }) => {
  return (
    <div className='rooms'>
      {listRooms.map((room, index) => (
        <Room key={index} room={room} listRooms={listRooms} setListRooms={setListRooms} />
      ))}
    </div>
  )
}

export default Rooms
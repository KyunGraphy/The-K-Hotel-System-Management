import React from 'react'
import RoomByFloor from './RoomByFloor'
import './styles/rooms.css'

const Rooms = ({ listRooms, setListRooms }) => {
  const roomsByFloor = [
    {
      title: 'Ground',
      rooms: [],
    },
    {
      title: 1,
      rooms: [],
    },
    {
      title: 2,
      rooms: [],
    },
    {
      title: 3,
      rooms: [],
    },
    {
      title: 4,
      rooms: [],
    },
    {
      title: 5,
      rooms: [],
    },
    {
      title: 6,
      rooms: [],
    },
    {
      title: 7,
      rooms: [],
    },
    {
      title: 8,
      rooms: [],
    },
    {
      title: 9,
      rooms: [],
    },
  ]

  for (let i = 0; i < listRooms.length; i++) {
    const floor = (Math.floor(listRooms[i].number / 100))
    roomsByFloor[floor].rooms.push(listRooms[i]);
  }

  return (
    <div className='rooms'>
      {roomsByFloor?.map(rooms => (
        <RoomByFloor
          key={rooms.title}
          rooms={rooms}
          listRooms={listRooms}
          setListRooms={setListRooms}
        />
      ))}
    </div>
  )
}

export default Rooms
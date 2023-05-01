import React, { useEffect, useState } from 'react'
import RoomByFloor from './RoomByFloor'
import './styles/rooms.css'

const Rooms = ({ listRooms }) => {
  const [roomsByFloor, setRoomsByFloor] = useState([
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
  ])

  useEffect(() => {
    let newRoomsByFloor = [...roomsByFloor];
    for (let i = 0; i < listRooms.length; i++) {
      const floor = (Math.floor(listRooms[i].number / 100))
      newRoomsByFloor[floor].rooms.push(listRooms[i]);
    }

    setRoomsByFloor(newRoomsByFloor)
  }, [listRooms])

  return (
    <div className='rooms'>
      {roomsByFloor?.map(rooms => (
        <RoomByFloor key={rooms.title} rooms={rooms} />
      ))}
    </div>
  )
}

export default Rooms
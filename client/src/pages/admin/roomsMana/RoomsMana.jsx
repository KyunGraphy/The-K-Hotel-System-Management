import React, { useEffect, useState } from 'react'
import Rooms from './Rooms'
import './roomsMana.css'
import Statusbar from './Statusbar'

import { listRoomsMock } from "../../../mocks/ListRooms.js";

const RoomsMana = () => {
  const [listRooms, setListRooms] = useState(listRoomsMock);
  const [filter, setFilter] = useState({
    floor: 0,
    department: '',
    status: ['Available',
      'Booked',
      'Using',
      'Check Out',
      'Maintenance',
    ],
  });
  const [roomsStatus, setRoomsStatus] = useState([
    {
      status: 'Available',
      count: listRoomsMock.filter((room) => room.status === 'Available').length,
      bg: '#128c7e',
      on: true,
    },
    {
      status: 'Booked',
      count: listRoomsMock.filter((room) => room.status === 'Booked').length,
      bg: '#800834',
      on: true,
    },
    {
      status: 'Using',
      count: listRoomsMock.filter((room) => room.status === 'Using').length,
      bg: '#ee4540',
      on: true,
    },
    {
      status: 'Check Out',
      count: listRoomsMock.filter((room) => room.status === 'Check Out').length,
      bg: '#5d4b63',
      on: true,
    },
    {
      status: 'Maintenance',
      count: listRoomsMock.filter((room) => room.status === 'Maintenance').length,
      bg: '#737373',
      on: true,
    },
  ]);

  useEffect(() => {
    editRoom();
  }, [filter]);

  const handleFloorFilter = (e) => {
    setFilter({
      ...filter,
      floor: parseInt(e.target.value)
    })
  }

  const handleStatusFilter = (status) => {
    setFilter({
      ...filter,
      status: (filter.status.includes(status)) ? (
        filter.status.filter(item => item !== status)
      ) : (
        [...filter.status, status]
      )
    })

    const newRoomsStatus = [...roomsStatus].map((roomsStatus) => {
      if (roomsStatus.status === status) {
        return {
          ...roomsStatus,
          on: !roomsStatus.on,
        }
      }
      return {
        ...roomsStatus,
      }
    })
    setRoomsStatus(newRoomsStatus)
  }

  function editRoom() {
    let newListRooms = [...listRoomsMock]
    if (filter.floor !== 0) {
      newListRooms = listRoomsMock.filter((room) => Math.floor(room.number / 100) === filter.floor)
    }

    const newListRoomsStatusFilter = newListRooms.filter((room) => {
      return filter.status.includes(room.status);
    })

    setListRooms(newListRoomsStatusFilter)
  }

  return (
    <div className='roomsMana'>
      <Statusbar
        filterFloor={filter.floor}
        onFloorFilter={handleFloorFilter}
        roomsStatus={roomsStatus}
        onStatusFilter={handleStatusFilter}
      />
      <Rooms listRooms={listRooms} />
    </div>
  )
}

export default RoomsMana
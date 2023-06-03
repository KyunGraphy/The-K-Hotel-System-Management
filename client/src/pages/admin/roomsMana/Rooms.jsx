import React, { useContext, useEffect, useState } from 'react'
import Room from './Room'
import useFetch from '../../../hooks/useFetch'
import { RoomContext } from '../../../contexts/RoomContext'

const Rooms = () => {
  const { hotelId, roomSearch } = useContext(RoomContext)
  const { data, loading } = useFetch(`/hotel/room/${hotelId}/${roomSearch}`)
  const [rooms, setRooms] = useState([])

  useEffect(() => {
    if (data.length !== 0) {
      const today = new Date();
      today.setHours(0)
      today.setMinutes(0)
      today.setSeconds(0)
      const defaultToday = Math.floor(today.getTime() / 100000) * 100000
      setRooms(data.map(item => (
        (item.unavailableDate.includes(defaultToday)) ? (
          {
            ...item,
            status: 'Booked'
          }
        ) : item
      )))
    }
  }, [data])

  return (
    <div className='rooms'>
      {loading ? (
        <>Please wait...</>
      ) : (
        <>
          {(data.length === 0) ? (
            <>No room found</>
          ) : (
            <>
              {rooms.map((room, index) => (
                <Room key={index} room={room} />
              ))}
            </>
          )}
        </>
      )}
    </div>
  )
}

export default Rooms
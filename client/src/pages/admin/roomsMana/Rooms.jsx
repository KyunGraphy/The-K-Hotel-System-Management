import React, { useContext, useEffect, useState } from 'react'
import Room from './Room'
import useFetch from '../../../hooks/useFetch'
import { RoomContext } from '../../../contexts/RoomContext'
import useSetDefaultDate from '../../../hooks/useSetDefaultDate'

// ----------------------------------------------------------------
const Rooms = () => {
  const { hotelId, roomSearch } = useContext(RoomContext)
  const { data, loading } = useFetch(`/hotel/room/${hotelId}/${roomSearch}`)
  const [rooms, setRooms] = useState([])

  const today = new Date();
  const defaultToday = useSetDefaultDate(today)

  useEffect(() => {
    if (data.length !== 0) {
      setRooms(data.map(item => (
        (item.unavailableDate.includes(defaultToday)) ? (
          {
            ...item,
            status: 'Booked'
          }
        ) : item
      )))
    }
  }, [data, defaultToday])

  return (
    <div className='rooms'>
      {loading ? (
        <React.Fragment>Please wait...</React.Fragment>
      ) : (
        <React.Fragment>
          {(data.length === 0) ? (
            <React.Fragment>No room found</React.Fragment>
          ) : (
            <React.Fragment>
              {rooms.map((room, index) => (
                <Room key={index} room={room} />
              ))}
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </div>
  )
}

export default Rooms
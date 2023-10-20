import React, { useContext, useEffect, useState } from 'react'
import Room from './Room'
import { RoomContext } from '../../../contexts/RoomContext'
import useFetch from '../../../hooks/useFetch'
import useSetDefaultDate from '../../../hooks/useSetDefaultDate'
import BackdropComponent from '../../../components/backdrop/BackdropComponent'

const Rooms = () => {
  const { hotelId, roomSearch } = useContext(RoomContext)
  const { data, loading } = useFetch(`/hotel/room/${hotelId}/${roomSearch}`)
  const [rooms, setRooms] = useState([])

  const defaultToday = useSetDefaultDate(new Date())

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
        <BackdropComponent />
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
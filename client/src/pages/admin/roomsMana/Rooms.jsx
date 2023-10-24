import React, { useContext, useEffect, useMemo, useState } from 'react'
import Room from './Room'
import useFetch from '../../../hooks/useFetch'
import { RoomContext } from '../../../contexts/RoomContext'
import useSetDefaultDate from '../../../hooks/useSetDefaultDate'
import 'react-loading-skeleton/dist/skeleton.css'
import BackdropComponent from '../../../components/backdrop/BackdropComponent'

// ----------------------------------------------------------------
const Rooms = () => {
  const { hotelId, roomSearch } = useContext(RoomContext)
  const { data, loading } = useFetch(`/hotel/room/${hotelId}/${roomSearch}`)
  const [rooms, setRooms] = useState([])

  useMemo(() => data.sort((a, b) => {
    return a.number - b.number
  }), [data])

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
    <React.Fragment>
      {loading ? (
        <BackdropComponent />
      ) : (
        <div className='rooms'>
          {(data.length === 0) ? (
            <div style={{ textAlign: 'center', width: '100%', fontWeight: '600', fontSize: '18px' }}>Choose a department to get rooms</div>
          ) : (
            <React.Fragment>
              {rooms.map((room, index) => (
                <Room key={index} room={room} />
              ))}
            </React.Fragment>
          )}
        </div>
      )}
    </React.Fragment>
  )
}

export default Rooms
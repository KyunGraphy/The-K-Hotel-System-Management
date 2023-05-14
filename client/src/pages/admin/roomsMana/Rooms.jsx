import React, { useContext } from 'react'
import './styles/rooms.css'
import Room from './Room'
import useFetch from '../../../hooks/useFetch'
import { RoomContext } from '../../../contexts/RoomContext'

const Rooms = () => {
  const { hotelId, roomSearch } = useContext(RoomContext)

  const { data, loading } = useFetch(`/hotel/room/${hotelId}/${roomSearch}`)

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
              {data.map((room, index) => (
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
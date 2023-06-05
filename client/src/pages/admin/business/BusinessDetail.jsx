import React, { useContext } from 'react'
import { RoomContext } from '../../../contexts/RoomContext'
import useFetch from '../../../hooks/useFetch'
import { IoArrowBackCircle } from 'react-icons/io5'
import ServiceItem from '../../../components/serviceItem/ServiceItem'

const BusinessDetail = () => {
  const { roomId, dispatch } = useContext(RoomContext)
  const { data, loading } = useFetch(`/room/${roomId}`)

  const removeRoom = () => {
    dispatch({ type: "REMOVE_ROOM" })
  };

  return (
    <div className='roomsDetails'>
      {loading ? (
        <>Please wait...</>
      ) : (
        <>
          <IoArrowBackCircle
            className='backIcon'
            onClick={removeRoom}
          />
          <h2 className='roomNumber'>Room {data.number}</h2>
          <div className='roomBlock'>
            <div className='roomInfo'>
              <p>Room number:
                <span>{data.number}</span>
              </p>
              <p>Type:
                <span>{data.type}</span>
              </p>
              <p>Max people:
                <span>{data.maxPeople}</span>
              </p>
            </div>
            <div className='roomInfo'>
              <p>Price:
                <span>{data.type === "Single" ? 30 : 50}</span>
              </p>
              <p>Title:
                <span>{data.title}</span>
              </p>
              <p>Status:
                <span>{data.status}</span>
              </p>
            </div>
          </div>

          <div className='roomService'>
            {/* <div className='roomServiceItem'>
              <img
                src='https://ae01.alicdn.com/kf/HTB1h1ViOrvpK1RjSZPiq6zmwXXaf/Full-HD-1080P-42-55-65-inch-ultra-slim-android-television-Smart-TV-HD-LED-2GB.jpg'
                alt=''
              />
              <p>Television: 1</p>
            </div> */}
            <ServiceItem />
            <ServiceItem />
            <ServiceItem />
          </div>
        </>
      )}
    </div>
  )
}

export default BusinessDetail
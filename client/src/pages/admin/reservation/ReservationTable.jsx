import React, { useContext } from 'react'
import "./styles/reservation.css";
import useFetch from '../../../hooks/useFetch';
import { RoomContext } from '../../../contexts/RoomContext';

const ReservationTable = () => {
  const { hotelId } = useContext(RoomContext)
  const { data, loading } = useFetch(`/reservation/hotel/${hotelId}`)
  console.log(data)

  return (
    <div className='reservationTable'>
      <div className='reservationHeader'>
        <input type='checkbox' />
        <p>User Name</p>
        <p>Room type</p>
        <p>Description</p>
        <p>Check In Date</p>
        <p>Check Out Date</p>
        <p>Action</p>
      </div>
      <section>
        {loading ? (
          <>Please wait...</>
        ) : (
          <>
            {(data.length === 0) ? (
              <>No room found</>
            ) : (
              <>
                {data.map(item => (
                  <div key={item._id} className='reservationData'>
                    <input type='checkbox' />
                    <p>{item.name}</p>
                    <p>{item.singleRoom} Single Room <br /> {item.doubleRoom} Double Room</p>
                    <p>{item.adult} Adult <br /> {item.children} Children</p>
                    <p>{item.checkInDate}</p>
                    <p>{item.checkOutDate}</p>
                    <p className='actBtn'>
                      <div className='viewBtn'>View</div>
                      <div className='delBtn'>Delete</div>
                    </p>
                  </div>
                ))}
              </>
            )}
          </>
        )}
      </section>
    </div>
  )
}

export default ReservationTable
import React, { useContext } from 'react'
import axios from 'axios';
import "./styles/reservation.css";
import useFetch from '../../../hooks/useFetch';
import { RoomContext } from '../../../contexts/RoomContext';
import { useNavigate } from "react-router-dom";

const ReservationTable = () => {
  const { hotelId } = useContext(RoomContext)
  const { data, loading, reFetch } = useFetch(`/reservation/hotel/${hotelId}`)

  const navigate = useNavigate()

  const handleDeleteReservation = async (reservationId) => {
    await axios.delete(`/reservation/${reservationId}`)
    reFetch()
  };

  return (
    <div className='reservationTable'>
      <div className='reservationHeader'>
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
                    <p>{item.name}</p>
                    <p>{item.singleRoom} Single Room <br /> {item.doubleRoom} Double Room</p>
                    <p>{item.adult} Adult <br /> {item.children} Children</p>
                    <p>{new Date(item.checkInDate).toDateString()}</p>
                    <p>{new Date(item.checkOutDate).toDateString()}</p>
                    <p className='actBtn'>
                      <span
                        className='viewBtn'
                        onClick={() => navigate('/admin/reservation/detail', { state: { id: item._id } })}
                      >View</span>
                      {item.rooms.length === 0 &&
                        <span
                          className='delBtn'
                          onClick={() => handleDeleteReservation(item._id)}
                        >Delete</span>
                      }
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
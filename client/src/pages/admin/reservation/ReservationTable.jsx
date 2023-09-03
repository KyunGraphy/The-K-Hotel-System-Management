import React, { useContext, useState } from 'react'
import axios from 'axios';
import "./styles/reservation.css";
import useFetch from '../../../hooks/useFetch';
import { RoomContext } from '../../../contexts/RoomContext';
import { useNavigate } from "react-router-dom";
import ConfirmBox from '../../../components/confirmForm/ConfirmBox';
import { Toastify } from '../../../components/toastify/Toastify';

// ----------------------------------------------------------------
const ReservationTable = () => {
  const [confirmForm, setConfirmForm] = useState(false);
  const [delReservationId, setDelReservationId] = useState(undefined);
  const [successMsg, setSuccessMsg] = useState("");
  const { hotelId } = useContext(RoomContext)
  const { data, loading, reFetch } = useFetch(`/reservation/hotel/${hotelId}`)

  const navigate = useNavigate()

  const handleSetDeleteReservation = (reservationId) => {
    setConfirmForm(true)
    setDelReservationId(reservationId)
  };

  const handleDeleteReservation = async () => {
    try {
      await axios.delete(`/reservation/${delReservationId}`)
      setSuccessMsg('Delete Reservation successfully');
      reFetch()
    } catch (err) {
      console.log(err);
    }
    setConfirmForm(false);
    setDelReservationId(undefined)
  };

  return (
    <div className='reservationTable'>
      {confirmForm && (
        <ConfirmBox
          msg='Do you want to delete this reservation'
          type='delete'
          callBack={handleDeleteReservation}
          cancelFunc={() => setConfirmForm(false)}
        />
      )}
      {successMsg && <Toastify msg={successMsg} type="success" />}
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
          <React.Fragment>Please wait...</React.Fragment>
        ) : (
          <React.Fragment>
            {(data.length === 0) ? (
              <React.Fragment>No reservation found</React.Fragment>
            ) : (
              <React.Fragment>
                {data.map(item => (
                  <div
                    key={item._id}
                    className='reservationData'
                  >
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
                      {item.rooms.length === 0 && (
                        <span
                          className='delBtn'
                          onClick={() => handleSetDeleteReservation(item._id)}
                        >
                          Delete
                        </span>
                      )}
                    </p>
                  </div>
                ))}
              </React.Fragment>
            )}
          </React.Fragment>
        )}
      </section>
    </div>
  )
}

export default ReservationTable
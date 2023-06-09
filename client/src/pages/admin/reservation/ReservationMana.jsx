import React, { useContext, useState } from 'react'
import './styles/reservation.css'
import ReservationTable from './ReservationTable'
import useFetch from '../../../hooks/useFetch';
import { RoomContext } from '../../../contexts/RoomContext';
import AddReservation from './AddReservation';

const ReservationMana = () => {
  const [addNewReserve, setAddNewReserve] = useState(false);

  const { loading, data } = useFetch("/hotel")
  const { hotelId, dispatch } = useContext(RoomContext)

  const handleSetHotel = (e) => {
    dispatch({ type: "SET_HOTEL", payload: e.target.value || null })
  };

  return (
    <div className='reservation'>
      <h2>Reservation</h2>
      {loading ? (
        <>Please wait...</>
      ) : (
        <>
          {addNewReserve ? (
            <AddReservation setAddNewReserve={setAddNewReserve} />
          ) : (
            <>
              <div className='reservationTools'>
                <div>
                  <label>Department: </label>
                  <select style={{ outline: 'none' }} onChange={handleSetHotel}>
                    <option selected value='' disabled>---</option>
                    {
                      data.map(item => (
                        <option
                          key={item._id}
                          value={item._id}
                          selected={hotelId === item._id}
                        >{item.department}</option>
                      ))
                    }
                  </select>
                </div>
                <div
                  className='addNewBtn'
                  onClick={() => setAddNewReserve(true)}
                >Add New</div>
              </div>
              <ReservationTable />
            </>
          )}

        </>
      )}
    </div>
  )
}

export default ReservationMana
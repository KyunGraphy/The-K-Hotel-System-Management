import React, { useContext, useState } from 'react'
import './styles/reservation.css'
import ReservationTable from './ReservationTable'
import useFetch from '../../../hooks/useFetch';
import { RoomContext } from '../../../contexts/RoomContext';
import AddReservation from './AddReservation';
import { Box, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import BackdropComponent from '../../../components/backdrop/BackdropComponent';

// ----------------------------------------------------------------
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
        <BackdropComponent />
      ) : (
        <React.Fragment>
          {addNewReserve ? (
            <AddReservation setAddNewReserve={setAddNewReserve} />
          ) : (
            <React.Fragment>
              <div className='reservationTools'>
                <div>
                  <label>Department: </label>
                  <select
                    style={{ outline: 'none' }}
                    onChange={handleSetHotel}
                  >
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
              </div>
              <ReservationTable />
              <Box
                sx={{ '& > :not(style)': { m: 1 }, position: 'fixed', right: '3em', bottom: '3em' }}
                onClick={() => setAddNewReserve(true)}
              >
                <Fab color="primary" aria-label="add">
                  <AddIcon />
                </Fab>
              </Box>
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </div>
  )
}

export default ReservationMana
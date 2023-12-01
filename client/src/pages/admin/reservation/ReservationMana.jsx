import './styles/reservation.css'
import React, { useContext, useState } from 'react'
import { Box, Fab, Grid, Tab, Tabs, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ReservationTable from './listComponent/ReservationTable'
import useFetch from '../../../hooks/useFetch';
import { RoomContext } from '../../../contexts/RoomContext';
import AddReservation from './AddReservation';
import BackdropComponent from '../../../components/backdrop/BackdropComponent';
import TodayComponent from './todayComponent'

// ----------------------------------------------------------------
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

// ----------------------------------------------------------------
const ReservationMana = () => {
  const [addNewReserve, setAddNewReserve] = useState(false);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { loading, data } = useFetch("/hotel")
  const { hotelId, dispatch } = useContext(RoomContext)

  const handleSetHotel = (e) => {
    dispatch({ type: "SET_HOTEL", payload: e.target.value || null })
  };

  return (
    <Grid>
      {addNewReserve && (
        <span
          className='backIcon'
          onClick={() => setAddNewReserve(false)}
        >
          <ion-icon name="chevron-back-outline"></ion-icon>
          Back
        </span>
      )}
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
                      <option selected value=''>All</option>
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

                <Box sx={{ width: '100%' }}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider', background: 'lavender' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                      <Tab sx={{ flex: 1, maxWidth: '50%', fontWeight: '500' }} label="Today's Activity" {...a11yProps(0)} />
                      <Tab sx={{ flex: 1, maxWidth: '50%', fontWeight: '500' }} label="List Reservation" {...a11yProps(1)} />
                    </Tabs>
                  </Box>
                  <CustomTabPanel value={value} index={0}>
                    <Box >
                      <TodayComponent />
                    </Box>
                  </CustomTabPanel>
                  <CustomTabPanel value={value} index={1}>
                    <ReservationTable />
                  </CustomTabPanel>
                </Box>

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
    </Grid>
  )
}

export default ReservationMana
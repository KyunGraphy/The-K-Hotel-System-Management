import React, { useContext, useState } from 'react'
import './styles/staff.css'
import { Box, Fab, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import StaffTable from './StaffTable'
import useFetch from '../../../hooks/useFetch';
import { RoomContext } from '../../../contexts/RoomContext';
import BackdropComponent from '../../../components/backdrop/BackdropComponent';
import AddStaff from './AddStaff';

const StaffMana = () => {
  const [addNewStaff, setAddNewStaff] = useState(false);

  const { loading, data } = useFetch("/hotel")
  const { hotelId, dispatch } = useContext(RoomContext)

  const handleSetHotel = (e) => {
    dispatch({ type: "SET_HOTEL", payload: e.target.value || null })
  };

  return (
    <Grid className='staff'>
      <h2>STAFF</h2>
      {loading ? (
        <BackdropComponent />
      ) : (
        <React.Fragment>
          <AddStaff
            addNewStaff={addNewStaff}
            setAddNewStaff={setAddNewStaff}
          />
          <div className='staffTools'>
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
          <div className='staffList'>
            <StaffTable />
          </div>
        </React.Fragment>
      )}
      <Box
        sx={{ '& > :not(style)': { m: 1 }, position: 'fixed', right: '3em', bottom: '3em' }}
        onClick={() => setAddNewStaff(true)}
      >
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Box>
    </Grid>
  )
}

export default StaffMana
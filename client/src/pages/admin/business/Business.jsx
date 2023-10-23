import React, { useContext, useState } from 'react'
import { RoomContext } from '../../../contexts/RoomContext';
import Rooms from './Rooms'
import './styles/business.css'

import Statusbar from '../../../components/statusbar/Statusbar';
import BusinessDetail from './BusinessDetail';
import { roomsStatus } from '../../../constants/Constant';
import { Box, Fab, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddBusiness from './AddBusiness';

// ----------------------------------------------------------------
const Business = () => {
  const [addNewRoom, setAddNewRoom] = useState(false);
  const { roomId } = useContext(RoomContext)

  return (
    <div className='business'>
      <h2>BUSINESS</h2>
      {roomId ? (
        <BusinessDetail />
      ) : (
        <Grid>
          <AddBusiness
            addNewRoom={addNewRoom}
            setAddNewRoom={setAddNewRoom}
          />
          <Grid>
            <Statusbar roomsStatus={roomsStatus} />
            <Rooms />
            <Box
              sx={{ '& > :not(style)': { m: 1 }, position: 'fixed', right: '3em', bottom: '3em' }}
              onClick={() => setAddNewRoom(true)}
            >
              <Fab color="primary" aria-label="add">
                <AddIcon />
              </Fab>
            </Box>
          </Grid>
        </Grid>
      )}
    </div>
  )
}

export default Business
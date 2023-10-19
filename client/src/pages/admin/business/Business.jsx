import React, { useContext } from 'react'
import { RoomContext } from '../../../contexts/RoomContext';
import Rooms from './Rooms'
import './styles/business.css'

import Statusbar from '../../../components/statusbar/Statusbar';
import BusinessDetail from './BusinessDetail';
import { roomsStatus } from '../../../constants/Constant';
import { Box, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// ----------------------------------------------------------------
const Business = () => {
  const { roomId } = useContext(RoomContext)

  return (
    <div className='business'>
      {roomId ? (
        <BusinessDetail />
      ) : (
        <div>
          <Statusbar roomsStatus={roomsStatus} />
          <Rooms />
          <Box
            sx={{ '& > :not(style)': { m: 1 }, position: 'fixed', right: '3em', bottom: '3em' }}
            onClick={null}
          >
            <Fab color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </Box>
        </div>
      )}
    </div>
  )
}

export default Business
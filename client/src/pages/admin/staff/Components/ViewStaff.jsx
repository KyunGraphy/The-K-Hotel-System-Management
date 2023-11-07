import '../styles/view.css'
import React, { useState } from 'react'
import { Box, Fab, Grid } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import { useLocation, useNavigate } from 'react-router-dom'
import LeftPaper from './LeftPaper'
import RightPaper from './RightPaper'
import useFetch from '../../../../hooks/useFetch'
import BackdropComponent from '../../../../components/backdrop/BackdropComponent'
import EditStaff from './EditStaff';

const ViewStaff = () => {
  const [editStaff, setEditStaff] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { id: staffId } = location.state
  const { loading: loadingStaff, data: staff } = useFetch(`/users/${staffId}`)
  const { loading: loadingHotel, data: hotel } = useFetch(`/hotel/${staff.hotelId}`)

  return (
    <React.Fragment>
      {(loadingStaff || loadingHotel) ? (
        <BackdropComponent />
      ) : (
        <React.Fragment>
          <EditStaff
            editStaff={editStaff}
            setEditStaff={setEditStaff}
          />
          <span
            className='backIcon'
            onClick={() => navigate('/admin/staff')}
          >
            <ion-icon name="chevron-back-outline"></ion-icon>
            Back
          </span>
          <Grid
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}>
            <Box
              sx={{
                display: 'flex',
                height: '100%',
                '& > :not(style)': {
                  margin: "1em",
                  minWidth: 560,
                  minHeight: 480,
                },
              }}
            >
              <LeftPaper staff={staff} />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                '& > :not(style)': {
                  margin: "1em",
                  minWidth: 560,
                  minHeight: 225,
                },
              }}
            >
              <RightPaper staff={staff} hotel={hotel} />
            </Box>
          </Grid>
          <Box
            sx={{ '& > :not(style)': { m: 1 }, position: 'fixed', right: '3em', bottom: '3em' }}
            onClick={() => setEditStaff(true)}
          >
            <Fab color="secondary" aria-label="add">
              <EditIcon />
            </Fab>
          </Box>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default ViewStaff
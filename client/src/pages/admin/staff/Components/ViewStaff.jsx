import '../styles/view.css'
import React from 'react'
import { Box, Grid } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import LeftPaper from './LeftPaper'
import RightPaper from './RightPaper'
import useFetch from '../../../../hooks/useFetch'
import BackdropComponent from '../../../../components/backdrop/BackdropComponent'

const ViewStaff = () => {
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
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default ViewStaff
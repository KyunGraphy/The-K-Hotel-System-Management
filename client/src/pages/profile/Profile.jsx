import './profile.css'
import React, { useContext, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import { Box, Grid } from '@mui/material'
import { AuthContext } from '../../contexts/AuthContext'
import { Toastify } from '../../components/toastify/Toastify'
import LeftPaper from './LeftPaper'
import RightPaper from './RightPaper'
import useFetch from '../../hooks/useFetch'
import BackdropComponent from '../../components/backdrop/BackdropComponent'

const Profile = () => {
  const { user, dispatch } = useContext(AuthContext)
  const { loading, data: hotel } = useFetch(`/hotel/${user.hotelId}`)

  const [errMsg, setErrMsg] = useState(null);

  return (
    <React.Fragment>
      {loading ? (
        <BackdropComponent />
      ) : (
        <React.Fragment>
          {errMsg && <Toastify msg={errMsg} type="error" />}
          <Navbar />
          <Grid
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              background: '#f2dcd0',
              padding: '1em',
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
              <LeftPaper user={user} setErrMsg={setErrMsg} dispatch={dispatch} />
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
              <RightPaper user={user} hotel={hotel} />
            </Box>
          </Grid>
          <Footer />
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default Profile
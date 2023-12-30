import React from 'react'
import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';

import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import minion from '../../assets/minion.png'
import { Link, useLocation } from 'react-router-dom';

const DemoPaper = styled(Paper)(() => ({
  width: 120,
  height: 120,
}));

const StyledButton = styled(Button)(() => ({
  border: '2px solid #50C878',
  backgroundColor: '#50C878',
  color: '#fff',
  borderRadius: 48,
  padding: '12px 24px',
  '&:hover': {
    backgroundColor: 'transparent',
    color: '#50C878',
  }
}))

const BookingSuccess = () => {
  const location = useLocation()
  console.log(location)

  return (
    <Grid>
      <Navbar />
      <Box sx={{ background: '#f2dcd0' }}>
        <Container sx={{ p: 4, display: 'flex', gap: 6, justifyContent: 'center', alignItems: 'center' }}>
          <DemoPaper elevation={18} style={{ width: 420, height: 480, borderRadius: 12, overflow: 'hidden' }}>
            <Box sx={{
              height: '50%',
              background: '#50C878',
              display: 'flex',
              gap: 2,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <ion-icon name="checkmark-circle-outline" style={{ color: 'white', fontSize: 120 }}></ion-icon>
              <Typography variant="h5" gutterBottom sx={{ fontFamily: "'Roboto Mono', monospace", color: 'white' }}>
                🦄Booking Successfully!
              </Typography>
            </Box>
            <Box sx={{ height: '50%', padding: '24px 56px', textAlign: 'justify' }}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontFamily: "'Roboto Mono', monospace", color: 'grey' }}>
                Congratulation! Your reservation has been successfully created.
              </Typography>
              <Box sx={{ margin: '32px 0', textAlign: 'center' }}>
                <Link to='http://localhost:3000/reservation'>
                  <StyledButton variant="contained">
                    View Your Reservations
                  </StyledButton>
                </Link>
              </Box>
            </Box>
          </DemoPaper>
          <Box
            component="img"
            sx={{
              height: 400,
            }}
            alt="The house from the offer."
            src={minion}
          />
        </Container>
      </Box>
      <Footer />
    </Grid>
  )
}

export default BookingSuccess
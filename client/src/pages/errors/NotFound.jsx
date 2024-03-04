import { Box, Button, Grid, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import Footer from '../../components/footer/Footer'
import Navbar from '../../components/navbar/Navbar'
import NotFoundImg from '../../assets/funny-404-error-page-design.gif'

const NotFound = () => {
  const navigate = useNavigate()

  const handleHomeNavigate = () => {
    navigate('/');
  }

  return (
    <Grid sx={{ display: 'flex', flexDirection: 'column', gap: 2, justifyContent: 'space-between', alignItems: 'center', minHeight: '100vh' }}>
      <Navbar />
      <Box
        component="img"
        sx={{
          maxHeight: { xs: 233, md: 320 },
          maxWidth: { xs: 350, md: 720 },
        }}
        alt="The house from the offer."
        src={NotFoundImg}
      />
      <Typography variant="h4" gutterBottom>Page not found !</Typography>
      <Button variant="outlined" onClick={handleHomeNavigate}>Back to Home</Button>
      <Footer />
    </Grid>
  )
}

export default NotFound
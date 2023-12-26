import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Box, Button, Card, CardContent, Container, Divider, Grid, Step, StepLabel, Stepper, Typography } from '@mui/material'
import { List, ListDivider, ListItem, Radio, RadioGroup } from '@mui/joy'

import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import { AuthContext } from '../../contexts/AuthContext'
import useFetch from '../../hooks/useFetch'
import BackdropComponent from '../../components/backdrop/BackdropComponent'
import { roomPrice } from '../../constants/Constant'

const steps = [
  'Enter booking information',
  'Payment methods',
  'Booking successfully',
];

const Payment = () => {
  const location = useLocation()
  const reservation = location.state.reservationData

  const { user } = useContext(AuthContext)
  const { data, loading } = useFetch(`/users/${user._id}`)

  return (
    <Grid>
      <Navbar />
      <Header type="list" />
      {loading ? (
        <BackdropComponent />
      ) : (
        <Box sx={{ paddingY: 4, background: '#f2dcd0' }}>
          <Container>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
              <Box>
                <Box sx={{ p: 1 }}>
                  <Link to='/hotels' style={{ display: 'flex', alignItems: 'center', color: '#000', fontWeight: '600' }}>
                    <ion-icon name="chevron-back-outline"></ion-icon>
                    Back to hotels page
                  </Link>
                </Box>
                <Box sx={{ p: 2 }}>
                  <Box sx={{ width: '100%' }}>
                    <Stepper activeStep={1} alternativeLabel>
                      {steps.map((label) => (
                        <Step key={label}>
                          <StepLabel>{label}</StepLabel>
                        </Step>
                      ))}
                    </Stepper>
                  </Box>
                </Box>
                <Card sx={{ width: '48%', minWidth: 480 }}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography sx={{ fontSize: 20, fontWeight: '600', p: 1 }} color="text.secondary" gutterBottom>
                      How would you like to pay:
                    </Typography>
                    <Typography variant="h5" component="div"></Typography>
                    <RadioGroup
                      aria-labelledby="example-payment-channel-label"
                      overlay
                      name="example-payment-channel"
                      defaultValue="Paypal"
                    >
                      <List
                        component="div"
                        variant="outlined"
                        sx={{
                          borderRadius: 'sm',
                          boxShadow: 'sm',
                          p: 2,
                        }}
                      >
                        {['Cash payment', 'Credit Card', 'Visa Card', 'Paypal'].map((value, index) => (
                          <React.Fragment key={value}>
                            {index !== 0 && <ListDivider />}
                            <ListItem>
                              <Radio id={value} value={value} label={value} />
                            </ListItem>
                          </React.Fragment>
                        ))}
                      </List>
                    </RadioGroup>
                    <Button
                      variant="contained"
                      color='success'
                      sx={{ marginY: 2, width: '100%' }}
                    >Continue to payment</Button>
                    <Link to='/hotels' style={{ color: '#000', fontWeight: '600' }}>
                      Cancel
                    </Link>
                  </CardContent>
                </Card>
              </Box>
              <Box>
                <Card sx={{ width: '48%', minWidth: 480 }}>
                  <CardContent>
                    <Typography sx={{ fontSize: 20, fontWeight: '600', p: 1 }} color="text.secondary" gutterBottom>
                      Order Summary
                    </Typography>
                    <Typography variant="h5" component="div"></Typography>
                    <Divider />
                    <Box sx={{ p: 1 }}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                        sx={{ display: 'flex', gap: 2, p: 0.25 }}
                      >
                        <strong style={{ width: 240 }}>Customer Name: </strong>
                        {data.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                        sx={{ display: 'flex', gap: 2, p: 0.25 }}
                      >
                        <strong style={{ width: 240 }}>Email address: </strong>
                        {data.email}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                        sx={{ display: 'flex', gap: 2, p: 0.25 }}
                      >
                        <strong style={{ width: 240 }}>Phone number: </strong>
                        {data.phone}
                      </Typography>
                    </Box>
                    <Divider />
                    <Box sx={{ p: 1 }}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                        sx={{ display: 'flex', gap: 2, p: 0.25 }}
                      >
                        <strong style={{ width: 240 }}>Hotel department: </strong>
                        {reservation.department}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                        sx={{ display: 'flex', gap: 2, p: 0.25 }}
                      >
                        <strong style={{ width: 240 }}>Adult: </strong>
                        {reservation.adult}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                        sx={{ display: 'flex', gap: 2, p: 0.25 }}
                      >
                        <strong style={{ width: 240 }}>Children: </strong>
                        {reservation.children}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                        sx={{ display: 'flex', gap: 2, p: 0.25 }}
                      >
                        <strong style={{ width: 240 }}>Single room: </strong>
                        {reservation.singleRoom}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                        sx={{ display: 'flex', gap: 2, p: 0.25 }}
                      >
                        <strong style={{ width: 240 }}>Double room: </strong>
                        {reservation.doubleRoom}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                        sx={{ display: 'flex', gap: 2, p: 0.25 }}
                      >
                        <strong style={{ width: 240 }}>Check in date: </strong>
                        {(new Date(reservation.checkInDate)).getDate()}-
                        {(new Date(reservation.checkInDate)).getMonth()}-
                        {(new Date(reservation.checkInDate)).getFullYear()}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                        sx={{ display: 'flex', gap: 2, p: 0.25 }}
                      >
                        <strong style={{ width: 240 }}>Check out date: </strong>
                        {(new Date(reservation.checkOutDate)).getDate()}-
                        {(new Date(reservation.checkOutDate)).getMonth()}-
                        {(new Date(reservation.checkOutDate)).getFullYear()}
                      </Typography>
                    </Box>
                    <Divider />
                    <Box sx={{ p: 1 }}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                        sx={{ display: 'flex', gap: 2, p: 0.25 }}
                      >
                        <strong style={{ width: 240 }}>Expense: </strong>
                        ${
                          reservation.singleRoom * roomPrice.single +
                          reservation.doubleRoom * roomPrice.double
                        }
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                        sx={{ display: 'flex', gap: 2, p: 0.25 }}
                      >
                        <strong style={{ width: 240 }}>Tax: </strong>
                        ${
                          (reservation.singleRoom * roomPrice.single +
                            reservation.doubleRoom * roomPrice.double) * 0.1
                        }
                      </Typography>
                    </Box>
                    <Divider />
                    <Box sx={{ p: 1 }}>
                      <Typography
                        variant="h6"
                        color="text.secondary"
                        gutterBottom
                        sx={{ display: 'flex', gap: 2, p: 0.25 }}
                      >
                        <strong style={{ width: 240 }}>Total fee: </strong>
                        <b>
                          ${
                            (reservation.singleRoom * roomPrice.single +
                              reservation.doubleRoom * roomPrice.double)
                            +
                            (reservation.singleRoom * roomPrice.single +
                              reservation.doubleRoom * roomPrice.double) * 0.1
                          }
                        </b>
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Box>
          </Container>
        </Box>
      )}
      <Footer />
    </Grid>
  )
}

export default Payment
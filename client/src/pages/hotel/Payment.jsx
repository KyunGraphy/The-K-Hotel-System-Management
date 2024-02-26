import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Box, Button, Card, CardContent, Container, Divider, Grid, Step, StepLabel, Stepper, Typography } from '@mui/material'
import { List, ListDivider, ListItem, Radio, RadioGroup } from '@mui/joy'

import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import { AuthContext } from '../../contexts/AuthContext'
import useFetch from '../../hooks/useFetch'
import BackdropComponent from '../../components/backdrop/BackdropComponent'
import { Toastify } from '../../components/toastify/Toastify'
import { Languages } from '../../constants/Languages'

const steps = [
  'Enter booking information',
  'Payment methods',
  'Booking successfully',
];

const Payment = () => {
  const [method, setMethod] = useState('Cash payment')
  const [errMsg, setErrMsg] = useState(false)
  const [handleLoading, setHandleLoading] = useState(false)

  const params = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const reservation = location.state.reservationData

  const { user, lang } = useContext(AuthContext)
  const { data, loading } = useFetch(`/users/${user._id}`)

  const handleChange = (e) => {
    setMethod(e.target.value);
  };

  // Handle make online reservation
  const handleReservation = async () => {
    setHandleLoading(true);
    try {
      const response = await axios.post(`/reservation/${params.id}`, {
        ...reservation,
        userID: data._id,
        email: data.email,
        name: data.name,
        payment: {
          isDone: false,
          method: method,
        },
        isOnline: true,
      })
      setHandleLoading(false);
      navigate('/bookingSuccess', { state: { data: response.data } })
      return
    } catch (err) {
      setErrMsg('Something went wrong!');
      console.log(err);
      setTimeout(function () {
        setErrMsg('')
      }, 10000);
      setHandleLoading(false);
      return
    }
  };

  return (
    <Grid>
      {errMsg && <Toastify msg={errMsg} type="error" />}
      <Navbar />
      <Header type="list" />
      {loading ? (
        <BackdropComponent />
      ) : (
        <Box sx={{ paddingY: 4, background: '#f2dcd0' }}>
          <Container>
            <Box sx={{ paddingY: 2, paddingX: 6 }}>
              <Link to='/hotels' style={{ display: 'flex', alignItems: 'center', color: '#000', fontWeight: '600' }}>
                <ion-icon name="chevron-back-outline"></ion-icon>
                {Languages.other.back[lang]}
              </Link>
            </Box>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
              <Box>
                <Card sx={{ minWidth: 480 }}>
                  <CardContent>
                    <Typography sx={{ fontSize: 20, fontWeight: '600', p: 1 }} color="text.secondary" gutterBottom>
                      {Languages.other.bookingSum[lang]}
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
                        <strong style={{ width: 240 }}>{Languages.reservation.customerName[lang]}: </strong>
                        {data.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                        sx={{ display: 'flex', gap: 2, p: 0.25 }}
                      >
                        <strong style={{ width: 240 }}>{Languages.user.email[lang]}: </strong>
                        {data.email}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                        sx={{ display: 'flex', gap: 2, p: 0.25 }}
                      >
                        <strong style={{ width: 240 }}>{Languages.user.phone[lang]}: </strong>
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
                        <strong style={{ width: 240 }}>{Languages.hotel.department[lang]}: </strong>
                        {reservation.department}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                        sx={{ display: 'flex', gap: 2, p: 0.25 }}
                      >
                        <strong style={{ width: 240 }}>{Languages.reservation.adult[lang]}: </strong>
                        {reservation.adult}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                        sx={{ display: 'flex', gap: 2, p: 0.25 }}
                      >
                        <strong style={{ width: 240 }}>{Languages.reservation.children[lang]}: </strong>
                        {reservation.children}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                        sx={{ display: 'flex', gap: 2, p: 0.25 }}
                      >
                        <strong style={{ width: 240 }}>{Languages.reservation.singleRoom[lang]}: </strong>
                        {reservation.singleRoom}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                        sx={{ display: 'flex', gap: 2, p: 0.25 }}
                      >
                        <strong style={{ width: 240 }}>{Languages.reservation.doubleRoom[lang]}: </strong>
                        {reservation.doubleRoom}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                        sx={{ display: 'flex', gap: 2, p: 0.25 }}
                      >
                        <strong style={{ width: 240 }}>{Languages.reservation.checkInDate[lang]}: </strong>
                        {(new Date(reservation.checkInDate)).getDate()}-
                        {(new Date(reservation.checkInDate)).getMonth() + 1}-
                        {(new Date(reservation.checkInDate)).getFullYear()}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                        sx={{ display: 'flex', gap: 2, p: 0.25 }}
                      >
                        <strong style={{ width: 240 }}>{Languages.reservation.checkOutDate[lang]}: </strong>
                        {(new Date(reservation.checkOutDate)).getDate()}-
                        {(new Date(reservation.checkOutDate)).getMonth() + 1}-
                        {(new Date(reservation.checkOutDate)).getFullYear()}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                        sx={{ display: 'flex', gap: 2, p: 0.25 }}
                      >
                        <strong style={{ width: 240 }}>{Languages.reservation.day[lang]}: </strong>
                        {reservation.night}
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
                        <strong style={{ width: 240 }}>{Languages.other.expense[lang]}: </strong>
                        ${reservation.price}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                        sx={{ display: 'flex', gap: 2, p: 0.25 }}
                      >
                        <strong style={{ width: 240 }}>{Languages.other.tax[lang]}: </strong>
                        ${reservation.price * 0.1}
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
                        <strong style={{ width: 240 }}>{Languages.other.total[lang]}: </strong>
                        <b>
                          ${reservation.price + reservation.price * 0.1}
                        </b>
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
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
                <Card sx={{ width: '48%', minWidth: 480, flex: 1 }}>
                  <CardContent sx={{ height: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography sx={{ fontSize: 20, fontWeight: '600', p: 1 }} color="text.secondary" gutterBottom>
                        {Languages.msg.payMethod[lang]}:
                      </Typography>
                      <Typography variant="h5" component="div"></Typography>
                      <RadioGroup
                        aria-labelledby="example-payment-channel-label"
                        overlay
                        name="example-payment-channel"
                        defaultValue="Payment In Cash"
                        onChange={handleChange}
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
                          <ListItem>
                            <Radio value='Payment In Cash' label='Payment In Cash' />
                          </ListItem>
                          <ListDivider />
                          <ListItem>
                            <Radio value='Credit Card' label='Credit Card' />
                          </ListItem>
                          <ListDivider />
                          <ListItem>
                            <Radio value='Visa Card' label='Visa Card' />
                          </ListItem>
                          <ListDivider />
                          <ListItem>
                            <Radio value='Paypal' label='Paypal' />
                          </ListItem>
                        </List>
                      </RadioGroup>
                    </Box>
                    <Box>
                      <Button
                        variant="contained"
                        color='success'
                        sx={{ marginY: 2, width: '100%' }}
                        onClick={handleReservation}
                        disabled={handleLoading}
                      >{Languages.other.continue[lang]}</Button>
                      <Link to='/hotels' style={{ color: '#000', fontWeight: '600' }}>
                        {Languages.other.cancel[lang]}
                      </Link>
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

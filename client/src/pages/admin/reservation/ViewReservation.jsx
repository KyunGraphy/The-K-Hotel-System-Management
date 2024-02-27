import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { DateRange } from "react-date-range";
import { IoPeopleOutline, IoPersonOutline } from "react-icons/io5";
import { MdEmojiPeople } from "react-icons/md";
import { FaBaby } from "react-icons/fa";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { MILLISECONDS_PER_DAY, roomPrice } from '../../../constants/Constant'
import useFetch from '../../../hooks/useFetch';
import AvailableRoom from './AvailableRoom';
import { Box, Button, Grid, Switch, Typography } from '@mui/material';
import ConfirmBox from '../../../components/confirmForm/ConfirmBox';
import { Toastify } from '../../../components/toastify/Toastify';
import ServiceTable from './ServiceTable';

// ----------------------------------------------------------------
const ViewReservation = () => {
  const [successMsg, setSuccessMsg] = useState("");
  const [confirmForm, setConfirmForm] = useState(false);
  const [delReservationId, setDelReservationId] = useState(undefined);
  const [openAvailableRoom, setOpenAvailableRoom] = useState(false)
  const [loading, setLoading] = useState(false);

  const location = useLocation()
  const navigate = useNavigate()
  const { id: reservationId, rooms } = location.state
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const dateRange =
    (date[0].startDate.getTime() === date[0].endDate.getTime()) ?
      0.6 : (date[0].endDate.getTime() - date[0].startDate.getTime()) / MILLISECONDS_PER_DAY;
  const { data, loading: loadingData, reFetch } = useFetch(`/reservation/${reservationId}`)

  useEffect(() => {
    if (data._id) {
      setDate([
        {
          ...date[0],
          startDate: new Date(data?.checkInDate) || new Date(),
          endDate: new Date(data?.checkOutDate) || new Date(),
        }
      ])
    }
  }, [data])

  const handleCheckIn = async (data) => {
    setLoading(true)
    try {
      await axios.put(`/reservation/${data._id}`, { isCheckIn: !data.isCheckIn });
      setLoading(false)
      setLoading(false)
      reFetch()
    } catch (err) {
      console.error(err);
    }
  }

  const handleCheckOut = async (data) => {
    setLoading(true)
    try {
      await axios.put(`/reservation/${data._id}`, { isCheckOut: !data.isCheckOut });
      setLoading(false)
      reFetch()
    } catch (err) {
      console.error(err);
    }
  }

  const handleSetDeleteReservation = (reservationId) => {
    setConfirmForm(true)
    setDelReservationId(reservationId)
  };

  const handleDeleteReservation = async () => {
    setLoading(true)
    try {
      await axios.delete(`/reservation/${delReservationId}`)
      setSuccessMsg('Delete Reservation successfully');
      navigate("/admin/reservation")
      setLoading(false)
    } catch (err) {
      console.log(err);
    }
    setLoading(false)
    setConfirmForm(false);
    setDelReservationId(undefined)
  };

  return (
    <Grid>
      {confirmForm && (
        <ConfirmBox
          msg='Do you want to delete this reservation?'
          type='delete'
          callBack={handleDeleteReservation}
          cancelFunc={() => setConfirmForm(false)}
          loading={loading}
        />
      )}
      {successMsg && <Toastify msg={successMsg} type="success" />}
      <span
        className='backIcon'
        onClick={() => navigate('/admin/reservation')}
      >
        <ion-icon name="chevron-back-outline"></ion-icon>
        Back
      </span>
      <div className='reservation'>
        <h2>Reservation Information</h2>
        <div className='reservationForm'>
          {loadingData ? (
            <React.Fragment>
              <p><Skeleton width={1024} height={240} /></p>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div>
                <div className='roomSchedule'>
                  <DateRange
                    editableDateInputs={false}
                    onChange={() => null}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    showPreview={false}
                    dragSelectionEnabled={false}
                  />
                </div>
                <Box>
                  <ServiceTable reservationId={reservationId} />
                </Box>
              </div>
              <div>
                <div className="inputBox">
                  <input
                    type="text"
                    value={data._id}
                  />
                  <label>Reservation ID</label>
                </div>
                <div className="inputBox">
                  <span className="icon">
                    <ion-icon name="bed-outline"></ion-icon>
                  </span>
                  <input
                    type="text"
                    value={data.data ? data.data[0].department : ''}
                  />
                  <label>Department</label>
                </div>
                <div className="inputBox">
                  <input
                    type="text"
                    value={data.isOnline ? "Online" : "Directly"}
                  />
                  <label>Type of Booking</label>
                </div>
                <div className="inputBox">
                  <span className="icon">
                    <ion-icon name="person-add-outline"></ion-icon>
                  </span>
                  <input
                    type="text"
                    value={data.name}
                  />
                  <label>Name</label>
                </div>
                <div className="inputBox">
                  <span className="icon">
                    <ion-icon name="call"></ion-icon>
                  </span>
                  <input
                    type="text"
                    value={data.data ? data.data[1].phone : ''}
                  />
                  <label>Phone</label>
                </div>
                <div className="inputBox">
                  <span className="icon">
                    <MdEmojiPeople />
                  </span>
                  <input
                    type="number"
                    value={data.adult}
                  />
                  <label>Adult</label>
                </div>
                <div className="inputBox">
                  <span className="icon">
                    <FaBaby />
                  </span>
                  <input
                    type="number"
                    value={data.children}
                  />
                  <label>Children</label>
                </div>
                <div className="inputBox">
                  <span className="icon">
                    <IoPersonOutline />
                  </span>
                  <input
                    type="number"
                    value={data.singleRoom}
                  />
                  <label>Single Room</label>
                </div>
                <div className="inputBox">
                  <span className="icon">
                    <IoPeopleOutline />
                  </span>
                  <input
                    type="number"
                    value={data.doubleRoom}
                  />
                  <label>Double Room</label>
                </div>
                <h2>
                  <b>${dateRange * (
                    data.singleRoom * roomPrice.single +
                    data.doubleRoom * roomPrice.double
                  )}</b> ({Math.floor(dateRange)} days)
                </h2>
                <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                  <Box>
                    <Box sx={{ display: 'flex' }}>
                      <Typography sx={{ width: '80px' }}>Check in:</Typography>
                      <Switch
                        id={data._id}
                        defaultChecked={data.isCheckIn}
                        color="success"
                        onChange={() => handleCheckIn(data)}
                      />
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                      <Typography sx={{ width: '80px' }}>Check out:</Typography>
                      <Switch
                        id={data._id}
                        defaultChecked={data.isCheckOut}
                        color="warning"
                        onClick={() => handleCheckOut(data)}
                        disabled={data.isCheckIn === false}
                      />
                    </Box>
                  </Box>
                  <Button
                    variant='contained'
                    color='error'
                    onClick={() => handleSetDeleteReservation(reservationId)}
                    disabled={rooms.length !== 0 || data.isCheckIn}
                    sx={{ margin: '1em 0', fontSize: 18 }}
                  >
                    <ion-icon name="trash-outline"></ion-icon>
                  </Button>
                </Box>
              </div>
            </React.Fragment>
          )}
        </div>
        <div className='reservationRoom'>
          <Button
            variant='contained'
            color="success"
            sx={{ width: '100%' }}
            onClick={() => setOpenAvailableRoom(!openAvailableRoom)}
          >{openAvailableRoom ? 'Close available rooms' : 'See available room'}</Button>
          {openAvailableRoom && (
            <AvailableRoom
              reserve={data}
              date={date}
              reFetchReservation={reFetch}
            />)}
        </div>
      </div>
    </Grid>
  )
}

export default ViewReservation
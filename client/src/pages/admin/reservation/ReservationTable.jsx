import React, { useContext, useState } from 'react'
import axios from 'axios';
import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, tableCellClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import "./styles/reservation.css";

import useFetch from '../../../hooks/useFetch';
import { RoomContext } from '../../../contexts/RoomContext';
import { useNavigate } from "react-router-dom";
import ConfirmBox from '../../../components/confirmForm/ConfirmBox';
import { Toastify } from '../../../components/toastify/Toastify';
import BackdropComponent from '../../../components/backdrop/BackdropComponent';

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#384e71',
    color: '#fff',
    fontSize: 16,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

// ----------------------------------------------------------------
const ReservationTable = () => {
  const [confirmForm, setConfirmForm] = useState(false);
  const [delReservationId, setDelReservationId] = useState(undefined);
  const [successMsg, setSuccessMsg] = useState("");
  const { hotelId } = useContext(RoomContext)
  const { data, loading: dataLoading, reFetch } = useFetch(`/reservation/hotel/${hotelId}`)
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const handleSetDeleteReservation = (reservationId) => {
    setConfirmForm(true)
    setDelReservationId(reservationId)
  };

  const handleDeleteReservation = async () => {
    setLoading(true)
    try {
      await axios.delete(`/reservation/${delReservationId}`)
      setSuccessMsg('Delete Reservation successfully');
      reFetch()
      setLoading(false)
    } catch (err) {
      console.log(err);
    }
    setLoading(false)
    setConfirmForm(false);
    setDelReservationId(undefined)
  };

  return (
    <Grid className='reservationTable'>
      {confirmForm && (
        <ConfirmBox
          msg='Do you want to delete this reservation'
          type='delete'
          callBack={handleDeleteReservation}
          cancelFunc={() => setConfirmForm(false)}
          loading={loading}
        />
      )}
      {successMsg && <Toastify msg={successMsg} type="success" />}
      {dataLoading && (<BackdropComponent />)}
      <TableContainer component={Paper} sx={{ border: '2px solid #384e71' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Customer Name</StyledTableCell>
              <StyledTableCell align="right">Room type</StyledTableCell>
              <StyledTableCell align="right">Description</StyledTableCell>
              <StyledTableCell align="right">Check In Date</StyledTableCell>
              <StyledTableCell align="right">Check Out Date</StyledTableCell>
              <StyledTableCell align="right">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <StyledTableRow
                key={item._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <StyledTableCell component="th" scope="row">...{(item._id).slice(-8)}</StyledTableCell>
                <StyledTableCell component="th" scope="row">{item.name}</StyledTableCell>
                <StyledTableCell align="right">
                  {item.singleRoom} Single Room <br /> {item.doubleRoom} Double Room
                </StyledTableCell>
                <StyledTableCell align="right">
                  {item.adult} Adult <br /> {item.children} Children
                </StyledTableCell>
                <StyledTableCell align="right">
                  {new Date(item.checkInDate).toDateString()}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {new Date(item.checkOutDate).toDateString()}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <p className='actBtn'>
                    <Button
                      variant='outlined'
                      color='success'
                      onClick={() => navigate('/admin/reservation/detail', { state: { id: item._id } })}
                    >View</Button>
                    <Button
                      variant='outlined'
                      color='error'
                      onClick={() => handleSetDeleteReservation(item._id)}
                      disabled={item.rooms.length !== 0}
                    >Delete</Button>
                  </p>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  )
}

export default ReservationTable

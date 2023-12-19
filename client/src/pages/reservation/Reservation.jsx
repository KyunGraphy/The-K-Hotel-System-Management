import React, { useContext, useState } from 'react'
import { Box, Button, Collapse, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import useFetch from '../../hooks/useFetch';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';
import ConfirmBox from '../../components/confirmForm/ConfirmBox';
import { Toastify } from '../../components/toastify/Toastify';

const columns = [
  { field: 'id', headerName: 'Reservation ID' },
  { field: 'department', headerName: 'Hotel' },
  { field: 'checkInDate', headerName: 'Check In' },
  { field: 'checkOutDate', headerName: 'Check Out' },
  { field: 'rooms', headerName: '#Rooms', type: 'number' },
  { field: 'createdAt', headerName: 'Created At' },
];

function Row(props) {
  const { row, reFetch } = props;

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [delReservationId, setDelReservationId] = useState(undefined);
  const [confirmForm, setConfirmForm] = useState(false);

  const handleSetDeleteReservation = (reservationId) => {
    setConfirmForm(true)
    setDelReservationId(reservationId)
  };

  const handleDeleteReservation = async () => {
    setLoading(true)
    try {
      await axios.delete(`/reservation/${delReservationId}`)
      setSuccessMsg('Delete Reservation successfully');
      setLoading(false)
      reFetch()
    } catch (err) {
      console.err(err)
    }
    setLoading(false)
    setConfirmForm(false);
    setDelReservationId(undefined)
  }

  return (
    <React.Fragment>
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
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>...{(row.id).slice(-8)}</TableCell>
        <TableCell>{row.department}</TableCell>
        <TableCell>{row.checkInDate}</TableCell>
        <TableCell>{row.checkOutDate}</TableCell>
        <TableCell>{row.rooms}</TableCell>
        <TableCell>{row.createdAt}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell />
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Detail
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: 16 }}>Adult</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: 16 }}>Children</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: 16 }}>Single Room</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: 16 }}>Double Room</TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableCell>{row.adult}</TableCell>
                  <TableCell>{row.children}</TableCell>
                  <TableCell>{row.singleRoom}</TableCell>
                  <TableCell>{row.doubleRoom}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="error"
                      disabled={(row.rooms.length !== 0)}
                      onClick={() => handleSetDeleteReservation(row.id)}
                    >Cancel</Button>
                  </TableCell>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const Reservation = () => {
  const { user } = useContext(AuthContext);
  const { data: rows, reFetch } = useFetch(`/reservation/user/${user._id}`)

  return (
    <React.Fragment>
      <Navbar />
      <h2 className='roomNumber'>Your Reservations</h2>
      <Grid sx={{ padding: '2em' }}>
        <TableContainer component={Paper} sx={{ padding: '1em', border: '2px solid #384e71' }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell />
                {columns.map(column => (
                  <TableCell
                    key={column.field}
                    sx={{
                      fontWeight: 'bold',
                      fontSize: 16,
                    }}
                  >{column.headerName}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <Row key={row.name} row={row} reFetch={reFetch} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Footer />
    </React.Fragment>
  )
}

export default Reservation
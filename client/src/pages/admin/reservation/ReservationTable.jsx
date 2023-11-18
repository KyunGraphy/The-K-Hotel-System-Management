import React, { useContext } from 'react'
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, tableCellClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import "./styles/reservation.css";

import useFetch from '../../../hooks/useFetch';
import { RoomContext } from '../../../contexts/RoomContext';
import { useNavigate } from "react-router-dom";
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
  // '&:nth-of-type(odd)': {
  //   backgroundColor: theme.palette.action.hover,
  // },
  '&': {
    cursor: 'pointer',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

// ----------------------------------------------------------------
const ReservationTable = () => {
  const { hotelId } = useContext(RoomContext)
  const { data, loading: dataLoading } = useFetch((hotelId !== null) ? `/reservation/hotel/${hotelId}` : `/reservation/`)

  const navigate = useNavigate()

  return (
    <Grid className='reservationTable'>
      {dataLoading && (<BackdropComponent />)}
      <TableContainer component={Paper} sx={{ border: '2px solid #384e71', maxHeight: '32em' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ position: 'sticky', top: 0, zIndex: 1 }}>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Customer Name</StyledTableCell>
              <StyledTableCell align="right">Room type</StyledTableCell>
              <StyledTableCell align="right">Description</StyledTableCell>
              <StyledTableCell align="right">Check In Date</StyledTableCell>
              <StyledTableCell align="right">Check Out Date</StyledTableCell>
              <StyledTableCell align="right">Is assigned</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody >
            {data.length === 0 && (
              <StyledTableRow>
                <StyledTableCell
                  component="th"
                  align="center"
                  scope="row"
                  colSpan={6}
                >
                  No data available
                </StyledTableCell>
              </StyledTableRow>
            )}
            {data.map((item) => (
              <StyledTableRow
                hover
                onClick={() => navigate('/admin/reservation/detail', { state: { id: item._id, rooms: item.rooms } })}
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
                  {item.rooms.length > 0 ? 'Yes' : 'No'}
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

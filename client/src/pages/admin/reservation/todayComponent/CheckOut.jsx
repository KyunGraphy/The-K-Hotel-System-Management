import React from 'react'
import { useNavigate } from "react-router-dom";
import { Grid, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, tableCellClasses } from '@mui/material';
import { styled } from '@mui/material/styles';

import "../styles/reservation.css";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: '#384e71',
    // color: '#fff',
    fontSize: 14,
    fontWeight: 600,
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
const CheckOut = ({ activity }) => {
  const navigate = useNavigate()

  return (
    <Grid sx={{ flex: 1 }}>
      <TableContainer component={Paper} sx={{ maxHeight: '28em' }}>
        <Table sx={{ minWidth: 640 }} aria-label="simple table">
          <TableHead sx={{ position: 'sticky', top: 0, zIndex: 1, background: 'ghostwhite' }}>
            <TableRow>
              <StyledTableCell>Customer Name</StyledTableCell>
              <StyledTableCell>Reservation ID</StyledTableCell>
              <StyledTableCell align="right">Room Number</StyledTableCell>
              <StyledTableCell align="right">Check In Date</StyledTableCell>
              <StyledTableCell align="right">Check Out</StyledTableCell>
              <StyledTableCell align="right">View</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody >
            {activity?.length === 0 && (
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
            {activity?.map(item => (
              <StyledTableRow
                hover
                // onClick={() => navigate('/admin/reservation/detail', { state: { id: item._id, rooms: item.rooms } })}
                key={item._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <StyledTableCell component="th" scope="row">{item.name}</StyledTableCell>
                <StyledTableCell component="th" scope="row">...{(item._id).slice(-8)}</StyledTableCell>
                <StyledTableCell align="right">{item.room}</StyledTableCell>
                <StyledTableCell align="right">{new Date(item.checkInDate).toDateString()}</StyledTableCell>
                <StyledTableCell align="right">
                  <Switch
                    id={item._id}
                    defaultChecked={item.isCheckOut}
                    color="warning"
                    disabled={true}
                  />
                </StyledTableCell>
                <StyledTableCell
                  sx={{ fontSize: '1.2em', textAlign: 'center' }}
                  onClick={() => navigate('/admin/reservation/detail', { state: { id: item._id, rooms: item.rooms } })}
                >
                  <ion-icon name="pencil"></ion-icon>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  )
}

export default CheckOut

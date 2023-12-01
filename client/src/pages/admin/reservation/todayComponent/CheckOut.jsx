import React, { useContext } from 'react'
import { Grid, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, tableCellClasses } from '@mui/material';
import { styled } from '@mui/material/styles';

import "../styles/reservation.css";
import useFetch from '../../../../hooks/useFetch';
import { RoomContext } from '../../../../contexts/RoomContext';
import { useNavigate } from "react-router-dom";
import BackdropComponent from '../../../../components/backdrop/BackdropComponent';

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
const CheckOut = () => {
  const { hotelId } = useContext(RoomContext)
  const { data, loading: dataLoading } = useFetch((hotelId !== null) ? `/reservation/hotel/${hotelId}` : `/reservation/`)

  const navigate = useNavigate()

  return (
    <Grid sx={{ flex: 1 }}>
      {dataLoading && (<BackdropComponent />)}
      <TableContainer component={Paper} sx={{ maxHeight: '28em' }}>
        <Table sx={{ minWidth: 640 }} aria-label="simple table">
          <TableHead sx={{ position: 'sticky', top: 0, zIndex: 1, background: 'ghostwhite' }}>
            <TableRow>
              <StyledTableCell>Customer Name</StyledTableCell>
              <StyledTableCell>Reservation ID</StyledTableCell>
              <StyledTableCell align="right">Room</StyledTableCell>
              <StyledTableCell align="right">Check In Date</StyledTableCell>
              <StyledTableCell align="right">Check Out</StyledTableCell>
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
            <StyledTableRow
              hover
              // onClick={() => navigate('/admin/reservation/detail', { state: { id: item._id, rooms: item.rooms } })}
              // key={item._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row">Toni Kroos</StyledTableCell>
              <StyledTableCell component="th" scope="row">...{('abcd1234efgh5678').slice(-8)}</StyledTableCell>
              <StyledTableCell align="right">102</StyledTableCell>
              <StyledTableCell align="right">01/12/2023</StyledTableCell>
              <StyledTableCell align="right">
                <Switch defaultChecked />
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  )
}

export default CheckOut

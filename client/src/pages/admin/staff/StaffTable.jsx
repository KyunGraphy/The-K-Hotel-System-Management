import React, { useContext } from 'react'
import "./styles/staff.css";
import { Avatar, Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, tableCellClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import { RoomContext } from '../../../contexts/RoomContext';
import useFetch from '../../../hooks/useFetch';
import BackdropComponent from '../../../components/backdrop/BackdropComponent';
import { stringAvatar } from '../../../hooks/useSetStringToColor';

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

const StaffTable = () => {
  const { hotelId } = useContext(RoomContext)
  const { data, loading: dataLoading } = useFetch(`/hotel/staffs/${hotelId}`)

  return (
    <Grid className='staffTable'>
      {dataLoading && (<BackdropComponent />)}
      <TableContainer component={Paper} sx={{ border: '2px solid #384e71', maxHeight: '32em' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ position: 'sticky', top: 0, zIndex: 1 }}>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Role</StyledTableCell>
              <StyledTableCell align="right">Salary&nbsp;($/month)</StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
              <StyledTableCell align="right">Phone</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <StyledTableRow
                hover
                onClick={() => console.log('onClick')}
                key={item.index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <StyledTableCell component="th" scope="row">
                  {item.adminId}
                </StyledTableCell>
                <StyledTableCell>
                  <Box
                    sx={{
                      display: 'flex',
                      gap: '0.5em',
                      alignItems: 'center',
                    }}
                  >
                    {
                      item.profilePicture?.url ? (
                        <Avatar alt="" src={item.profilePicture.url} />
                      ) : (
                        <Avatar {...stringAvatar(item.name)} />
                      )
                    }
                    {item.name}
                  </Box>
                </StyledTableCell>
                <StyledTableCell align="right">{item.role}</StyledTableCell>
                <StyledTableCell align="right">{item.salary}</StyledTableCell>
                <StyledTableCell align="right">{item.email}</StyledTableCell>
                <StyledTableCell align="right">{item.phone}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  )
}

export default StaffTable
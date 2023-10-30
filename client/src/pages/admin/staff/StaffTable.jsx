import React, { useState } from 'react'
import "./styles/staff.css";
import ConfirmBox from '../../../components/confirmForm/ConfirmBox';
import { Avatar, Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, tableCellClasses } from '@mui/material';
import { styled } from '@mui/material/styles';

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

function createData(id, name, department, role, salary, email, phone) {
  return { id, name, department, role, salary, email, phone };
}

const rows = [
  createData('MN001', 'Robinson', 'The K Dong Khoi', 'Director', '4000', 'user@gmail.com', '09999900'),
  createData('MN001', 'Robinson', 'The K Dong Khoi', 'Director', '4000', 'user@gmail.com', '09999900'),
  createData('MN001', 'Robinson', 'The K Dong Khoi', 'Director', '4000', 'user@gmail.com', '09999900'),
  createData('MN001', 'Robinson', 'The K Dong Khoi', 'Director', '4000', 'user@gmail.com', '09999900'),
  createData('MN001', 'Robinson', 'The K Dong Khoi', 'Director', '4000', 'user@gmail.com', '09999900'),
];

const StaffTable = () => {
  const [confirmForm, setConfirmForm] = useState(false);

  return (
    <Grid className='staffTable'>
      {confirmForm && (
        <ConfirmBox
          msg='Do you want to delete this staff'
          type='delete'
          callBack={null}
          cancelFunc={() => setConfirmForm(false)}
        />
      )}
      <TableContainer component={Paper} sx={{ border: '2px solid #384e71' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Department</StyledTableCell>
              <StyledTableCell align="right">Role</StyledTableCell>
              <StyledTableCell align="right">Salary&nbsp;($)</StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
              <StyledTableCell align="right">Phone</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <StyledTableRow
                hover
                onClick={() => console.log('onClick')}
                key={row.index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <StyledTableCell component="th" scope="row">
                  {row.id}
                </StyledTableCell>
                <StyledTableCell>
                  <Box
                    sx={{
                      display: 'flex',
                      gap: '0.5em',
                      alignItems: 'center',
                    }}
                  >
                    <Avatar
                      alt="Travis Howard"
                      src="https://res.cloudinary.com/dvroxew0r/image/upload/v1696993380/imympejeja4o42ufhdpl.jpg"
                    />
                    {row.name}
                  </Box>
                </StyledTableCell>
                <StyledTableCell align="right">{row.department}</StyledTableCell>
                <StyledTableCell align="right">{row.role}</StyledTableCell>
                <StyledTableCell align="right">{row.salary}</StyledTableCell>
                <StyledTableCell align="right">{row.email}</StyledTableCell>
                <StyledTableCell align="right">{row.phone}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  )
}

export default StaffTable
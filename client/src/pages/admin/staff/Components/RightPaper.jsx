import React from 'react'
import { Box, Typography } from '@mui/material';
import { format } from "timeago.js"
import { DemoPaper } from '../../../../constants/mui-components';

const RightPaper = ({ staff, hotel }) => {
  return (
    <React.Fragment>
      <React.Fragment>
        <DemoPaper elevation={3} variant="elevation" square={false}>
          <h2><strong>Privacy</strong></h2>
          <Box sx={{ textAlign: 'left', padding: '0 4em' }}>
            <Typography sx={{ margin: '1em 0' }}><strong>Email:</strong> {staff.email}</Typography>
            <Typography sx={{ margin: '1em 0' }}><strong>Username:</strong> {staff.username}</Typography>
            <Typography sx={{ margin: '1em 0' }}><strong>Password:</strong> ******</Typography>
            <Typography sx={{ margin: '1em 0' }}><strong>Created At:</strong> {format(staff.createdAt)}</Typography>
          </Box>
        </DemoPaper>
        <DemoPaper elevation={3} variant="elevation" square={false}>
          <h2><strong>Staff</strong></h2>
          <Box sx={{ textAlign: 'left', padding: '0 4em' }}>
            <Typography sx={{ margin: '1em 0' }}><strong>Admin ID: </strong>{staff.adminId}</Typography>
            <Typography sx={{ margin: '1em 0' }}><strong>Role: </strong>{staff.role}</Typography>
            <Typography sx={{ margin: '1em 0' }}><strong>Salary: </strong>{staff.salary}$/month</Typography>
            <Typography sx={{ margin: '1em 0' }}><strong>Department: </strong>
              {hotel.department ? hotel.department : 'Hotel Manager'}
            </Typography>
          </Box>
        </DemoPaper>
      </React.Fragment>
    </React.Fragment>
  )
}

export default RightPaper
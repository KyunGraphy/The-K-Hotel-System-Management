import React from 'react'
import { Box, Typography } from '@mui/material';
import { format } from "timeago.js"
import { DemoPaper } from '../../constants/mui-components';

const RightPaper = ({ user, hotel }) => {
  return (
    <React.Fragment>
      <React.Fragment>
        <DemoPaper elevation={3} variant="elevation" square={false}>
          <h2><strong>Privacy</strong></h2>
          <Box sx={{ textAlign: 'left', padding: '0 4em' }}>
            <Typography sx={{ margin: '1em 0' }}><strong>Email:</strong> {user.email}</Typography>
            <Typography sx={{ margin: '1em 0' }}><strong>Username:</strong> {user.username}</Typography>
            <Typography sx={{ margin: '1em 0' }}><strong>Password:</strong> ******</Typography>
            <Typography sx={{ margin: '1em 0' }}><strong>Created At:</strong> {format(user.createdAt)}</Typography>
          </Box>
        </DemoPaper>
        <DemoPaper elevation={3} variant="elevation" square={false}>
          <h2><strong>Staff</strong></h2>
          <Box sx={{ textAlign: 'left', padding: '0 4em' }}>
            <Typography sx={{ margin: '1em 0' }}><strong>Admin ID: </strong>{user.adminId}</Typography>
            <Typography sx={{ margin: '1em 0' }}><strong>Role: </strong>{user.role}</Typography>
            <Typography sx={{ margin: '1em 0' }}><strong>Salary: </strong>{user.salary}$/month</Typography>
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
import React from 'react'
import { Box, Typography } from '@mui/material';
import { format } from "timeago.js"
import { DemoPaper } from '../../constants/mui-components';

const RightPaper = ({ user }) => {
  return (
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
          <Typography sx={{ margin: '1em 0' }}><strong>Admin ID:</strong> MN001</Typography>
          <Typography sx={{ margin: '1em 0' }}><strong>Role:</strong> Business Staff</Typography>
          <Typography sx={{ margin: '1em 0' }}><strong>Salary:</strong> 2000$/month</Typography>
        </Box>
      </DemoPaper>
    </React.Fragment>
  )
}

export default RightPaper
import './profile.css'
import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import Avatar from '../../assets/ava1.jpg'
import { Box, Grid, Paper, Typography } from '@mui/material'
import { IoPencil } from "react-icons/io5";
import { styled } from '@mui/material/styles';

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: 120,
  height: 120,
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: 'center',
}));

const Profile = () => {
  return (
    <div>
      <Navbar />
      <Grid
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
        <Box
          sx={{
            display: 'flex',
            '& > :not(style)': {
              margin: "1em",
              minWidth: 560,
              minHeight: 480,
            },
          }}
        >
          <DemoPaper elevation={3} variant="elevation" square={false}>
            <h2 className="profileTitle"><strong>General</strong> <IoPencil /></h2>
            <img src={Avatar} alt="avatar" className='profileAvatar' />
            <Box sx={{ textAlign: 'left', padding: '0 4em' }}>
              <Typography sx={{ margin: '1em 0' }}><strong>Name:</strong> Kevin</Typography>
              <Typography sx={{ margin: '1em 0' }}><strong>Phone:</strong> 0987654321</Typography>
              <Typography sx={{ margin: '1em 0' }}><strong>Address:</strong> Paris</Typography>
              <Typography sx={{ margin: '1em 0' }}><strong>Country:</strong> Spain</Typography>
            </Box>
          </DemoPaper>
        </Box>
        <Box
          sx={{
            '& > :not(style)': {
              margin: "1em",
              minWidth: 560,
              minHeight: 169,
            },
          }}
        >
          <DemoPaper elevation={3} variant="elevation" square={false}>
            <h2 className="profileTitle"><strong>Privacy</strong> <IoPencil /></h2>
            <Box sx={{ textAlign: 'left', padding: '0 4em' }}>
              <Typography sx={{ margin: '1em 0' }}><strong>Email:</strong> user1@gmail.com</Typography>
              <Typography sx={{ margin: '1em 0' }}><strong>Username:</strong> user1</Typography>
              <Typography sx={{ margin: '1em 0' }}><strong>Password:</strong> ******</Typography>
            </Box>
          </DemoPaper>
          <DemoPaper elevation={3} variant="elevation" square={false}>
            <h2><strong>Staff</strong></h2>
            <Box sx={{ textAlign: 'left', padding: '0 4em' }}>
              <Typography sx={{ margin: '1em 0' }}><strong>Admin ID:</strong> MN001</Typography>
              <Typography sx={{ margin: '1em 0' }}><strong>Role:</strong> Business Staff</Typography>
              <Typography sx={{ margin: '1em 0' }}><strong>Salary:</strong> 2000$</Typography>
            </Box>
          </DemoPaper>
        </Box>
      </Grid>
      <Footer />
    </div>
  )
}

export default Profile
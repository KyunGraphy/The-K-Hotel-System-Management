import React, { useContext, useState } from 'react'
import { Avatar, Box, Button, Grid, Stack, TextField, Typography } from '@mui/material'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import { AuthContext } from '../../contexts/AuthContext'
import { stringAvatar } from '../../hooks/useSetStringToColor'
import { Toastify } from '../../components/toastify/Toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const textAreaStyle = {
  margin: '1em',
  width: '90%',
  maxWidth: 360,
}

const ChangePassword = () => {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)

  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [form, setForm] = useState({
    username: user.username,
    currentPassword: undefined,
    newPassword: undefined,
    repeatNewPassword: undefined,
  });

  const handleChangeForm = (e) => {
    if (e.target.value === '') {
      setForm(prev => ({ ...prev, [e.target.id]: undefined }))
      return
    }
    setForm(prev => ({ ...prev, [e.target.id]: e.target.value }))
  };

  const handleChangePassword = async () => {
    setLoading(true)
    if (form.newPassword !== form.repeatNewPassword) {
      setErrMsg('Confirm password does not match');
      setLoading(false)
      setTimeout(function () {
        setErrMsg('');
      }, 10000)
      return
    }

    try {
      const { repeatNewPassword, ...other } = form
      await axios.put('/auth/changePassword', other)
      navigate('/')
    } catch (err) {
      setErrMsg(err.response.data.message);
      setTimeout(function () {
        setErrMsg('');
      }, 10000)
      console.error(err.response.data.message)
    }
    setLoading(false)
  };

  return (
    <Grid>
      {errMsg && <Toastify msg={errMsg} type="error" />}
      <Navbar />
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ flex: 1 }}>
          <Stack direction="row" spacing={2} className="profileAvatar">
            <React.Fragment>
              {
                user.profilePicture?.url ? (
                  <Avatar alt="" src={user.profilePicture.url} sx={{ boxShadow: 24 }} />
                ) : (
                  <Avatar {...stringAvatar(user.name)} sx={{ boxShadow: 24 }} />
                )
              }
            </React.Fragment>
          </Stack>
          <Typography variant='h5' sx={{ fontWeight: 600, textAlign: 'center' }}>{user.name}</Typography>
        </Box>
        <Box sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '1em',
        }}>
          <TextField
            id="currentPassword"
            label="Current Password"
            type="password"
            autoComplete="current-password"
            variant="standard"
            sx={textAreaStyle}
            onChange={e => handleChangeForm(e)}
          />
          <TextField
            id="newPassword"
            label="New Password"
            type="password"
            autoComplete="current-password"
            variant="standard"
            sx={textAreaStyle}
            onChange={e => handleChangeForm(e)}
          />
          <TextField
            id="repeatNewPassword"
            label="Repeat Your Password"
            type="password"
            autoComplete="current-password"
            variant="standard"
            sx={textAreaStyle}
            onChange={e => handleChangeForm(e)}
          />
          <Button
            variant="contained"
            sx={textAreaStyle}
            disabled={loading}
            onClick={handleChangePassword}
          >Change Password</Button>
        </Box>
      </Box>
      <Footer />
    </Grid>
  )
}

export default ChangePassword
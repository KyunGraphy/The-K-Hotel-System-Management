import axios from 'axios';
import React, { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Slide, TextField } from '@mui/material'
import { MuiOtpInput } from 'mui-one-time-password-input'

import { Toastify } from '../../components/toastify/Toastify';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Forgot = ({ open, handleClose, newPasswordForm, setNewPasswordForm }) => {
  const [user, setUser] = useState()
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [otp, setOtp] = useState('')
  const [newPw, setNewPw] = useState('')
  const [confirmPw, setConfirmPw] = useState('')

  const [successMsg, setSuccessMsg] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [loading, setLoading] = useState(false)

  const handleChangeOTP = (newValue) => {
    setOtp(newValue)
  }

  const handleVerifyUser = async () => {
    setLoading(true)
    try {
      const res = await axios.post("/auth/verifyUser", {
        email,
        username,
      })
      setUser(res.data.user);
      setOtp('')
      setLoading(false)
      setNewPasswordForm(1)
    } catch (err) {
      setErrMsg(err.response.data.message)
      setTimeout(function () {
        setErrMsg('');
      }, 10000)
      setLoading(false)
    }
  };

  const handleVerifyOTP = async () => {
    setLoading(true)
    try {
      await axios.post("/auth/verifyOTP", {
        OTP: otp,
      })
      setLoading(false)
      setNewPasswordForm(2)
    } catch (err) {
      setErrMsg(err.response.data.message)
      setTimeout(function () {
        setErrMsg('');
      }, 10000)
      setLoading(false)
    }
  }

  const handleNewPw = async () => {
    setLoading(true)
    try {
      await axios.post("/auth/newPassword", {
        user,
        newPw,
        confirmPw,
      })
      handleClose()
      setSuccessMsg('Create new password successfully!');
      setLoading(false)
    } catch (err) {
      setErrMsg(err.response.data.message)
      setTimeout(function () {
        setErrMsg('');
      }, 10000)
      setLoading(false)
    }
  };

  return (
    <Grid>
      {errMsg && <Toastify msg={errMsg} type="error" />}
      {successMsg && <Toastify msg={successMsg} type="success" />}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Forgot Password Form</DialogTitle>

        {/* Input user information */}
        {newPasswordForm === 0 && (
          <React.Fragment>
            <DialogContent>
              <DialogContentText>
                Please enter the information below to search for your account.
              </DialogContentText>
              <TextField
                autoFocus
                required
                margin="dense"
                id="email"
                name="email"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
                autoComplete='off'
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                autoFocus
                required
                margin="dense"
                id="username"
                name="username"
                label="Username"
                type="text"
                fullWidth
                variant="standard"
                autoComplete='off'
                onChange={(e) => setUsername(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} disabled={loading}>Cancel</Button>
              <Button onClick={handleVerifyUser} disabled={loading}>Next</Button>
            </DialogActions>
          </React.Fragment>
        )}

        {/* Input OTP */}
        {newPasswordForm === 1 && (
          <React.Fragment>
            <DialogContent>
              <DialogContentText>
                Please check your email & enter the OTP code.
              </DialogContentText>
              <MuiOtpInput
                value={otp}
                onChange={handleChangeOTP}
                length={6} validateChar={(val) => !isNaN(val)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} disabled={loading}>Cancel</Button>
              <Button onClick={handleVerifyUser} disabled={loading}>Re-send</Button>
              <Button onClick={handleVerifyOTP} disabled={loading}>Next</Button>
            </DialogActions>
          </React.Fragment>
        )}

        {/* Input new password */}
        {newPasswordForm === 2 && (
          <React.Fragment>
            <DialogContent>
              <DialogContentText>
                Please enter your new password.
              </DialogContentText>
              <TextField
                autoFocus
                required
                margin="dense"
                id="password"
                name="password"
                label="Input your new password"
                type="password"
                fullWidth
                variant="standard"
                autoComplete='off'
                onChange={(e) => setNewPw(e.target.value)}
              />
              <TextField
                autoFocus
                required
                margin="dense"
                id="passwordCf"
                name="passwordCf"
                label="Confirm your password"
                type="password"
                fullWidth
                variant="standard"
                autoComplete='off'
                onChange={(e) => setConfirmPw(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} disabled={loading}>Cancel</Button>
              <Button onClick={handleNewPw} disabled={loading}>Next</Button>
            </DialogActions>
          </React.Fragment>
        )}

      </Dialog>
    </Grid>
  )
}

export default Forgot
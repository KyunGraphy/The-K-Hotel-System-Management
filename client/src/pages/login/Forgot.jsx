import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Slide, TextField } from '@mui/material'
import { MuiOtpInput } from 'mui-one-time-password-input'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Forgot = ({ open, handleClose, newPasswordForm, setNewPasswordForm }) => {
  const [otp, setOtp] = React.useState('')

  const handleChange = (newValue) => {
    setOtp(newValue)
  }

  const handleAgree = () => {
    setNewPasswordForm(1)
  };

  return (
    <Grid>
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
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={() => { setNewPasswordForm(1) }}>Next</Button>
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
                onChange={handleChange}
                length={6} validateChar={(val) => !isNaN(val)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Re-send</Button>
              <Button onClick={() => { setNewPasswordForm(2) }}>Next</Button>
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
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleAgree}>Next</Button>
            </DialogActions>
          </React.Fragment>
        )}

      </Dialog>
    </Grid>
  )
}

export default Forgot
import React, { useState } from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Slide, TextField, Typography } from '@mui/material'
import { Remove as RemoveIcon, Add as AddIcon } from '@mui/icons-material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogRequest = ({ open, setOpen }) => {
  const [reqQuantity, setReqQuantity] = useState(1)

  const handleClose = () => {
    setOpen(false);
  };

  const handleDecrease = async () => {
    setReqQuantity(prev => prev - 1)
  };

  const handleIncrease = async () => {
    setReqQuantity(prev => prev + 1)
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
        <DialogTitle sx={{ p: 4, textAlign: 'center' }}>{"Send Request Form"}</DialogTitle>
        <DialogContent sx={{ p: 4 }}>
          <DialogContentText id="alert-dialog-slide-description">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography>{"Quantity:"}</Typography>
              <Box>
                <IconButton
                  aria-label=""
                  disabled={reqQuantity === 1}
                  onClick={handleDecrease}
                >
                  <RemoveIcon />
                </IconButton>
                {reqQuantity}
                <IconButton
                  aria-label=""
                  disabled={false}
                  onClick={handleIncrease}
                >
                  <AddIcon />
                </IconButton>
              </Box>
            </Box>
            <Box>
              <TextField
                id="standard-textarea"
                label="Description"
                placeholder="Placeholder"
                multiline
                variant="standard"
                sx={{ width: '240px' }}
              />
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            color="warning"
            onClick={handleClose}
          >Send Request</Button>
        </DialogActions>
      </Dialog></Grid>
  )
}

export default DialogRequest
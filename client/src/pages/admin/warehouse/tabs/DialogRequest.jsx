import axios from 'axios'
import React, { useState } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Slide,
  TextField,
  Typography
} from '@mui/material'
import { Remove as RemoveIcon, Add as AddIcon } from '@mui/icons-material';

import { Toastify } from '../../../../components/toastify/Toastify'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogRequest = ({ open, setOpen, itemId, isService }) => {
  const [reqQuantity, setReqQuantity] = useState(1)
  const [reqDesc, setReqDesc] = useState('')
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false)

  const handleClose = () => {
    setOpen(false);
  };

  const handleDecrease = () => {
    setReqQuantity(prev => prev - 1)
  };

  const handleIncrease = () => {
    setReqQuantity(prev => prev + 1)
  };

  const handleChangeDesc = (e) => {
    setReqDesc(e.target.value)
  }

  // Send Request
  const handleSendRequest = async () => {
    setLoading(true)
    try {
      if (isService) {
        await axios.put('/service/request', {
          itemId: itemId,
          quantity: reqQuantity,
          description: reqDesc,
        })
      } else {
        await axios.put('/facility/request', {
          itemId: itemId,
          quantity: reqQuantity,
          description: reqDesc,
        })
      }
      setLoading(false)
      setSuccessMsg('Send request successfully!');
      setTimeout(function () {
        setSuccessMsg('');
      }, 10000)
      setOpen(false);
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Grid>
      {successMsg && <Toastify msg={successMsg} type="success" />}
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
                onChange={handleChangeDesc}
              />
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>Cancel</Button>
          <Button
            color="warning"
            onClick={handleSendRequest}
            disabled={loading}
          >Send Request</Button>
        </DialogActions>
      </Dialog></Grid>
  )
}

export default DialogRequest
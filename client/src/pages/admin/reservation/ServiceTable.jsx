import axios from 'axios';
import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton'
import { Remove as RemoveIcon, Add as AddIcon } from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import useFetch from '../../../hooks/useFetch';
import BackdropComponent from '../../../components/backdrop/BackdropComponent';
import { Toastify } from '../../../components/toastify/Toastify';

// Dialog configuration
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TAX_RATE = 0.07;

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function subtotal(items) {
  return items.reduce((sum, i) => sum + priceRow(i.qty, i.price), 0);
}

export default function ServiceTable({ reservationId }) {
  const { loading, data: rows, reFetch } = useFetch(`/reservation/service/${reservationId}`)

  const invoiceSubtotal = subtotal(rows);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  return (
    <Grid>
      {loading && <BackdropComponent />}
      <TableContainer component={Paper}>
        <Table aria-label="spanning table">
          <TableHead>
            <TableRow sx={{ background: '#febb02' }}>
              <TableCell align="center" colSpan={3}>
                Details
              </TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow>
            <TableRow sx={{ background: 'lightgray' }}>
              <TableCell>Service Name</TableCell>
              <TableCell align="center">Qty.</TableCell>
              <TableCell align="right">Unit ($)</TableCell>
              <TableCell align="right">Sum</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <ServiceItem key={row._id} row={row} reFetch={reFetch} reservationId={reservationId} />
            ))}
            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Tax</TableCell>
              <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
              <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
            </TableRow>
            <TableRow sx={{ background: 'lightgray' }}>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}

const ServiceItem = ({ row, reFetch, reservationId }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [quantity, setQuantity] = useState(row.qty)

  const handleIncreaseQty = () => { setQuantity(prev => prev + 1); };
  const handleDecreaseQty = () => { setQuantity(prev => prev - 1); };

  const handleClickOpen = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };

  const handleUpdateService = async () => {
    setLoading(true);
    if (row.qty === quantity) {
      setErrMsg('Nothing change in reservation service amount');
      setLoading(false);
      setTimeout(function () {
        setErrMsg('');
      }, 10000)
      return;
    }
    try {
      await axios.put(`/reservation/service/${reservationId}`, {
        id: row._id,
        qty: quantity
      })
      reFetch()
      handleClose()
      setLoading(false);
      setSuccessMsg('Send request successfully!');
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      {loading && <BackdropComponent />}
      {successMsg && <Toastify msg={successMsg} type="success" />}
      {errMsg && <Toastify msg={errMsg} type="error" />}
      <TableRow key={row.name} hover onClick={handleClickOpen}>
        <TableCell>{row.name}</TableCell>
        <TableCell align="right">
          {row.qty}
        </TableCell>
        <TableCell align="right">{row.price}</TableCell>
        <TableCell align="right">{ccyFormat(priceRow(row.qty, row.price))}</TableCell>
      </TableRow>
      {/* Service modify dialog */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent sx={{ display: 'flex', width: 600 }}>
          <CardMedia
            sx={{ height: 360, flex: 1 }}
            image={row.img.url}
            title={row.name}
          />
          <Box sx={{ flex: 2, padding: '2em 0' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
              <CardContent>
                <Typography gutterBottom variant="h6" sx={{ textAlign: "center" }}>
                  {row.name}
                </Typography>
                <Box sx={{ marginY: '1em' }}>
                  <Typography><strong>Price: </strong>{row.price}$/{row.unit}</Typography>
                  <Typography><strong>Amount in reservation: </strong>{row.qty}</Typography>
                  <Typography><strong>Amount in stock: </strong>{row.amount}</Typography>
                </Box>
              </CardContent>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography>Type number of adding service: </Typography>
              <IconButton
                aria-label=""
                disabled={quantity === 0}
                onClick={handleDecreaseQty}
              >
                <RemoveIcon />
              </IconButton>
              {quantity}
              <IconButton
                aria-label=""
                disabled={quantity - row.qty === row.amount}
                onClick={handleIncreaseQty}
              >
                <AddIcon />
              </IconButton>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button disabled={loading} onClick={handleClose}>Cancel</Button>
          <Button disabled={loading} onClick={handleUpdateService}>Agree</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

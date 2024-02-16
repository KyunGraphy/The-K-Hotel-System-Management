import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton'
import { Remove as RemoveIcon, Add as AddIcon } from '@mui/icons-material';
import { Grid } from '@mui/material';

import useFetch from '../../../hooks/useFetch';
import BackdropComponent from '../../../components/backdrop/BackdropComponent';

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
  const { loading, data: rows } = useFetch(`/reservation/service/${reservationId}`)

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
              <TableCell align="right">Unit</TableCell>
              <TableCell align="right">Sum</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <ServiceItem row={row} />
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

const ServiceItem = ({ row }) => {
  const [quantity, setQuantity] = useState(row.qty)

  const handleDecrease = async () => {
    setQuantity(prev => prev - 1)
  };

  const handleIncrease = async () => {
    setQuantity(prev => prev + 1)
  };
  return (
    <TableRow key={row.name}>
      <TableCell>{row.name}</TableCell>
      <TableCell align="right" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <IconButton
          aria-label=""
          disabled={false}
          onClick={handleIncrease}
        >
          <AddIcon />
        </IconButton>
        {quantity}
        <IconButton
          aria-label=""
          disabled={quantity === 0}
          onClick={handleDecrease}
        >
          <RemoveIcon />
        </IconButton>
      </TableCell>
      <TableCell align="right">{row.price}</TableCell>
      <TableCell align="right">{ccyFormat(priceRow(row.qty, row.price))}</TableCell>
    </TableRow>
  )
}

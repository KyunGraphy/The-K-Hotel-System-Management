import { Box, Button, Grid, Paper, Typography, styled } from '@mui/material'
import React from 'react'
import useFetch from '../../../hooks/useFetch';
import BackdropComponent from '../../../components/backdrop/BackdropComponent';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  height: 280,
  lineHeight: '60px',
  borderRadius: 4,
}));

const Cart = () => {
  const { loading, data: cartList } = useFetch('/request/cart')

  return (
    <Grid sx={{
      width: '360px',
      backgroundColor: '#febb02',
      padding: '10px',
      borderRadius: '10px',
      position: 'sticky',
      top: '90px',
      height: '540px',
    }}>
      {loading && <BackdropComponent />}
      <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', p: 1 }}>Cart</Typography>
      <Grid sx={{ display: 'flex', gap: 2, flexDirection: 'column', height: '75%', overflowY: 'auto' }}>
        {cartList.map(item => (
          <Item elevation='4'>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Box
                component="img"
                sx={{
                  height: 180,
                  width: 90,
                  objectFit: 'cover',
                }}
                alt="The house from the offer."
                src={item.img.url}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" gutterBottom sx={{ fontSize: '1rem', fontWeight: 600, margin: '0.5em' }}>{item.name}</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flex: 1, margin: '0.5em' }}>
                  <Box>
                    <Typography variant="overline" display="block" gutterBottom>Quantity: {item.quantity}</Typography>
                    <Typography variant="overline" display="block" gutterBottom>Price: {item.unitPurchasePrice}/{item.unit}</Typography>
                  </Box>
                  <ion-icon name="remove-circle-outline"
                    style={{
                      margin: '0.5em 1em',
                      fontSize: '24px',
                      color: 'chocolate',
                      cursor: 'pointer',
                    }}></ion-icon>
                </Box>
              </Box>
            </Box>
          </Item>
        ))}
      </Grid>
      <Grid sx={{ m: 1 }}>
        <Typography sx={{ color: '#384e71', fontWeight: '700', textAlign: 'center' }}>Total: <i>300$</i></Typography>
        <Box sx={{ textAlign: 'center' }}>
          <Button variant="contained" color="success">
            Purchase
          </Button>
        </Box>
      </Grid>
    </Grid>
  )
}

export default Cart
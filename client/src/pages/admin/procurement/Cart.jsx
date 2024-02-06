import { Box, Button, Grid, Paper, Typography, styled } from '@mui/material'
import React, { useMemo } from 'react'

import BackdropComponent from '../../../components/backdrop/BackdropComponent';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  height: 280,
  lineHeight: '60px',
  borderRadius: 4,
}));

const Cart = ({ cartLoading, cartList }) => {

  const totalPrice = useMemo(() => {
    const result = cartList.reduce((result, item) => {
      return result + item.unitPurchasePrice * item.quantity
    }, 0)

    return result
  }, [cartList])

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
      {cartLoading && <BackdropComponent />}
      <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', p: 1 }}>Orders List</Typography>
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
              <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <Typography variant="h6" gutterBottom sx={{ fontSize: '1rem', fontWeight: 600, margin: '0.5em' }}>{item.name}</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flex: 1, margin: '0.5em' }}>
                  <Box>
                    <Typography variant="overline" display="block" gutterBottom><strong>Quantity:</strong> {item.quantity}</Typography>
                    <Typography variant="overline" display="block" gutterBottom><strong>Single:</strong> {item.unitPurchasePrice}$/{item.unit || 'item'}</Typography>
                    <Typography variant="overline" display="block" gutterBottom><strong>Type:</strong> {(item.isFromShop ? 'Shop items' : 'Requested')}</Typography>
                    <Typography variant="subtitle1" display="block" gutterBottom><strong style={{ color: '#e76f51' }}>Total:</strong> {(item.unitPurchasePrice * item.quantity).toFixed(2)}$</Typography>
                  </Box>
                  <ion-icon name="remove-circle-outline"
                    style={{
                      margin: '0.5em 0.5em 0.5em 0',
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
        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <Typography sx={{ color: '#384e71', fontWeight: '700', textAlign: 'center', fontSize: 18 }}>Total: <i>{totalPrice}$</i></Typography>
          <Typography sx={{ color: '#384e71', fontWeight: '700', textAlign: 'center', fontSize: 18 }}><i>{cartList.length} items</i></Typography>
        </Box>
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
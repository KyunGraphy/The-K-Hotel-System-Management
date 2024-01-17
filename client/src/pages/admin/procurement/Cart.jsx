import { Box, Button, Grid, Paper, Typography, styled } from '@mui/material'
import React from 'react'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  height: 280,
  lineHeight: '60px',
  borderRadius: 4,
}));

const Cart = () => {
  return (
    <Grid sx={{
      width: '400px',
      backgroundColor: '#febb02',
      padding: '10px',
      borderRadius: '10px',
      position: 'sticky',
      top: '90px',
      height: '540px',
    }}>
      <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', p: 1 }}>Cart</Typography>
      <Grid sx={{ display: 'flex', gap: 2, flexDirection: 'column', height: '75%', overflowY: 'auto' }}>
        <Item elevation='4'>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Box
              component="img"
              sx={{
                height: 120,
                width: 80,
                objectFit: 'cover',
              }}
              alt="The house from the offer."
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
            />
          </Box>
        </Item>
        <Item elevation='4'>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Box
              component="img"
              sx={{
                height: 120,
                width: 80,
                objectFit: 'cover',
              }}
              alt="The house from the offer."
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
            />
          </Box>
        </Item>
        <Item elevation='4'>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Box
              component="img"
              sx={{
                height: 120,
                width: 80,
                objectFit: 'cover',
              }}
              alt="The house from the offer."
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
            />
          </Box>
        </Item>
        <Item elevation='4'>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Box
              component="img"
              sx={{
                height: 120,
                width: 80,
                objectFit: 'cover',
              }}
              alt="The house from the offer."
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
            />
          </Box>
        </Item>
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
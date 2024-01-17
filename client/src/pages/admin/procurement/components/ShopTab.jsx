import React, { useState } from 'react'
import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, IconButton, Typography } from '@mui/material'
import { Remove as RemoveIcon, Add as AddIcon } from '@mui/icons-material';

const ShopCard = () => {
  const [reqQuantity, setReqQuantity] = useState(1)

  const handleDecrease = () => {
    setReqQuantity(prev => prev - 1)
  };

  const handleIncrease = () => {
    setReqQuantity(prev => prev + 1)
  };

  return (
    <Card sx={{ width: '49%', marginY: '1em', display: 'flex', flexDirection: 'column' }} key={null}>
      <CardMedia
        sx={{ height: 280 }}
        image={'https://res.cloudinary.com/dvroxew0r/image/upload/v1703062643/ny3xdetxif7dc0zfhsff.jpg'}
        title={null}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
        <CardContent>
          <Typography gutterBottom variant="h6" sx={{ textAlign: "center" }}>
            Shop Item
          </Typography>
          <Box sx={{ display: 'flex', marginY: '0.5em' }}>
            <Typography sx={{ flex: 1 }}><strong>Price: </strong>5$/bottle</Typography>
          </Box>
          <Box sx={{ marginY: '0.5em' }}>
            <Typography sx={{ flex: 1 }}><strong>Capacity: </strong>123</Typography>
          </Box>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
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
          <Button
            color="success"
            size="small"
            onClick={null}
          >Add to Cart</Button>
        </CardActions>
      </Box>
    </Card>
  )
}

const ShopTab = ({ facilityData }) => {
  return (
    <Grid sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
      {Array(4).fill(null).map(item => (
        <ShopCard />
      ))}
    </Grid>
  )
}

export default ShopTab

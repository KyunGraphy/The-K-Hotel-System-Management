import React, { useState } from 'react'
import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, IconButton, Typography } from '@mui/material'
import { Remove as RemoveIcon, Add as AddIcon } from '@mui/icons-material';

import imgNone from '../../../../assets/Flag_of_None.png'

const ShopCard = ({ item }) => {
  const [reqQuantity, setReqQuantity] = useState(1)

  const handleDecrease = () => {
    setReqQuantity(prev => prev - 1)
  };

  const handleIncrease = () => {
    setReqQuantity(prev => prev + 1)
  };

  return (
    <Card sx={{ width: '320px', marginY: '1em', display: 'flex', flexDirection: 'column' }} key={null}>
      <CardMedia
        sx={{ height: 280 }}
        image={item.img ? item.img.url : imgNone}
        title={null}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
        <CardContent>
          <Typography gutterBottom variant="h6" sx={{ textAlign: "center" }}>
            {item?.name}
          </Typography>
          <Box sx={{ display: 'flex', marginY: '0.5em' }}>
            <Typography sx={{ flex: 1 }}>
              <strong>Price: </strong>
              {item?.unitPurchasePrice}$/{item?.unit || 'item'}
            </Typography>
          </Box>
          <Box sx={{ marginY: '0.5em' }}>
            <Typography sx={{ flex: 1 }}><strong>Capacity: </strong>{item?.capacity}</Typography>
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

const ShopTab = ({ list }) => {
  return (
    <Grid sx={{ display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
      {list.map(item => (
        <ShopCard key={item._id} item={item} />
      ))}
    </Grid>
  )
}

export default ShopTab

import React, { useState } from 'react'
import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, IconButton, Typography } from '@mui/material'
import { Remove as RemoveIcon, Add as AddIcon } from '@mui/icons-material';

const FacilityCard = ({ item }) => {
  const [reqQuantity, setReqQuantity] = useState(1)

  const handleDecrease = async () => {
    setReqQuantity(prev => prev - 1)
  };

  const handleIncrease = async () => {
    setReqQuantity(prev => prev + 1)
  };

  return (
    <Card sx={{ width: '49%', marginY: '1em', display: 'flex', flexDirection: 'column' }} key={item._id}>
      <CardMedia
        sx={{ height: 400 }}
        image={item.img.url}
        title={item.name}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
        <CardContent>
          <Typography gutterBottom variant="h6" sx={{ textAlign: "center" }}>
            {item.name}
          </Typography>
          <Box sx={{ display: 'flex', marginY: '0.5em' }}>
            <Typography sx={{ flex: 1 }}><strong>Using: </strong>{item.using}</Typography>
            <Typography sx={{ flex: 1 }}><strong>In stock: </strong>{item.amount}</Typography>
          </Box>
          <Box sx={{ marginY: '0.5em' }}>
            <Typography sx={{ flex: 1 }}><strong>Capacity: </strong>{item.capacity}</Typography>
          </Box>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
          <Box>
            <Button size="small">Edit</Button>
            <Button color="error" size="small">Remove</Button>
          </Box>
          <Box>
            <Box sx={{ textAlign: 'center' }}>
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
            <Button color="warning" size="small">Send request</Button>
          </Box>
        </CardActions>
      </Box>
    </Card>
  )
}

const FacilityTab = ({ facilityData }) => {
  return (
    <Grid sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
      {facilityData.map(item => (
        <FacilityCard item={item} />
      ))}
    </Grid>
  )
}

export default FacilityTab
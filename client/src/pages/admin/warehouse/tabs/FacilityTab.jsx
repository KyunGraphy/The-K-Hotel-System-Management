import React from 'react'
import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import DialogRequest from './DialogRequest';

const FacilityCard = ({ item }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <Card sx={{ width: '49%', marginY: '1em', display: 'flex', flexDirection: 'column' }} key={item._id}>
      <DialogRequest open={open} setOpen={setOpen} />
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
        <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Button size="small">Edit</Button>
            <Button color="error" size="small">Remove</Button>
          </Box>
          <Box>
            <Button
              color="warning"
              size="small"
              onClick={handleClickOpen}
            >Send request</Button>
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

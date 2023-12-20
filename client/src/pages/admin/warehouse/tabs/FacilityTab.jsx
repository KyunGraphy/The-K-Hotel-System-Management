import React from 'react'
import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'

const FacilityTab = ({ facilityData }) => {
  return (
    <Grid sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
      {facilityData.map(item => (
        <Card sx={{ width: '49%', marginY: '1em', display: 'flex', flexDirection: 'column' }} key={item._id} >
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
              <Box sx={{ display: 'flex' }}>
                <Typography sx={{ flex: 1 }}><strong>Using: </strong>{item.using}</Typography>
                <Typography sx={{ flex: 1 }}><strong>In stock: </strong>{item.amount}</Typography>
              </Box>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box>
                <Button size="small">Edit</Button>
                <Button color="error" size="small">Remove</Button>
              </Box>
              <Box>
                <Button color="warning" size="small">Send request</Button>
              </Box>
            </CardActions>
          </Box>
        </Card>
      ))}
    </Grid>
  )
}

export default FacilityTab
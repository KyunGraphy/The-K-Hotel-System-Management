import React from 'react'
import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'

const ServicesTab = () => {
  return (
    <Grid sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
      <Card sx={{ width: '49%', marginY: '1em' }}>
        <CardMedia
          sx={{ height: 160 }}
          image="https://phattien.com/wp-content/uploads/2023/03/vision-dac-biet-xanh-den-1.jpg"
          title="green iguana"
        />
        <Box>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Honda Vision 2023
            </Typography>
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ flex: 1 }}><strong>Price: </strong>6$/day</Typography>
              <Typography sx={{ flex: 1 }}><strong>Amount: </strong>4</Typography>
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
      <Card sx={{ width: '49%', marginY: '1em' }}>
        <CardMedia
          sx={{ height: 160 }}
          image="https://phattien.com/wp-content/uploads/2023/03/vision-dac-biet-xanh-den-1.jpg"
          title="green iguana"
        />
        <Box>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Honda Vision 2023
            </Typography>
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ flex: 1 }}><strong>Price: </strong>6$/day</Typography>
              <Typography sx={{ flex: 1 }}><strong>Amount: </strong>4</Typography>
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
      <Card sx={{ width: '49%', marginY: '1em' }}>
        <CardMedia
          sx={{ height: 160 }}
          image="https://phattien.com/wp-content/uploads/2023/03/vision-dac-biet-xanh-den-1.jpg"
          title="green iguana"
        />
        <Box>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Honda Vision 2023
            </Typography>
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ flex: 1 }}><strong>Price: </strong>6$/day</Typography>
              <Typography sx={{ flex: 1 }}><strong>Amount: </strong>4</Typography>
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
    </Grid>
  )
}

export default ServicesTab
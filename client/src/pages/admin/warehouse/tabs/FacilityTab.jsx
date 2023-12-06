import React from 'react'
import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'

const FacilityTab = () => {
  return (
    <Grid sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
      <Card sx={{ width: '49%', marginY: '1em' }}>
        <CardMedia
          sx={{ height: 160 }}
          image="https://ae01.alicdn.com/kf/HTB1h1ViOrvpK1RjSZPiq6zmwXXaf/Full-HD-1080P-42-55-65-inch-ultra-slim-android-television-Smart-TV-HD-LED-2GB.jpg"
          title="green iguana"
        />
        <Box>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Television
            </Typography>
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ flex: 1 }}><strong>Using: </strong>5</Typography>
              <Typography sx={{ flex: 1 }}><strong>In stock: </strong>2</Typography>
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
          image="https://ae01.alicdn.com/kf/HTB1h1ViOrvpK1RjSZPiq6zmwXXaf/Full-HD-1080P-42-55-65-inch-ultra-slim-android-television-Smart-TV-HD-LED-2GB.jpg"
          title="green iguana"
        />
        <Box>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Television
            </Typography>
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ flex: 1 }}><strong>Using: </strong>5</Typography>
              <Typography sx={{ flex: 1 }}><strong>In stock: </strong>2</Typography>
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
          image="https://ae01.alicdn.com/kf/HTB1h1ViOrvpK1RjSZPiq6zmwXXaf/Full-HD-1080P-42-55-65-inch-ultra-slim-android-television-Smart-TV-HD-LED-2GB.jpg"
          title="green iguana"
        />
        <Box>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Television
            </Typography>
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ flex: 1 }}><strong>Using: </strong>5</Typography>
              <Typography sx={{ flex: 1 }}><strong>In stock: </strong>2</Typography>
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

export default FacilityTab
import React from 'react'
import { Box, Grid, Typography } from '@mui/material'

const TodayOccupied = ({ setDate, activity }) => {
  return (
    <Grid sx={{ display: 'flex', gap: '0.5em' }}>
      <Box
        sx={{
          flex: 1,
          minWidth: '120px',
          height: 160,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '0.5em 0',
          background: 'forestgreen',
          borderRadius: '0.4em',
        }}
      >
        <Typography sx={{ fontWeight: 500, color: 'white', textAlign: 'center' }}>
          <strong style={{ fontSize: 32 }}>{activity.arrival ? activity.arrival.length : 0}</strong> <br /> ARRIVALS
        </Typography>
      </Box>
      <Box
        sx={{
          flex: 1,
          minWidth: '120px',
          height: 160,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '0.5em 0',
          background: 'orange',
          borderRadius: '0.4em',
        }}
      >
        <Typography sx={{ fontWeight: 500, color: 'white', textAlign: 'center' }}>
          <strong style={{ fontSize: 32 }}>{activity.departure ? activity.departure.length : 0}</strong> <br /> DEPARTURES
        </Typography>
      </Box>
      <Box
        sx={{
          flex: 1,
          minWidth: '120px',
          height: 160,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '0.5em 0',
          background: 'coral',
          borderRadius: '0.4em',
        }}
      >
        <Typography sx={{ fontWeight: 500, color: 'white', textAlign: 'center' }}>
          <strong style={{ fontSize: 32 }}>{activity.stay ? activity.stay.length : 0}</strong> <br /> STAY OVER
        </Typography>
      </Box>
    </Grid>
  )
}

export default TodayOccupied
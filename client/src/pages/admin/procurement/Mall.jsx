import { Grid } from '@mui/material'
import React from 'react'
import MallRequest from './components/MallRequest'
import MallShop from './components/MallShop'

const Mall = () => {
  return (
    <Grid sx={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      marginRight: '1em',
    }}>
      <MallRequest />
      <MallShop />
    </Grid>
  )
}

export default Mall
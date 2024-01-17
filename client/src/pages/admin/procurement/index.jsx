import React from 'react'
import { Box, Grid } from '@mui/material'

import Mall from './Mall'
import Cart from './Cart'

const procurementBox = {
  position: 'relative',
  width: '100%',
  marginBottom: '20px',
  boxSizing: 'border-box',
  backgroundColor: '#fff',
  boxShadow: '5px 5px 18px #888888',
  padding: '1.5em',
}

const ProcurementComponent = () => {
  return (
    <Grid>
      <Grid sx={procurementBox}>
        <h2 style={{ textAlign: 'center', padding: '0.5em 0' }}>PROCUREMENT</h2>
        <Grid>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <Mall />
            <Cart />
          </Box>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ProcurementComponent
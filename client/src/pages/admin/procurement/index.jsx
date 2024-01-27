import React from 'react'
import { Box, Grid } from '@mui/material'

import Cart from './Cart'
import useFetch from '../../../hooks/useFetch.js'
import BackdropComponent from '../../../components/backdrop/BackdropComponent.jsx'
import MallRequest from './components/MallRequest.jsx'
import MallShop from './components/MallShop.jsx'

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
  const { loading: loadingRequest, data: requestList, reFetch } = useFetch('/request')
  const { loading: loadingFacility, data: facilityList } = useFetch('/facility')
  const { loading: loadingService, data: serviceList } = useFetch('/service')

  return (
    <Grid>
      {(loadingRequest || loadingService || loadingFacility) && <BackdropComponent />}
      <Grid sx={procurementBox}>
        <h2 style={{ textAlign: 'center', padding: '0.5em 0' }}>PROCUREMENT</h2>
        <Grid>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <Grid sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              marginRight: '1em',
            }}>
              <MallRequest
                facility={requestList[0]}
                service={requestList[1]}
                reFetch={reFetch}
              />
              <MallShop
                facility={facilityList}
                service={serviceList}
                reFetch={reFetch}
              />
            </Grid>
            <Cart cartList={requestList[2]} />
          </Box>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ProcurementComponent
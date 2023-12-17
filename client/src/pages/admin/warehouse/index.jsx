import React, { useState } from 'react'
import { Backdrop, Box, Grid, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material'
import { PiBeerBottleFill, PiTelevisionSimpleFill } from "react-icons/pi";


import CapacityProgress from './CapacityProgress'
import WarehouseTabs from './WarehouseTabs'
import BackdropComponent from '../../../components/backdrop/BackdropComponent'
import useFetch from '../../../hooks/useFetch';

const warehouseBox = {
  position: 'relative',
  width: '100%',
  marginBottom: '20px',
  boxSizing: 'border-box',
  backgroundColor: '#fff',
  boxShadow: '5px 5px 18px #888888',
  padding: '1.5em',
}

const actions = [
  { icon: <PiTelevisionSimpleFill />, name: 'Facility' },
  { icon: <PiBeerBottleFill />, name: 'Service' },
];

const WarehouseComponent = () => {
  const { data: facilityData, loading: facilityLoading } = useFetch('/facility')
  const { data: serviceData, loading: serviceLoading } = useFetch('/service')

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Grid>
      {(facilityLoading || serviceLoading) && (<BackdropComponent />)}
      <Grid sx={warehouseBox}>
        <h2 style={{ textAlign: 'center', padding: '0.5em 0' }}>WAREHOUSE</h2>
        <Grid>
          <Box sx={{ width: '100%', display: 'flex', gap: '1em', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <WarehouseTabs facilityData={facilityData} serviceData={serviceData} />
            <CapacityProgress data={[...facilityData, ...serviceData]} />
          </Box>
        </Grid>
      </Grid>
      {/* FAB for adding new facility/service */}
      <Box
        sx={{ '& > :not(style)': { m: 1 }, position: 'fixed', right: '6em', bottom: '6em', zIndex: 2 }}
      >
        <Backdrop open={open} />
        <SpeedDial
          ariaLabel="SpeedDial tooltip example"
          sx={{ position: 'absolute', bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              tooltipOpen
              onClick={handleClose}
            />
          ))}
        </SpeedDial>
      </Box>
    </Grid>
  )
}

export default WarehouseComponent
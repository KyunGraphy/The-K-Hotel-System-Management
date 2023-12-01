import React, { useState } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import useFetch from '../../../hooks/useFetch'
import BackdropComponent from '../../../components/backdrop/BackdropComponent'
import CapacityProgress from './CapacityProgress';

const warehouseBox = {
  position: 'relative',
  width: '100%',
  marginBottom: '20px',
  boxSizing: 'border-box',
  backgroundColor: '#fff',
  boxShadow: '5px 5px 18px #888888',
  padding: '1.5em',
}

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const WarehouseMana = () => {
  const [value, setValue] = useState(0);

  const { loading, data } = useFetch("/hotel")

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Grid sx={warehouseBox}>
      <h2 style={{ textAlign: 'center', padding: '0.5em 0' }}>WAREHOUSE</h2>
      {loading ? (
        <BackdropComponent />
      ) : (
        <Grid>
          <Box sx={{ width: '100%', display: 'flex', gap: '1em', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <Box sx={{ width: '69%', flex: 1 }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider', background: 'lavender' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                  <Tab sx={{ flex: 1, fontWeight: '500' }} label="Facilities" {...a11yProps(0)} />
                  <Tab sx={{ flex: 1, fontWeight: '500' }} label="Services" {...a11yProps(1)} />
                  <Tab sx={{ flex: 1, fontWeight: '500' }} label="Others" {...a11yProps(2)} />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                Facility Warehouse Content
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                Service Warehouse Content
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                Other
              </CustomTabPanel>
            </Box>
            <CapacityProgress />
          </Box>
        </Grid>
      )}
    </Grid>
  )
}

export default WarehouseMana
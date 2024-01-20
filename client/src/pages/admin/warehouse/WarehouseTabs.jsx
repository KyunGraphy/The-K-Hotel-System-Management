import React, { useState } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import FacilityTab from './tabs/FacilityTab';
import ServicesTab from './tabs/ServicesTab';

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
        <Box>
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

const WarehouseTabs = ({ facilityData, serviceData }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Grid sx={{ width: '69%', flex: 1 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', background: 'rgb(56, 78, 113, 0.2)' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab sx={{ flex: 1, fontWeight: '500' }} label="Facilities" {...a11yProps(0)} />
          <Tab sx={{ flex: 1, fontWeight: '500' }} label="Services" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <FacilityTab facilityData={facilityData} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ServicesTab serviceData={serviceData} />
      </CustomTabPanel>
    </Grid>
  )
}

export default WarehouseTabs
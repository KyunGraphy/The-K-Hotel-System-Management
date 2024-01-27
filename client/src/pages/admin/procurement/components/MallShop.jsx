import { Box, Grid, Tab, Tabs, Typography } from '@mui/material'
import React, { useState } from 'react'
import ShopTab from './ShopTab';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
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

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const MallShop = ({ facility, service, reFetch }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid sx={{ background: 'rgb(56, 78, 113, 0.2)', borderRadius: 4, overflow: 'hidden', p: 2 }}>
      <Box
        sx={{ flexGrow: 1, display: 'flex', height: 640 }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider', width: '100px' }}
        >
          <Tab label="Facility Shop" {...a11yProps(0)} />
          <Tab label="Service Shop" {...a11yProps(1)} />
        </Tabs>
        <Box sx={{ overflow: 'auto', width: '54vw' }}>
          <TabPanel value={value} index={0}>
            <ShopTab list={facility} reFetch={reFetch} isService={false} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ShopTab list={service} reFetch={reFetch} isService={true} />
          </TabPanel>
        </Box>
      </Box>
    </Grid>
  );
}

export default MallShop
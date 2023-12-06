import * as React from 'react';
import dayjs from 'dayjs';
import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import { styled } from '@mui/material/styles';
import { Box, Grid, Typography, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import CheckIn from './CheckIn';
import CheckOut from './CheckOut';
import StayOvers from './StayOvers';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

export default function BasicAccordion({ setDate, activity }) {
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Grid sx={{ display: 'flex', gap: '0.5em', marginY: 1 }}>
      <Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DateCalendar', 'DateCalendar', 'DateCalendar']}>
            <DateCalendar
              defaultValue={dayjs(new Date())}
              views={['year', 'month', 'day']}
              onChange={(value) => setDate(value.$d)}
            />
          </DemoContainer>
        </LocalizationProvider>
      </Box>
      <Box sx={{ flex: 1 }}>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Arrivals</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: 0 }}>
            <CheckIn activity={activity.arrival} />
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Departures</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: 0 }}>
            <CheckOut activity={activity.departure} />
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography>Stay Overs</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: 0 }}>
            <StayOvers activity={activity.stay} />
          </AccordionDetails>
        </Accordion>
      </Box>
    </Grid>
  );
}

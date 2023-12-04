import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Grid } from '@mui/material';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import CheckIn from './CheckIn';
import CheckOut from './CheckOut';
import StayOvers from './StayOvers';

export default function BasicAccordion({ setDate, activity }) {
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
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Arrivals</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <CheckIn activity={activity.arrival} />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Departures</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <CheckOut activity={activity.departure} />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography>Stay Overs</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <StayOvers activity={activity.stay} />
          </AccordionDetails>
        </Accordion>
      </Box>
    </Grid>
  );
}

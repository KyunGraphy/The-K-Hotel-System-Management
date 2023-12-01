import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Grid } from '@mui/material';
import CheckIn from './CheckIn';
import CheckOut from './CheckOut';
import StayOvers from './StayOvers';

export default function BasicAccordion() {
  return (
    <Grid >
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Arrivals</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CheckIn />
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
          <CheckOut />
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
          <StayOvers />
        </AccordionDetails>
      </Accordion>
    </Grid>
  );
}

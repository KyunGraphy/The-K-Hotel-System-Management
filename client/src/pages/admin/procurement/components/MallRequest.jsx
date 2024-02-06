import { useState } from 'react'
import {
  Accordion as MuiAccordion,
  AccordionSummary as MuiAccordionSummary,
  AccordionDetails as MuiAccordionDetails,
  Grid,
  Typography
} from '@mui/material'
import { styled } from '@mui/material/styles';
import { ArrowForwardIosSharp } from '@mui/icons-material';

import RequestTable from './RequestItemTable';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharp sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: 'rgb(56,78,113, 0.2)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: 0,
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const MallRequest = ({ facility, service, reFetch, cartReFetch }) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Grid sx={{ background: 'rgb(56, 78, 113, 0.2)', borderRadius: 4, overflow: 'hidden' }}>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          aria-controls="panel1d-content"
          id="panel1d-header"
        >
          <Typography>#Facility Requests</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <RequestTable rows={facility} reFetch={reFetch} cartReFetch={cartReFetch} />
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          aria-controls="panel2d-content"
          id="panel2d-header"
        >
          <Typography>#Service Requests</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <RequestTable rows={service} reFetch={reFetch} cartReFetch={cartReFetch} />
        </AccordionDetails>
      </Accordion>
    </Grid>
  )
}

export default MallRequest
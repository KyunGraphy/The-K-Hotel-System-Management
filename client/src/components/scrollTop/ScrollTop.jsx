import React from 'react'
import './scrollTop.css'
import { Box, Fab } from '@mui/material';
import UpIcon from '@mui/icons-material/KeyboardArrowUp';
import { green } from '@mui/material/colors';

const fabStyle = {
  position: 'absolute',
  bottom: 16,
  right: 16,
};

const fabGreenStyle = {
  color: 'common.white',
  bgcolor: green[500],
  '&:hover': {
    bgcolor: green[600],
  },
};

const ScrollTop = () => {
  const handleScrollToTop = () => {
    const element = document.body;
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <Box
      sx={{ '& > :not(style)': { m: 1 }, position: 'fixed', right: '2em', bottom: '6em', zIndex: 1500 }}
      onClick={handleScrollToTop}
    >
      <Fab sx={{ ...fabStyle, ...fabGreenStyle }} aria-label='Expand' color='inherit'>
        <UpIcon />
      </Fab>
    </Box>
  )
}

export default ScrollTop
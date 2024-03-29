import React, { useEffect, useState } from 'react'
import { CircularProgress, Stack } from '@mui/joy'
import { Box, Button, Typography } from '@mui/material'
import { useCountUp } from 'use-count-up';
import { WAREHOUSE_CAPACITY } from '../../../constants/Constant';

const CapacityProgress = ({ data }) => {
  const [totalCapacity, setTotalCapacity] = useState(0)

  useEffect(() => {
    if (data.length > 0) {
      const result = data.reduce((total, item) => {
        return total + item.amount * item.capacity;
      }, 0)

      setTotalCapacity(result)
    }
  }, [data])


  const { value: value2, reset } = useCountUp({
    isCounting: true,
    duration: 1,
    start: 0,
    end: Math.round(totalCapacity / WAREHOUSE_CAPACITY * 100),
  });

  return (
    <React.Fragment>
      <Box
        sx={{
          width: '30%',
          minWidth: '240px',
          height: '360px',
          padding: '0.5em',
          background: 'coral',
          borderRadius: '0.4em',
          position: 'sticky',
          top: '90px',
        }}
      >
        <Typography variant='h6' sx={{ textAlign: 'center', fontWeight: 500, color: 'white' }}>Warehouse Capacity</Typography>
        <Stack
          spacing={2}
          sx={{
            gap: '0.5em',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '1em',
          }}
        >
          <CircularProgress
            sx={{
              "--CircularProgress-size": "169px",
              "--CircularProgress-trackThickness": "12px",
              "--CircularProgress-progressThickness": "12px",
              "--CircularProgress-progressColor": "var(--variant-solidBg, var(--joy-palette-warning-solidBg, var(--joy-palette-warning-500, #384e71)))",
            }}
            color="warning"
            determinate
            value={value2}
          >
            <Typography sx={{ textAlign: 'center', fontWeight: 500, color: 'white' }}>
              <strong style={{ fontSize: 32 }}>{value2}%</strong> <br /> Location Used
            </Typography>
          </CircularProgress>
          <Button
            size="sm"
            variant="contained"
            sx={{
              background: '#e76f51',
              '&:hover': {
                background: 'orange',
              },
            }}
            onClick={reset}
          >
            Reload
          </Button>
          <Typography sx={{ fontSize: 14, textAlign: 'center', color: 'white' }}>
            Warehouse total volume: {WAREHOUSE_CAPACITY} m<sup>3</sup>
          </Typography>
        </Stack>
      </Box>
    </React.Fragment>
  )
}

export default CapacityProgress
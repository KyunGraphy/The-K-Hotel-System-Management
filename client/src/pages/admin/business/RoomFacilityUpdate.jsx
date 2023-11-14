import React from 'react'
import { Box, Grid, IconButton, List, ListItem, ListItemText, ListSubheader } from '@mui/material'
import { Remove as RemoveIcon, Add as AddIcon } from '@mui/icons-material';

const RoomFacilityUpdate = () => {
  return (
    <Grid sx={{ display: 'flex', gap: '1em' }}>
      <Box sx={{ flex: 1, padding: '1em' }}>
        <List
          sx={{
            width: '100%',
            bgcolor: 'background.paper',
            position: 'relative',
            overflow: 'auto',
            maxHeight: 300,
            '& ul': { padding: 0 },
          }}
          subheader={<li />}
        >
          <li>
            <ul>
              <ListSubheader
                sx={{
                  fontWeight: 700,
                  fontSize: '18px',
                  textAlign: 'center'
                }}>Room Facilities List</ListSubheader>
              {[0, 1, 2, 3, 4, 5, 6].map((item, index) => (
                <ListItem
                  key={index}
                  secondaryAction={
                    <Box>
                      <IconButton aria-label="">
                        <RemoveIcon />
                      </IconButton>
                      2
                      <IconButton aria-label="">
                        <AddIcon />
                      </IconButton>
                    </Box>
                  }>
                  <ListItemText primary={`Item ${item}`} />
                </ListItem>
              ))}
            </ul>
          </li>
        </List>
      </Box>
      <Box sx={{ flex: 1, padding: '1em' }}>
        <List
          sx={{
            width: '100%',
            bgcolor: 'background.paper',
            position: 'relative',
            overflow: 'auto',
            maxHeight: 300,
            '& ul': { padding: 0 },
          }}
          subheader={<li />}
        >
          <li>
            <ul>
              <ListSubheader
                sx={{
                  fontWeight: 700,
                  fontSize: '18px',
                  textAlign: 'center'
                }}>Room Services List</ListSubheader>
              {[0, 1, 2, 3, 4, 5, 6].map((item, index) => (
                <ListItem
                  key={index}
                  secondaryAction={
                    <Box>
                      <IconButton aria-label="">
                        <RemoveIcon />
                      </IconButton>
                      2
                      <IconButton aria-label="">
                        <AddIcon />
                      </IconButton>
                    </Box>
                  }>
                  <ListItemText primary={`Item ${item}`} />
                </ListItem>
              ))}
            </ul>
          </li>
        </List>
      </Box>
    </Grid>
  )
}

export default RoomFacilityUpdate
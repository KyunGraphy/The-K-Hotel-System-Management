/* eslint-disable array-callback-return */
import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Box, Grid, IconButton, List, ListItem, ListItemText, ListSubheader } from '@mui/material'
import { Remove as RemoveIcon, Add as AddIcon } from '@mui/icons-material';
import useFetch from '../../../hooks/useFetch';
import { RoomContext } from '../../../contexts/RoomContext'
import BackdropComponent from '../../../components/backdrop/BackdropComponent'

const ListFacilityItem = ({ facilityItem, roomFacility, facilityReFetch }) => {
  const [quantity, setQuantity] = useState(roomFacility ? roomFacility.quantity : 0)
  const { roomId } = useContext(RoomContext)

  const handleDecreaseFacility = async () => {
    setQuantity(prev => prev - 1)
    try {
      await axios.patch(`/room/updateFacility/${roomId}`, {
        "facilityId": facilityItem._id,
        "quantity": -1,
      })
      facilityReFetch()
    } catch (err) {
      console.error(err)
    }
  };

  const handleIncreaseFacility = async () => {
    setQuantity(prev => prev + 1)
    try {
      await axios.patch(`/room/updateFacility/${roomId}`, {
        "facilityId": facilityItem._id,
        "quantity": 1,
      })
      facilityReFetch()
    } catch (err) {
      console.error(err)
    }
  };

  return (
    <ListItem
      secondaryAction={
        <Box>
          <IconButton
            aria-label=""
            disabled={!roomFacility || quantity === 0}
            onClick={handleDecreaseFacility}
          >
            <RemoveIcon />
          </IconButton>
          {quantity}
          <IconButton
            aria-label=""
            disabled={facilityItem.amount === 0}
            onClick={handleIncreaseFacility}
          >
            <AddIcon />
          </IconButton>
        </Box>
      }>
      <ListItemText primary={facilityItem.name} />
    </ListItem>
  )
};

const RoomFacilityUpdate = ({ roomData }) => {
  const { loading, data: facilityData, reFetch: facilityReFetch } = useFetch(`/facility`)

  return (
    <Grid sx={{ display: 'flex', gap: '1em', flexWrap: 'wrap' }}>
      {loading && <BackdropComponent />}
      <Box sx={{ flex: 1, padding: '1em', minWidth: 360 }}>
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
              {facilityData.map((facilityItem, index) => {
                const roomFacility = roomData.facility.find(item => item.facilityId === facilityItem._id);
                return (
                  <ListFacilityItem
                    key={index}
                    facilityItem={facilityItem}
                    roomFacility={roomFacility}
                    facilityReFetch={facilityReFetch}
                  />
                )
              })}
            </ul>
          </li>
        </List>
      </Box>
      <Box sx={{ flex: 1, padding: '1em', minWidth: 360 }}>
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
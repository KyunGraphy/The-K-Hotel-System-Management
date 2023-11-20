import React, { useState } from 'react'
import { Box, Fab, Grid, Input, NativeSelect, Typography } from '@mui/material'
import { Close, DoneAll, Delete } from '@mui/icons-material';
import RoomFacilityUpdate from './RoomFacilityUpdate';

const ariaLabel = { 'aria-label': 'description' };

const style = {
  fontSize: 18,
  fontWeight: 500,
  minWidth: '270px',
  '& p': {
    margin: '2em 0',
  }
}

const RoomUpdate = ({ data, editedForm, setEditedForm, handleUpdateRoom, roomReFetch, reFetchRoomFacility }) => {
  const [roomForm, setRoomForm] = useState({
    number: undefined,
    type: undefined,
    maxPeople: undefined,
    description: undefined,
  });

  const handleChange = (e) => {
    setRoomForm((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  return (
    <React.Fragment>
      <h2 className='roomNumber'>
        Room {data.number}
      </h2>
      <Grid sx={{ display: 'flex', gap: 3, margin: 4, flexWrap: 'wrap' }}>
        <Box sx={style} style={{ flex: 2 }}>
          <p>Room number:
            <Input
              id='number'
              autoComplete='off'
              placeholder={data.number}
              type='number'
              onChange={e => setRoomForm((prev) => ({
                ...prev,
                [e.target.id]: e.target.value === '' ? undefined : Number(e.target.value)
              }))}
              sx={{
                width: '100%',
              }}
            />
          </p>
          <p>Type:
            <NativeSelect
              id='type'
              defaultValue={data.type}
              inputProps={{
                name: 'type',
                id: 'type',
              }}
              sx={{
                width: '100%',
              }}
              onChange={e => handleChange(e)}
            >
              <option value={'Single'}>Single</option>
              <option value={'Double'}>Double</option>
            </NativeSelect>
          </p>
          <p>Max people:
            <Input
              id='maxPeople'
              autoComplete='off'
              placeholder={data.maxPeople}
              type='number'
              inputProps={ariaLabel}
              min='1'
              onChange={e => setRoomForm((prev) => ({
                ...prev,
                [e.target.id]: e.target.value === '' ? undefined : Number(e.target.value)
              }))}
              sx={{
                width: '100%'
              }}
            />
          </p>
        </Box>
        <Box sx={style} style={{ flex: 2 }}>
          <p>Description:
            <Input
              id='description'
              autoComplete='off'
              placeholder={data.description}
              inputProps={ariaLabel}
              onChange={e => handleChange(e)}
              sx={{
                width: '100%'
              }}
            />
          </p>
          <p>Status:
            <Typography sx={{ fontWeight: 600, marginLeft: '0.5em', color: '#2e8b57' }}>{data.status}</Typography>
          </p>
        </Box>
        <Box sx={style} style={{ flex: 3 }}>
          <RoomFacilityUpdate roomData={data} />
        </Box>
      </Grid>

      {/* ----------------------------------------------------- */}
      <Box
        sx={{ '& > :not(style)': { m: 1 }, position: 'fixed', right: '3em', bottom: '3em', zIndex: 10 }}
      >
        <Fab color="error" aria-label="edit">
          <Delete />
        </Fab>
        <Fab
          color="success"
          aria-label="edit"
          onClick={() => {
            reFetchRoomFacility();
            roomReFetch();
            handleUpdateRoom(roomForm)
          }}
        >
          <DoneAll />
        </Fab>
        <Fab
          color="default"
          aria-label="edit"
          onClick={() => {
            reFetchRoomFacility();
            roomReFetch();
            setEditedForm(!editedForm)
          }}
        >
          <Close />
        </Fab>
      </Box>
    </React.Fragment>
  )
}

export default RoomUpdate
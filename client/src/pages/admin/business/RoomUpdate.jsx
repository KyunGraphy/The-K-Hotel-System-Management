import React, { useState } from 'react'
import { Box, Fab, Input, NativeSelect } from '@mui/material'
import { Close, DoneAll, Delete } from '@mui/icons-material';
import RoomFacilityUpdate from './RoomFacilityUpdate';

const ariaLabel = { 'aria-label': 'description' };

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
      <div className='roomBlock'>
        <div className='roomInfo'>
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
                marginLeft: '1em',
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
                marginLeft: '1em',
                width: '195px',
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
                marginLeft: '1em'
              }}
            />
          </p>
        </div>
        <div className='roomInfo'>
          <p>Description:
            <Input
              id='description'
              autoComplete='off'
              placeholder={data.description}
              inputProps={ariaLabel}
              onChange={e => handleChange(e)}
              sx={{
                marginLeft: '1em'
              }}
            />
          </p>
          <p>Status:
            <span>{data.status}</span>
          </p>
        </div>
      </div>
      <h2 className='roomNumber'>Furnitures</h2>
      <RoomFacilityUpdate roomData={data} />

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
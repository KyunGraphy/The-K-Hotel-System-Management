import React, { useState } from 'react'
import { Box, Fab, Input, NativeSelect } from '@mui/material'
import { Close, DoneAll, Delete } from '@mui/icons-material';
import RoomFacilityUpdate from './RoomFacilityUpdate';

const ariaLabel = { 'aria-label': 'description' };

const RoomUpdate = ({ data, editedForm, setEditedForm, handleUpdateRoom }) => {
  const [roomForm, setRoomForm] = useState({
    number: undefined,
    type: undefined,
    maxPeople: undefined,
    description: undefined,
    price: undefined,
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
              onChange={e => handleChange(e)}
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
              onChange={e => handleChange(e)}
              sx={{
                marginLeft: '1em'
              }}
            />
          </p>
        </div>
        <div className='roomInfo'>
          <p>Price:
            <Input
              id='price'
              autoComplete='off'
              placeholder={data.price}
              type='number'
              inputProps={ariaLabel}
              onChange={e => handleChange(e)}
              sx={{
                marginLeft: '1em'
              }}
            />
          </p>
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
      <RoomFacilityUpdate />

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
          onClick={() => handleUpdateRoom(roomForm)}
        >
          <DoneAll />
        </Fab>
        <Fab
          color="default"
          aria-label="edit"
          onClick={() => setEditedForm(!editedForm)}
        >
          <Close />
        </Fab>
      </Box>
    </React.Fragment>
  )
}

export default RoomUpdate
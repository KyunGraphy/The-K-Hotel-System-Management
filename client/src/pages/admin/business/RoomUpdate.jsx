import { Input, NativeSelect } from '@mui/material'
import React, { useState } from 'react'
import { Toastify } from '../../../components/toastify/Toastify';

const ariaLabel = { 'aria-label': 'description' };

const RoomUpdate = ({ data }) => {
  const [errMsg, setErrMsg] = useState("");
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
      {errMsg && <Toastify msg={errMsg} type="error" />}
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
    </React.Fragment>
  )
}

export default RoomUpdate
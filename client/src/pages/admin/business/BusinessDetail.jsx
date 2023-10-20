import React, { useContext, useState } from 'react'
import { RoomContext } from '../../../contexts/RoomContext'
import useFetch from '../../../hooks/useFetch'
import { IoArrowBackCircle } from 'react-icons/io5'
import ServiceItem from '../../../components/serviceItem/ServiceItem'
import RoomUpdate from './RoomUpdate'
import { Box, Fab } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import Switch from '@mui/material/Switch';
import axios from 'axios'
import { Toastify } from '../../../components/toastify/Toastify'

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const BusinessDetail = () => {
  const [errMsg, setErrMsg] = useState("");
  const [editedForm, setEditedForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const { roomId, dispatch } = useContext(RoomContext)
  const { data, loading: dataLoading, reFetch } = useFetch(`/room/${roomId}`)

  const removeRoom = () => {
    dispatch({ type: "REMOVE_ROOM" })
  };

  const handleToggleStatus = async (checked) => {
    setLoading(true)
    try {
      await axios.patch(`/room/toggleStatus/${roomId}`, { checked })
      reFetch();
    } catch (err) {
      setErrMsg('Something went wrong!');
    }
    setLoading(false)
  }

  return (
    <div className='roomsDetails'>
      {errMsg && <Toastify msg={errMsg} type="error" />}
      {dataLoading ? (
        <React.Fragment>Please wait...</React.Fragment>
      ) : (
        <React.Fragment>
          <div
            className='backIcon'
            onClick={removeRoom}
          >
            <IoArrowBackCircle />
            Back
          </div>
          <h2 className='roomNumber'>
            Room {data.number}
          </h2>
          <div className='roomBlock'>
            {editedForm ? (
              <RoomUpdate data={data} />
            ) : (
              <React.Fragment>
                <div className='roomInfo'>
                  <p>Room number:
                    <span>{data.number}</span>
                  </p>
                  <p>Type:
                    <span>{data.type}</span>
                  </p>
                  <p>Max people:
                    <span>{data.maxPeople}</span>
                  </p>
                </div>
                <div className='roomInfo'>
                  <p>Price:
                    <span>{data.price}$/day</span>
                  </p>
                  <p>Description:
                    <span>{data.description}</span>
                  </p>
                  <p>Status:
                    <span>{data.status}</span>
                  </p>
                  <p>Maintenance Mode:
                    {(data.status === 'Maintenance' || data.status === 'Available') ? (
                      <Switch
                        {...label}
                        defaultChecked={data.status === 'Maintenance'}
                        onChange={(e) => handleToggleStatus(e.target.checked)}
                        disabled={loading}
                      />
                    ) : (
                      <Switch
                        {...label}
                        defaultChecked={data.status === 'Maintenance'}
                        disabled={true}
                      />
                    )}
                  </p>
                </div>
              </React.Fragment>
            )}
          </div>
          {/* ----------------------------------------------------- */}
          <h2 className='roomNumber'>
            Furnitures
          </h2>
          {!editedForm && (
            <div className='roomService'>
              {/* <div className='roomServiceItem'>
              <img
                src='https://ae01.alicdn.com/kf/HTB1h1ViOrvpK1RjSZPiq6zmwXXaf/Full-HD-1080P-42-55-65-inch-ultra-slim-android-television-Smart-TV-HD-LED-2GB.jpg'
                alt=''
              />
              <p>Television: 1</p>
            </div> */}
              <ServiceItem />
              <ServiceItem />
              <ServiceItem />
            </div>
          )}
          {/* ----------------------------------------------------- */}
          <Box
            onClick={() => setEditedForm(!editedForm)}
            sx={{ '& > :not(style)': { m: 1 }, position: 'fixed', right: '3em', bottom: '3em' }}
          >
            <Fab color="primary" aria-label="edit">
              <EditIcon />
            </Fab>
          </Box>
        </React.Fragment>
      )}
    </div>
  )
}

export default BusinessDetail
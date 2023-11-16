import React, { useContext, useState } from 'react'
import { IoArrowBackCircle } from 'react-icons/io5'
import RoomUpdate from './RoomUpdate'
import { Box, Fab } from '@mui/material'
import Switch from '@mui/material/Switch';
import axios from 'axios'
import { Edit } from '@mui/icons-material';

import useFetch from '../../../hooks/useFetch'
import ServiceItem from '../../../components/serviceItem/ServiceItem'
import { RoomContext } from '../../../contexts/RoomContext'
import { Toastify } from '../../../components/toastify/Toastify'
import BackdropComponent from '../../../components/backdrop/BackdropComponent';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const BusinessDetail = () => {
  const [errMsg, setErrMsg] = useState("");
  const [editedForm, setEditedForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const { hotelId, roomId, dispatch } = useContext(RoomContext)
  const { data: roomData, loading: roomLoading, reFetch } = useFetch(`/room/${roomId}`)
  const { data: roomFacility, loading: facilityLoading, reFetch: reFetchRoomFacility } = useFetch(`/facility/room/${roomId}`)

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


  const handleUpdateRoom = async (roomForm) => {
    setLoading(true)
    try {
      await axios.put(`/room/${hotelId}/${roomId}`, roomForm)
      setEditedForm(false);
      reFetch();
    } catch (err) {
      setErrMsg(err.response.data.message);
    }
    setLoading(false)
  }

  return (
    <div className='roomsDetails'>
      {errMsg && <Toastify msg={errMsg} type="error" />}
      {(roomLoading || facilityLoading) ? (
        <BackdropComponent />
      ) : (
        <React.Fragment>
          <div
            className='backIcon'
            onClick={removeRoom}
          >
            <IoArrowBackCircle />
            Back
          </div>
          {editedForm ? (
            <RoomUpdate
              data={roomData}
              editedForm={editedForm}
              setEditedForm={setEditedForm}
              handleUpdateRoom={handleUpdateRoom}
              roomReFetch={reFetch}
              reFetchRoomFacility={reFetchRoomFacility}
            />
          ) : (
            <React.Fragment>
              <h2 className='roomNumber'>
                Room {roomData.number}
              </h2>
              <div className='roomBlock'>
                <div className='roomInfo'>
                  <p>Room number:
                    <span>{roomData.number}</span>
                  </p>
                  <p>Type:
                    <span>{roomData.type}</span>
                  </p>
                  <p>Max people:
                    <span>{roomData.maxPeople}</span>
                  </p>
                </div>
                <div className='roomInfo'>
                  <p>Price:
                    <span>{roomData.price}$/day</span>
                  </p>
                  <p>Description:
                    <span>{roomData.description}</span>
                  </p>
                  <p>Status:
                    <span>{roomData.status}</span>
                  </p>
                  <p>Maintenance Mode:
                    {(roomData.status === 'Maintenance' || roomData.status === 'Available') ? (
                      <Switch
                        {...label}
                        defaultChecked={roomData.status === 'Maintenance'}
                        onChange={(e) => handleToggleStatus(e.target.checked)}
                        disabled={loading}
                      />
                    ) : (
                      <Switch
                        {...label}
                        defaultChecked={roomData.status === 'Maintenance'}
                        disabled={true}
                      />
                    )}
                  </p>
                </div>
              </div>
              {/* ----------------------------------------------------- */}
              <h2 className='roomNumber'>
                Furnitures
              </h2>
              <div className='roomService'>
                {roomFacility.map((item, index) => (
                  <ServiceItem key={index} data={item} />
                ))}
              </div>
              {roomData.status === 'Maintenance' && (
                <Box
                  onClick={() => setEditedForm(!editedForm)}
                  sx={{ '& > :not(style)': { m: 1 }, position: 'fixed', right: '3em', bottom: '3em' }}
                >
                  <Fab color="secondary" aria-label="edit">
                    <Edit />
                  </Fab>
                </Box>
              )}
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </div>
  )
}

export default BusinessDetail
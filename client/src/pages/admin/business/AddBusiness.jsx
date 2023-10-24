import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { IoPersonOutline } from "react-icons/io5";
import { AiOutlineFieldNumber } from "react-icons/ai";
import { MdEmojiPeople } from "react-icons/md";
import { Box, Button, Grid, Modal, Typography } from '@mui/material';
import useFetch from '../../../hooks/useFetch';
import { RoomContext } from '../../../contexts/RoomContext';
import { useNavigate } from 'react-router-dom';
import { Toastify } from '../../../components/toastify/Toastify'
import BackdropComponent from '../../../components/backdrop/BackdropComponent';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: '80vh',
  width: 700,
  bgcolor: 'background.paper',
  background: '#f2dcd0',
  border: '3px solid #384e71',
  borderRadius: '1.5em',
  boxShadow: 24,
  p: 6,
  overflow: 'auto',
};

// ----------------------------------------------------------------
const AddBusiness = ({ addNewRoom, setAddNewRoom }) => {
  const [openHotelOptions, setOpenHotelOptions] = useState(false);
  const [openRoomOptions, setOpenRoomOptions] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState('')
  const [loading, setLoading] = useState(false);

  const [roomForm, setRoomForm] = useState({
    number: undefined,
    type: undefined,
    description: undefined,
    price: undefined,
    maxPeople: 1,
  });

  useEffect(() => {
    function handleCloseDepartmentsOptions(e) {
      (e.target.className !== 'hotelInput') ? setOpenHotelOptions(false) : setOpenHotelOptions(true);
      (e.target.className !== 'roomInput') ? setOpenRoomOptions(false) : setOpenRoomOptions(true);
    }

    window.addEventListener('click', handleCloseDepartmentsOptions);
    return () => {
      window.removeEventListener('click', handleCloseDepartmentsOptions);
    };
  });

  const { hotelId, dispatch } = useContext(RoomContext)
  const navigate = useNavigate()
  const { data, loading: dataLoading } = useFetch("/hotel")
  const department = data.filter(item => item._id === hotelId) || null

  const handleHotel = (hotelId) => {
    dispatch({ type: "SET_HOTEL", payload: hotelId || null })
  }

  const handleChange = (e) => {
    setRoomForm((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleCreateRoom = async () => {
    setLoading(true);
    if (hotelId === null) {
      setErrMsg("Please select hotel");
      setTimeout(function () {
        setErrMsg('');
      }, 10000)
      setLoading(false)
      return;
    } else if (roomForm.number === undefined || roomForm.number === '' ||
      roomForm.type === undefined || roomForm.type === '' ||
      roomForm.price === undefined || roomForm.price === '') {
      setErrMsg("Please input all necessary field!")
      setTimeout(function () {
        setErrMsg('');
      }, 10000)
      setLoading(false)
      return;
    } else if (roomForm.maxPeople < 1) {
      setErrMsg("Max people must have at least one person");
      setTimeout(function () {
        setErrMsg('');
      }, 10000)
      setLoading(false)
      return;
    } else {
      console.log(roomForm)
      try {
        await axios.post(`/room/${hotelId}`, roomForm)
        window.location.reload()
        setSuccessMsg('Create new room successfully!!');
        setAddNewRoom(false)
      } catch (err) {
        if (err.response.data.message === 'You are not authenticated!') {
          navigate("/login", { state: { errMsg: "Login session expired, please login!" } })
        } else {
          console.log(err)
          setErrMsg(err.response.data.message || 'Something went wrong!');
          setTimeout(function () {
            setErrMsg('');
          }, 10000)
        }
      }
    }
    setLoading(false)
  }

  return (
    <Grid>
      {successMsg && <Toastify msg={successMsg} type="success" />}
      {errMsg && <Toastify msg={errMsg} type="error" />}
      {dataLoading ? (
        <BackdropComponent />
      ) : (
        <Modal
          open={addNewRoom}
          onClose={() => setAddNewRoom(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ textAlign: 'center' }}
            >
              New Room Form
            </Typography>
            <div className="inputBox">
              <span className="icon">
                <ion-icon name="bed-outline"></ion-icon>
              </span>
              <input
                type="text"
                value={department[0]?.department || ""}
                className='hotelInput'
                required
              />
              <label>Department</label>
              {openHotelOptions && (
                <div className='countryOptions'>
                  {data.map((item, index) => (
                    <p
                      key={index}
                      onClick={() => handleHotel(item._id)}
                    >
                      {item.department}
                    </p>
                  ))}
                </div>
              )}
            </div>
            <div className="inputBox">
              <span className="icon">
                <AiOutlineFieldNumber />
              </span>
              <input
                type="number"
                id="number"
                onChange={e => handleChange(e)}
                autoComplete='off'
                min="1"
                required
              />
              <label>Number</label>
            </div>
            <div className="inputBox">
              <span className="icon">
                <ion-icon name="keypad-outline"></ion-icon>
              </span>
              <input
                type="text"
                value={roomForm.type || ""}
                className='roomInput'
                required
              />
              <label>Type</label>
              {openRoomOptions && (
                <div className='countryOptions'>
                  <p onClick={() => setRoomForm((prev) => ({ ...prev, type: "Single" }))}>Single Room</p>
                  <p onClick={() => setRoomForm((prev) => ({ ...prev, type: "Double" }))}>Double Room</p>
                </div>
              )}
            </div>
            <div className="inputBox">
              <span className="icon">
                <MdEmojiPeople />
              </span>
              <input
                type="text"
                id="description"
                min="1"
                onChange={e => handleChange(e)}
                autoComplete='off'
                required
              />
              <label>Description</label>
            </div>
            <div className="inputBox">
              <span className="icon">
                <ion-icon name="pricetag-outline"></ion-icon>
              </span>
              <input
                type="number"
                id="price"
                min="0"
                onChange={e => handleChange(e)}
                required
              />
              <label>Price</label>
            </div>
            <div className="inputBox">
              <span className="icon">
                <IoPersonOutline />
              </span>
              <input
                type="number"
                id="maxPeople"
                value={roomForm.maxPeople}
                min="0"
                onChange={e => handleChange(e)}
                required
              />
              <label>Max People</label>
            </div>
            <Button
              variant='contained'
              color='success'
              onClick={handleCreateRoom}
              disabled={loading}
            >CREATE</Button>
          </Box>
        </Modal>
      )}
    </Grid>
  )
}

export default AddBusiness
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AiOutlineDollar } from "react-icons/ai";
import { Box, Button, Grid, Modal, Typography } from '@mui/material';
import useFetch from '../../../../hooks/useFetch';
import { RoomContext } from '../../../../contexts/RoomContext';
import { Toastify } from '../../../../components/toastify/Toastify'
import BackdropComponent from '../../../../components/backdrop/BackdropComponent';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
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
const EditStaff = ({ editStaff, setEditStaff }) => {
  const [openHotelOptions, setOpenHotelOptions] = useState(false);
  const [openRoomOptions, setOpenRoomOptions] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState('')
  const [loading, setLoading] = useState(false);

  const [staffForm, setStaffForm] = useState({
    role: undefined,
    salary: undefined,
    department: undefined,
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
    setStaffForm((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleCreateStaff = async () => {
    // setLoading(true);
    // if (hotelId === null) {
    //   setErrMsg("Please select hotel");
    //   setTimeout(function () {
    //     setErrMsg('');
    //   }, 10000)
    //   setLoading(false)
    //   return;
    // } else if (staffForm.name === undefined || staffForm.name === '' ||
    //   staffForm.role === undefined || staffForm.role === '' ||
    //   staffForm.email === undefined || staffForm.email === '' ||
    //   staffForm.phone === undefined || staffForm.phone === '' ||
    //   staffForm.salary === undefined || staffForm.salary === '') {
    //   setErrMsg("Please input all necessary field!")
    //   setTimeout(function () {
    //     setErrMsg('');
    //   }, 10000)
    //   setLoading(false)
    //   return;
    // } else if (staffForm.salary < 0) {
    //   setErrMsg("Salary must be larger than 0");
    //   setTimeout(function () {
    //     setErrMsg('');
    //   }, 10000)
    //   setLoading(false)
    //   return;
    // } else {
    //   try {
    //     await axios.post(`/auth/newStaff/${hotelId}`, staffForm)
    //     window.location.reload()
    //     setSuccessMsg('Create new staff successfully!!');
    //     setEditStaff(false)
    //   } catch (err) {
    //     if (err.response.data.message === 'You are not authenticated!') {
    //       navigate("/login", { state: { errMsg: "Login session expired, please login!" } })
    //     } else {
    //       console.log(err)
    //       setErrMsg(err.response.data.message || 'Something went wrong!');
    //       setTimeout(function () {
    //         setErrMsg('');
    //       }, 10000)
    //     }
    //   }
    // }
    // setLoading(false)
  }

  return (
    <Grid>
      {successMsg && <Toastify msg={successMsg} type="success" />}
      {errMsg && <Toastify msg={errMsg} type="error" />}
      {dataLoading ? (
        <BackdropComponent />
      ) : (
        <Modal
          open={editStaff}
          onClose={() => setEditStaff(false)}
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
              New Staff Form
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
                <ion-icon name="build-outline"></ion-icon>
              </span>
              <input
                type="text"
                value={staffForm.role || ""}
                className='roomInput'
                required
              />
              <label>Role</label>
              {openRoomOptions && (
                <div className='countryOptions'>
                  <p onClick={() => setStaffForm((prev) => ({ ...prev, role: "Receptionist" }))}>Receptionist</p>
                  <p onClick={() => setStaffForm((prev) => ({ ...prev, role: "Business Staff" }))}>Business Staff</p>
                  <p onClick={() => setStaffForm((prev) => ({ ...prev, role: "Service Staff" }))}>Service Staff</p>
                  <p onClick={() => setStaffForm((prev) => ({ ...prev, role: "Accountant" }))}>Accountant</p>
                  <p onClick={() => setStaffForm((prev) => ({ ...prev, role: "Human Resources Staff" }))}>Human Resources Staff</p>
                  <p onClick={() => setStaffForm((prev) => ({ ...prev, role: "Director" }))}>Director</p>
                </div>
              )}
            </div>
            <div className="inputBox">
              <span className="icon">
                <AiOutlineDollar />
              </span>
              <input
                type="number"
                id="salary"
                min='1'
                onChange={e => handleChange(e)}
                required
              />
              <label>Salary</label>
            </div>
            <Button
              variant='contained'
              color='success'
              onClick={handleCreateStaff}
              disabled={loading}
            >ACCEPT</Button>
          </Box>
        </Modal>
      )}
    </Grid>
  )
}

export default EditStaff
import React, { useContext, useEffect, useState } from 'react'
import { DateRange } from "react-date-range";
import { IoArrowBackCircle, IoPeopleOutline, IoPersonOutline } from "react-icons/io5";
import { FaBaby } from "react-icons/fa";
import { MdEmojiPeople } from "react-icons/md";
import useFetch from '../../../hooks/useFetch';
import { RoomContext } from '../../../contexts/RoomContext';
import axios from 'axios';
import { MILLISECONDS_PER_DAY } from '../../../constants/Constant';
import { useNavigate } from 'react-router-dom';
import useSetDefaultDate from '../../../hooks/useSetDefaultDate';
import { Toastify } from '../../../components/toastify/Toastify';
import BackdropComponent from '../../../components/backdrop/BackdropComponent';

// ----------------------------------------------------------------
const AddReservation = ({ setAddNewReserve }) => {
  const [dateRange, setDateRange] = useState(0.6)
  const [openHotelOptions, setOpenHotelOptions] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [date, setDate] = useState([
    {
      startDate: new Date(useSetDefaultDate(new Date())),
      endDate: new Date(useSetDefaultDate(new Date())),
      key: "selection",
    },
  ]);

  const [reservationForm, setReservationForm] = useState({
    name: undefined,
    adult: 1,
    children: 0,
    singleRoom: 0,
    doubleRoom: 0,
    checkInDate: date[0].startDate.getTime() || undefined,
    checkOutDate: date[0].endDate.getTime() || undefined,
    isOnline: false,
  });

  useEffect(() => {
    function handleCloseDepartmentsOptions(e) {
      (e.target.className !== 'hotelInput') ? setOpenHotelOptions(false) : setOpenHotelOptions(true);
    }

    window.addEventListener('click', handleCloseDepartmentsOptions);
    return () => {
      window.removeEventListener('click', handleCloseDepartmentsOptions);
    };
  });

  useEffect(() => {
    if (date[0].startDate.getTime() === date[0].endDate.getTime()) {
      setDateRange(0.6);
    } else {
      setDateRange((date[0].endDate - date[0].startDate) / MILLISECONDS_PER_DAY);
    }
  }, [date])

  const { hotelId, dispatch } = useContext(RoomContext)
  const navigate = useNavigate()
  const { data, loading } = useFetch("/hotel")
  const department = data.filter(item => item._id === hotelId) || null

  const handleHotel = (hotelId) => {
    dispatch({ type: "SET_HOTEL", payload: hotelId || null })
  }

  const handleDate = (item) => {
    setDate(item)
    setReservationForm(prev => {
      return {
        ...prev,
        checkInDate: item[0].startDate.getTime(),
        checkOutDate: item[0].endDate.getTime(),
      }
    })
  }

  const handleChange = (e) => {
    setReservationForm((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleAddReservation = async () => {
    if (reservationForm.singleRoom === 0 && reservationForm.doubleRoom === 0) {
      setErrMsg("Single room or Double room must be better than 0")
      setTimeout(function () {
        setErrMsg('');
      }, 10000)
      return;
    } else if (hotelId === null) {
      setErrMsg("Please select hotel");
      setTimeout(function () {
        setErrMsg('');
      }, 10000)
      return;
    } else if (reservationForm.name === undefined) {
      setErrMsg("Please input name");
      setTimeout(function () {
        setErrMsg('');
      }, 10000)
      return;
    } else {
      try {
        await axios.post(`/reservation/${hotelId}`, reservationForm)
        setSuccessMsg('Booking successfully!!');
        setTimeout(() => {
          setAddNewReserve(false)
        }, 10000)
      } catch (err) {
        if (err.response.data.message === 'You are not authenticated!') {
          navigate("/login", { state: { errMsg: "Login session expired, please login!" } })
        } else {
          console.log(err)
          setErrMsg('Something went wrong!');
          setTimeout(function () {
            setErrMsg('');
          }, 10000)
        }
      }
    }
  }

  return (
    <React.Fragment>
      <div
        className='backIcon'
        onClick={() => setAddNewReserve(false)}
      >
        <IoArrowBackCircle />
        Back
      </div>
      <div className='reservationForm'>
        {errMsg && <Toastify msg={errMsg} type="error" />}
        {successMsg && <Toastify msg={successMsg} type="success" />}
        {loading ? (
          <BackdropComponent />
        ) : (
          <React.Fragment>
            <div>
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
              <div className='roomSchedule'>
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => handleDate([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={date}
                  minDate={new Date()}
                />
              </div>
              <div
                className='addNewBtn'
                onClick={handleAddReservation}
              >Add New</div>
            </div>
            <div>
              <div className="inputBox">
                <span className="icon">
                  <ion-icon name="person-add-outline"></ion-icon>
                </span>
                <input
                  type="text"
                  id="name"
                  onChange={e => handleChange(e)}
                  autoComplete='off'
                  required
                />
                <label>Name</label>
              </div>
              <div className="inputBox">
                <span className="icon">
                  <MdEmojiPeople />
                </span>
                <input
                  type="number"
                  id="adult"
                  value={reservationForm.adult}
                  min="1"
                  onChange={e => handleChange(e)}
                  required
                />
                <label>Adult</label>
              </div>
              <div className="inputBox">
                <span className="icon">
                  <FaBaby />
                </span>
                <input
                  type="number"
                  id="children"
                  value={reservationForm.children}
                  min="0"
                  onChange={e => handleChange(e)}
                  required
                />
                <label>Children</label>
              </div>
              <div className="inputBox">
                <span className="icon">
                  <IoPersonOutline />
                </span>
                <input
                  type="number"
                  id="singleRoom"
                  value={reservationForm.singleRoom}
                  min="0"
                  onChange={e => handleChange(e)}
                  required
                />
                <label>Single Room</label>
              </div>
              <div className="inputBox">
                <span className="icon">
                  <IoPeopleOutline />
                </span>
                <input
                  type="number"
                  id="doubleRoom"
                  value={reservationForm.doubleRoom}
                  min="0"
                  onChange={e => handleChange(e)}
                  required
                />
                <label>Double Room</label>
              </div>
              <h2>
                <b>${dateRange * (reservationForm.singleRoom * 30 + reservationForm.doubleRoom * 50)}</b> ({Math.floor(dateRange)} nights)
              </h2>
            </div>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  )
}

export default AddReservation
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { DateRange } from "react-date-range";
import { IoArrowBackCircle, IoPeopleOutline, IoPersonOutline } from "react-icons/io5";
import { FaBaby } from "react-icons/fa";
import { MdEmojiPeople } from "react-icons/md";
import useFetch from '../../../hooks/useFetch';
import { RoomContext } from '../../../contexts/RoomContext';
import axios from 'axios';

const AddReservation = ({ setAddNewReserve }) => {
  const [openHotelOptions, setOpenHotelOptions] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [reservationForm, setReservationForm] = useState({
    name: undefined,
    adult: undefined,
    children: undefined,
    singleRoom: undefined,
    doubleRoom: undefined,
    checkInDate: date[0].startDate.getTime() || undefined,
    checkOutDate: date[0].endDate.getTime() || undefined,
    isOnline: false,
  });

  useEffect(() => {
    function handleCloseCountryOptions(e) {
      (e.target.className !== 'hotelInput') ? setOpenHotelOptions(false) : setOpenHotelOptions(true);
    }

    window.addEventListener('click', handleCloseCountryOptions);
    return () => {
      window.removeEventListener('click', handleCloseCountryOptions);
    };
  });

  const { hotelId, dispatch } = useContext(RoomContext)
  const { data, loading } = useFetch("/hotel")
  const department = data.filter(item => item._id === hotelId) || null

  const handleHotel = (hotelId) => {
    dispatch({ type: "SET_HOTEL", payload: hotelId || null })
  }

  const handleDate = (item) => {
    console.log(item)
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
    if (reservationForm.checkInDate === reservationForm.checkOutDate) {
      return setErrMsg("Check in and out date must be different")
    } else {
      setErrMsg(null)
      try {
        await axios.post(`/reservation/${hotelId}`, reservationForm)
        alert("Booking successful")
        setAddNewReserve(false)
      } catch (err) {
        setErrMsg(err.message)
      }
    }
  }

  return (
    <div className='reservationForm'>
      <IoArrowBackCircle
        className='backIcon'
        onClick={() => setAddNewReserve(false)}
      />
      {loading ? (
        <>Please wait...</>
      ) : (
        <>
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
              {openHotelOptions && (<div className='countryOptions'>
                {data.map((item, index) => (
                  <p
                    key={index}
                    onClick={() => handleHotel(item._id)}
                  >
                    {item.department}
                  </p>
                ))}
              </div>)}
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
            {errMsg && <span style={{ color: 'red' }}>{errMsg}</span>}
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
                min="0"
                onChange={e => handleChange(e)}
                required
              />
              <label>Double Room</label>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default AddReservation
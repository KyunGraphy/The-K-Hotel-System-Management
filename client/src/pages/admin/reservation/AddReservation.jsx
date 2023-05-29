import React, { useContext, useEffect, useState } from 'react'
import { DateRange } from "react-date-range";
import { IoArrowBackCircle, IoPeopleOutline, IoPersonOutline } from "react-icons/io5";
import { FaBaby } from "react-icons/fa";
import { MdEmojiPeople } from "react-icons/md";
import useFetch from '../../../hooks/useFetch';
import { RoomContext } from '../../../contexts/RoomContext';
import axios from 'axios';
import Alert from '../../../components/alert/Alert';
import { MILLISECONDS_PER_DAY } from '../../../constants/Constant';

const AddReservation = ({ setAddNewReserve }) => {
  const [dateRange, setDateRange] = useState(0.6)
  const [openHotelOptions, setOpenHotelOptions] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const today = new Date();
  today.setHours(0)
  today.setMinutes(0)
  today.setSeconds(0)

  const [date, setDate] = useState([
    {
      startDate: new Date(Math.floor(today.getTime() / 100000) * 100000),
      endDate: new Date(Math.floor(today.getTime() / 100000) * 100000),
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
        checkInDate: item[0].startDate,
        checkOutDate: item[0].endDate,
      }
    })
  }

  const handleChange = (e) => {
    setReservationForm((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleAddReservation = async () => {
    if (reservationForm.singleRoom === 0 && reservationForm.doubleRoom === 0) {
      setErrMsg("Single room or Double room must be better than 0")
    } else if (hotelId === null) {
      setErrMsg("Please select hotel");
      return;
    } else {
      try {
        await axios.post(`/reservation/${hotelId}`, reservationForm)
        setSuccessMsg('Booking successfully!!');
        setTimeout(() => {
          setAddNewReserve(false)
        }, 3000)
      } catch (err) {
        setErrMsg('Something went wrong!');
      }
    }
  }

  return (
    <div className='reservationForm'>
      <IoArrowBackCircle
        className='backIcon'
        onClick={() => setAddNewReserve(false)}
      />
      <Alert msg={errMsg} type="danger" />
      <Alert msg={successMsg} type="success" />
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
        </>
      )}
    </div>
  )
}

export default AddReservation
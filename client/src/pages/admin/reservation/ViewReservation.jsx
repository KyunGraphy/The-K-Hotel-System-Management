import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

import { DateRange } from "react-date-range";
import { IoArrowBackCircle, IoPeopleOutline, IoPersonOutline } from "react-icons/io5";
import { MdEmojiPeople } from "react-icons/md";
import { FaBaby } from "react-icons/fa";
import useFetch from '../../../hooks/useFetch';

const ViewReservation = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const reservationId = location.pathname.split('/')[3]
  const { data, loading } = useFetch(`/reservation/${reservationId}`)

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  useEffect(() => {
    if (data) {
      setDate([
        {
          ...date,
          startDate: new Date(data.checkInDate),
          endDate: new Date(data.checkOutDate),
        }
      ])
    }
  }, [data])

  return (
    <div className='reservation'>
      <IoArrowBackCircle
        className='backIcon'
        onClick={() => navigate('/admin/reservation')}
      />
      <h2>Reservation Information</h2>
      <div className='reservationForm'>
        {loading ? (
          <>Please wait...</>
        ) : (
          <>
            <div>
              <div className="inputBox">
                <input
                  type="text"
                  defaultValue={data._id}
                />
                <label>Reservation ID</label>
              </div>
              <div className="inputBox">
                <span className="icon">
                  <ion-icon name="bed-outline"></ion-icon>
                </span>
                <input
                  type="text"
                  defaultValue={data.department}
                />
                <label>Department</label>
              </div>
              <div className='roomSchedule'>
                <DateRange
                  editableDateInputs={false}
                  onChange={() => null}
                  moveRangeOnFirstSelection={false}
                  ranges={date}
                  showPreview={false}
                  dragSelectionEnabled={false}
                />
              </div>
            </div>
            <div>
              <div className="inputBox">
                <input
                  type="text"
                  defaultValue={data.isOnline ? "Online" : "Directly"}
                />
                <label>Type of Booking</label>
              </div>
              <div className="inputBox">
                <span className="icon">
                  <ion-icon name="person-add-outline"></ion-icon>
                </span>
                <input
                  type="text"
                  defaultValue={data.name}
                />
                <label>Name</label>
              </div>
              <div className="inputBox">
                <span className="icon">
                  <MdEmojiPeople />
                </span>
                <input
                  type="number"
                  defaultValue={data.adult}
                />
                <label>Adult</label>
              </div>
              <div className="inputBox">
                <span className="icon">
                  <FaBaby />
                </span>
                <input
                  type="number"
                  defaultValue={data.children}
                />
                <label>Children</label>
              </div>
              <div className="inputBox">
                <span className="icon">
                  <IoPersonOutline />
                </span>
                <input
                  type="number"
                  defaultValue={data.singleRoom}
                />
                <label>Single Room</label>
              </div>
              <div className="inputBox">
                <span className="icon">
                  <IoPeopleOutline />
                </span>
                <input
                  type="number"
                  defaultValue={data.doubleRoom}
                />
                <label>Double Room</label>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ViewReservation
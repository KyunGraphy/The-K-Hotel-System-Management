import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { DateRange } from "react-date-range";
import { IoArrowBackCircle, IoPeopleOutline, IoPersonOutline } from "react-icons/io5";
import { MdEmojiPeople } from "react-icons/md";
import { FaBaby } from "react-icons/fa";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { MILLISECONDS_PER_DAY } from '../../../constants/Constant'
import useFetch from '../../../hooks/useFetch';
import AvailableRoom from './AvailableRoom';

// ----------------------------------------------------------------
const ViewReservation = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const reservationId = location.state.id
  const [openAvailableRoom, setOpenAvailableRoom] = useState(false)
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const dateRange = (date[0].endDate.getTime() - date[0].startDate.getTime()) / MILLISECONDS_PER_DAY;
  const { data, loading, reFetch } = useFetch(`/reservation/${reservationId}`)

  useEffect(() => {
    if (data._id) {
      setDate([
        {
          ...date[0],
          startDate: new Date(data?.checkInDate) || new Date(),
          endDate: new Date(data?.checkOutDate) || new Date(),
        }
      ])
    }
  }, [data])

  return (
    <div className='reservation'>
      <div
        className='backIcon'
        onClick={() => navigate('/admin/reservation')}
      >
        <IoArrowBackCircle />
        Back
      </div>
      <h2>Reservation Information</h2>
      <div className='reservationForm'>
        {loading ? (
          <React.Fragment>
            <p><Skeleton width={1024} height={240} /></p>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div>
              <div className="inputBox">
                <input
                  type="text"
                  value={data._id}
                />
                <label>Reservation ID</label>
              </div>
              <div className="inputBox">
                <span className="icon">
                  <ion-icon name="bed-outline"></ion-icon>
                </span>
                <input
                  type="text"
                  value={data.department}
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
                  value={data.isOnline ? "Online" : "Directly"}
                />
                <label>Type of Booking</label>
              </div>
              <div className="inputBox">
                <span className="icon">
                  <ion-icon name="person-add-outline"></ion-icon>
                </span>
                <input
                  type="text"
                  value={data.name}
                />
                <label>Name</label>
              </div>
              <div className="inputBox">
                <span className="icon">
                  <MdEmojiPeople />
                </span>
                <input
                  type="number"
                  value={data.adult}
                />
                <label>Adult</label>
              </div>
              <div className="inputBox">
                <span className="icon">
                  <FaBaby />
                </span>
                <input
                  type="number"
                  value={data.children}
                />
                <label>Children</label>
              </div>
              <div className="inputBox">
                <span className="icon">
                  <IoPersonOutline />
                </span>
                <input
                  type="number"
                  value={data.singleRoom}
                />
                <label>Single Room</label>
              </div>
              <div className="inputBox">
                <span className="icon">
                  <IoPeopleOutline />
                </span>
                <input
                  type="number"
                  value={data.doubleRoom}
                />
                <label>Double Room</label>
              </div>
              <h2>
                <b>${dateRange * (data.singleRoom * 30 + data.doubleRoom * 50)}</b> ({dateRange} days)
              </h2>
            </div>
          </React.Fragment>
        )}
      </div>
      <div className='reservationRoom'>
        <div
          className='viewBtn'
          style={{ width: '100%' }}
          onClick={() => setOpenAvailableRoom(!openAvailableRoom)}
        >{openAvailableRoom ? 'Close available rooms' : 'See available room'}</div>
        {openAvailableRoom && (
          <AvailableRoom
            reserve={data}
            date={date}
            reFetchReservation={reFetch}
          />)}
      </div>
    </div>
  )
}

export default ViewReservation
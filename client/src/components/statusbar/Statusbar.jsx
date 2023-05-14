import React, { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './statusbar.css'
import useFetch from '../../hooks/useFetch';
import { RoomContext } from '../../contexts/RoomContext';

const Statusbar = ({ roomsStatus }) => {
  const location = useLocation();
  const page = location.pathname.split('/')[2];

  const { loading, data } = useFetch("/hotel")

  const [roomSearch, setRoomSearch] = useState("")
  // const [startDate, setStartDate] = useState(new Date());

  const { hotelId, dispatch } = useContext(RoomContext)
  const handleSetHotel = (e) => {
    dispatch({ type: "SET_HOTEL", payload: e.target.value || null })
  };

  const handleSearchRoom = () => {
    dispatch({ type: "SEARCH_ROOM", payload: roomSearch || null })
  }

  return (
    <div className='statusbar'>
      {loading ? (
        <>Please wait...</>
      ) : (<>

        <div className='statusbarLeft'>
          <div className='statusbarSearchRoom'>
            <label>Search room: </label>
            <input
              type='number'
              value={roomSearch}
              onChange={(e) => setRoomSearch(e.target.value)}
              placeholder='Type room number'
              className='statusbarFilter'
            />
            {/* <div className='statusbarCalendar'>
            <div><DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /></div>
            <div><ion-icon name="calendar-outline"></ion-icon></div>
          </div> */}
            <div
              className='statusbarSearchIcon'
              onClick={handleSearchRoom}
            >
              <ion-icon name="search-outline"></ion-icon>
            </div>
          </div>
          <div className='statusbarDepartment'>
            <label htmlFor="floor">Department: </label>
            <select className='statusbarFilter' onChange={handleSetHotel}>
              <option selected value='' disabled>---</option>
              {
                data.map(item => (
                  <option
                    key={item._id}
                    value={item._id}
                    selected={hotelId === item._id}
                  >{item.department}</option>
                ))
              }
            </select>
          </div>
        </div>

        <div className='statusbarRight'>
          {roomsStatus.map(item => (
            <div style={{ '--bg': `${item.bg}` }} key={item.status} className='statusbarRoomStatus'>
              <div style={{ '--bg': `${item.bg}` }} className='statusbarRoomStatusBox'></div>
              <div>{item.status}</div>
            </div>
          ))}
        </div>
      </>)}

      {(page === 'business') && <div className='addNewBtn'>Add New</div>}
    </div>
  )
}

export default Statusbar
import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './statusbar.css'

const Statusbar = ({ floor, onFloorFilter, roomsStatus, onStatusFilter }) => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className='statusbar'>
      <div className='statusbarLeft'>
        <div className='statusbarSearchDate'>
          <label>Date: </label>
          <div className='statusbarCalendar'>
            <div><DatePicker selected={startDate} onChange={(date) => setStartDate(date)} disabled /></div>
            <div><ion-icon name="calendar-outline"></ion-icon></div>
          </div>
          {/* <div className='statusbarSearchIcon'><ion-icon name="search-outline"></ion-icon></div> */}
        </div>
        <div className='statusbarFloor'>
          <div>
            <label htmlFor="floor">Department: </label>
            <select defaultValue={'all'} id="floor">
              <option value="all" disabled>---</option>
              <option value="The K Dong Khoi">The K Dong Khoi</option>
              <option value="The K Van Thanh">The K Van Thanh</option>
              <option value="The K Thu Duc">The K Thu Duc</option>
              <option value="The K Phu My Hung">The K Phu My Hung</option>
              <option value="The K Cong Hoa">The K Cong Hoa</option>
              <option value="The K Quang Trung">The K Quang Trung</option>
              <option value="The K Van Hanh">The K Van Hanh</option>
            </select>
          </div>
          <div>
            <label htmlFor="floor">Floor: </label>
            <select onChange={((e) => onFloorFilter(e))} value={floor} id="floor">
              <option value="0">---</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
            </select>
          </div>
        </div>
      </div>

      <div className='statusbarRight'>
        {roomsStatus.map((countStatus) => (
          <div
            key={countStatus.status}
            style={{ '--bg': `${countStatus.bg}` }}
            className={countStatus.on ? 'statusbarRoomStatus--active' : 'statusbarRoomStatus'}
            onClick={() => onStatusFilter(countStatus.status)}
          >
            {countStatus.status}
            <br />({countStatus.count})
          </div>
        ))}
      </div>
    </div>
  )
}

export default Statusbar
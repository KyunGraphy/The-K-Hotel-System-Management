import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './styles/statusbar.css'

const Statusbar = ({ roomsStatus }) => {
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
        <div className='statusbarDepartment'>
          <label htmlFor="floor">Department: </label>
          <select className='statusbarDepartmentOptions' defaultValue={'all'} id="floor">
            <option value="The K Dong Khoi">The K Dong Khoi</option>
            <option value="The K Van Thanh">The K Van Thanh</option>
            <option value="The K Thu Duc">The K Thu Duc</option>
            <option value="The K Phu My Hung">The K Phu My Hung</option>
            <option value="The K Cong Hoa">The K Cong Hoa</option>
            <option value="The K Quang Trung">The K Quang Trung</option>
            <option value="The K Van Hanh">The K Van Hanh</option>
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
    </div>
  )
}

export default Statusbar
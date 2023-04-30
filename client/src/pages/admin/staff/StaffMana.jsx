import React, { useState } from 'react'
import './styles/staff.css'
import StaffTable from './StaffTable'

const StaffMana = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("The K Dong Khoi");

  const handleChange = (e) => {
    setSelectedDepartment(e.target.value);
  };

  return (
    <div className='staff'>
      <h2>staff</h2>
      <div className='staffTools'>
        <div>
          <label htmlFor="floor">Department: </label>
          <select value={selectedDepartment} onChange={handleChange}>
            <option value="The K Dong Khoi">The K Dong Khoi</option>
            <option value="The K Van Thanh">The K Van Thanh</option>
            <option value="The K Thu Duc">The K Thu Duc</option>
            <option value="The K Phu My Hung">The K Phu My Hung</option>
            <option value="The K Cong Hoa">The K Cong Hoa</option>
            <option value="The K Quang Trung">The K Quang Trung</option>
            <option value="The K Van Hanh">The K Van Hanh</option>
          </select>
        </div>
        <div className='addStaff'>Add new</div>
      </div>
      <div className='staffList'>
        <StaffTable />
      </div>
    </div>
  )
}

export default StaffMana
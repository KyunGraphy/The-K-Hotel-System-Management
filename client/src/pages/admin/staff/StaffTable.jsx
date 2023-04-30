import React from 'react'
import "./styles/staff.css";

const StaffTable = () => {
  return (
    <div className='staffTable'>
      <div className='staffHeader'>
        <input type='checkbox' />
        <p className='staffHeaderID'>ID</p>
        <p className='staffHeaderName'>Employee</p>
        <p className='staffHeaderEmail'>Email</p>
        <p className='staffHeaderPhone'>Phone</p>
        <p>Role</p>
        <p className='staffHeaderSalary'>Salary</p>
        <p>Action</p>
      </div>
      <section>
        <div className='staffData'>
          <input type='checkbox' />
          <p>626c391cb07624ccb8571982</p>
          <p className='staffHeaderName'>Mark John</p>
          <p className='staffHeaderEmail'>john@gmail.com</p>
          <p className='staffHeaderPhone'>0987654321</p>
          <p>Business Staff</p>
          <p className='staffHeaderSalary'>2000$</p>
          <p className='actBtn'>
            <div className='viewBtn'>View</div>
            <div className='delBtn'>Delete</div>
          </p>
        </div>
        <div className='staffData'>
          <input type='checkbox' />
          <p>626c391cb07624ccb8571982</p>
          <p className='staffHeaderName'>Mark John</p>
          <p className='staffHeaderEmail'>john@gmail.com</p>
          <p className='staffHeaderPhone'>0987654321</p>
          <p>Business Staff</p>
          <p className='staffHeaderSalary'>2000$</p>
          <p className='actBtn'>
            <div className='viewBtn'>View</div>
            <div className='delBtn'>Delete</div>
          </p>
        </div>
        <div className='staffData'>
          <input type='checkbox' />
          <p>626c391cb07624ccb8571982</p>
          <p className='staffHeaderName'>Mark John</p>
          <p className='staffHeaderEmail'>john@gmail.com</p>
          <p className='staffHeaderPhone'>0987654321</p>
          <p>Business Staff</p>
          <p className='staffHeaderSalary'>2000$</p>
          <p className='actBtn'>
            <div className='viewBtn'>View</div>
            <div className='delBtn'>Delete</div>
          </p>
        </div>
      </section>
    </div>
  )
}

export default StaffTable
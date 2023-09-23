import React, { useState } from 'react'
import "./styles/staff.css";
import ConfirmBox from '../../../components/confirmForm/ConfirmBox';

const StaffTable = () => {
  const [confirmForm, setConfirmForm] = useState(false);
  console.log(1)

  return (
    <div className='staffTable'>
      {confirmForm && (
        <ConfirmBox
          msg='Do you want to delete this staff'
          type='delete'
          callBack={null}
          cancelFunc={() => setConfirmForm(false)}
        />
      )}
      <div className='staffHeader'>
        {/* <input type='checkbox' /> */}
        <p className='staffHeaderID'>ID</p>
        <p className='staffHeaderName'>Employee</p>
        <p className='staffHeaderEmail'>Email</p>
        <p className='staffHeaderPhone'>Phone</p>
        <p className='staffHeaderRole'>Role</p>
        <p className='staffHeaderSalary'>Salary</p>
        <p>Action</p>
      </div>
      <section>
        <div className='staffData'>
          {/* <input type='checkbox' /> */}
          <span className='staffHeaderID'>MN001</span>
          <p className='staffHeaderName'>Mark John</p>
          <p className='staffHeaderEmail'>john@gmail.com</p>
          <p className='staffHeaderPhone'>0987654321</p>
          <p className='staffHeaderRole'>Business Staff</p>
          <p className='staffHeaderSalary'>2000$</p>
          <p className='actBtn'>
            <div className='viewBtn'>View</div>
            <div className='editBtn'>Edit</div>
            <div className='delBtn' onClick={() => setConfirmForm(true)}>Delete</div>
          </p>
        </div>
        <div className='staffData'>
          {/* <input type='checkbox' /> */}
          <span className='staffHeaderID'>MN001</span>
          <p className='staffHeaderName'>Mark John</p>
          <p className='staffHeaderEmail'>john@gmail.com</p>
          <p className='staffHeaderPhone'>0987654321</p>
          <p className='staffHeaderRole'>Business Staff</p>
          <p className='staffHeaderSalary'>2000$</p>
          <p className='actBtn'>
            <div className='viewBtn'>View</div>
            <div className='editBtn'>Edit</div>
            <div className='delBtn'>Delete</div>
          </p>
        </div>
        <div className='staffData'>
          {/* <input type='checkbox' /> */}
          <span className='staffHeaderID'>MN001</span>
          <p className='staffHeaderName'>Mark John</p>
          <p className='staffHeaderEmail'>john@gmail.com</p>
          <p className='staffHeaderPhone'>0987654321</p>
          <p className='staffHeaderRole'>Business Staff</p>
          <p className='staffHeaderSalary'>2000$</p>
          <p className='actBtn'>
            <div className='viewBtn'>View</div>
            <div className='editBtn'>Edit</div>
            <div className='delBtn'>Delete</div>
          </p>
        </div>
      </section>
    </div>
  )
}

export default StaffTable
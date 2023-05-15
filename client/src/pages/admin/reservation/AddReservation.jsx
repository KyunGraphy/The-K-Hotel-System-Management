import React, { useState } from 'react'

import { DateRange } from "react-date-range";
import { IoArrowBackCircle, IoPeopleOutline, IoPersonOutline } from "react-icons/io5";
import { FaBaby } from "react-icons/fa";
import { MdEmojiPeople } from "react-icons/md";

const AddReservation = ({ setAddNewReserve }) => {
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  // console.log(date[0].startDate.getTime(), date[0].endDate.getTime());

  return (
    <div className='addReservation'>
      <IoArrowBackCircle
        className='backIcon'
        onClick={() => setAddNewReserve(false)}
      />
      <div>
        <div className="inputBox">
          <span className="icon">
            <ion-icon name="bed-outline"></ion-icon>
          </span>
          <input
            type="text"
            id="department"
            onChange={null}
            required
          />
          <label>Department</label>
        </div>
        <div className='roomSchedule'>
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setDate([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={date}
            minDate={new Date()}
          />
        </div>
        <div
          className='addNewBtn'
          onClick={null}
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
            onChange={null}
            required
          />
          <label>Name</label>
        </div>
        <div className="inputBox">
          <span className="icon">
            <MdEmojiPeople />
          </span>
          <input
            type="text"
            id="adult"
            onChange={null}
            required
          />
          <label>Adult</label>
        </div>
        <div className="inputBox">
          <span className="icon">
            <FaBaby />
          </span>
          <input
            type="text"
            id="children"
            onChange={null}
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
            onChange={null}
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
            onChange={null}
            required
          />
          <label>Double Room</label>
        </div>
      </div>
    </div>
  )
}

export default AddReservation
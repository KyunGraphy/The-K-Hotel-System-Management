import React, { useContext, useState } from 'react'

import { Calendar } from 'react-date-range';
import { IoArrowBackCircle, IoWaterSharp } from "react-icons/io5";
import { CiLock, CiTempHigh } from "react-icons/ci";
import { FaRegLightbulb } from "react-icons/fa";
import { BsLightningFill } from "react-icons/bs";
import { RoomContext } from '../../../contexts/RoomContext';

const RoomDetails = () => {
  const [unavaiDate, setUnvaiDate] = useState([]);
  const handleSelect = (item) => {
    let newunavaiDate = [...unavaiDate, item.getTime()]
    console.log(item.getTime()); // native Date object
    setUnvaiDate(newunavaiDate);
  }

  const { dispatch } = useContext(RoomContext)

  const removeRoom = () => {
    dispatch({ type: "REMOVE_ROOM" })
  };

  return (
    <div className='roomsDetails'>
      <IoArrowBackCircle
        className='backIcon'
        onClick={removeRoom}
      />
      <h2 className='roomNumber'>Room 101</h2>
      <div className='roomBlock'>
        <div className='roomInfo'>
          <p>Room number:
            <span>101</span>
          </p>
          <p>Type:
            <span>Single</span>
          </p>
          <p>Max people:
            <span>2</span>
          </p>
        </div>
        <div className='roomInfo'>
          <p>Price:
            <span>20</span>
          </p>
          <p>Description:
            <span>2 bed</span>
          </p>
          <p>Status:
            <span>Available</span>
          </p>
        </div>
      </div>

      <div className='roomStatus'>
        <div className='roomConsume'>
          <div className='roomBlock'>
            <div className='roomItem'>
              <CiTempHigh />27°C
            </div>
            <div className='roomItem'>
              <CiLock />Locked: On
            </div>
            <div className='roomItem'>
              <FaRegLightbulb /> Light: On
            </div>
          </div>
          <div className='roomBlock'>
            <div className='roomItem'>
              <BsLightningFill /> 20 hours
            </div>
            <div className='roomItem'>
              <IoWaterSharp />2 litres
            </div>
          </div>
        </div>
        <div className='roomSchedule'>
          <Calendar
            date={new Date()}
            onChange={(item) => handleSelect(item)}
            minDate={new Date()}
            disabledDates={unavaiDate}
          />
        </div>
      </div>
    </div>
  )
}

export default RoomDetails
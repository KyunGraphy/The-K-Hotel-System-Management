import React, { useContext, useEffect, useState } from 'react'

import { Calendar } from 'react-date-range';
import { IoArrowBackCircle, IoWaterSharp } from "react-icons/io5";
import { CiLock, CiTempHigh } from "react-icons/ci";
import { FaRegLightbulb } from "react-icons/fa";
import { BsLightningFill } from "react-icons/bs";
import { TbAirConditioningDisabled } from "react-icons/tb";
import { RoomContext } from '../../../contexts/RoomContext';
import useFetch from '../../../hooks/useFetch';

const RoomDetails = () => {
  const [unavaiDate, setUnvaiDate] = useState([]);
  const { roomId, dispatch } = useContext(RoomContext)
  const { data, loading } = useFetch(`/room/${roomId}`)

  useEffect(() => {
    if (data.length !== 0) {
      setUnvaiDate(data.unavailableDate);
    }
  }, [data])


  // const handleSelect = (item) => {
  //   let newunavaiDate = [...unavaiDate, item.getTime()]
  //   console.log(item.getTime()); // native Date object
  //   setUnvaiDate(newunavaiDate);
  // }
  // console.log(unavaiDate);
  // console.log(data.unavailableDate);

  const removeRoom = () => {
    dispatch({ type: "REMOVE_ROOM" })
  };

  return (
    <div className='roomsDetails'>
      {loading ? (
        <>Please wait...</>
      ) : (
        <>
          <IoArrowBackCircle
            className='backIcon'
            onClick={removeRoom}
          />
          <h2 className='roomNumber'>Room {data.number}</h2>
          <div className='roomBlock'>
            <div className='roomInfo'>
              <p>Room number:
                <span>{data.number}</span>
              </p>
              <p>Type:
                <span>{data.type}</span>
              </p>
              <p>Max people:
                <span>{data.maxPeople}</span>
              </p>
            </div>
            <div className='roomInfo'>
              <p>Price:
                <span>{data.type === "Single" ? 30 : 50}</span>
              </p>
              <p>Title:
                <span>{data.title}</span>
              </p>
              <p>Status:
                <span>{data.status}</span>
              </p>
            </div>
          </div>

          <div className='roomStatus'>
            <div className='roomConsume'>
              <div className='roomBlock'>
                <div className='roomItem'>
                  <CiLock />Locked: On
                </div>
                <div className='roomItem'>
                  <TbAirConditioningDisabled />A.C: On
                </div>
                <div className='roomItem'>
                  <FaRegLightbulb /> Light: On
                </div>
              </div>
              <div className='roomBlock'>
                <div className='roomItem'>
                  <CiTempHigh />27°C
                </div>
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
                onChange={() => null}
                disabledDates={unavaiDate}
              />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default RoomDetails
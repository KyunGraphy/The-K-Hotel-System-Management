import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import React, { useEffect, useState } from 'react'
import './styles/roomInfo.css'

const RoomInfo = ({ setOpenModal, roomModal }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [prePay, setPrePay] = useState(0);
  const [note, setNote] = useState("");

  console.log(roomModal)

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === 'Escape') {
        setOpenModal(false);
      }
    }

    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <div className='roomInfoContainer'>
      <div className="roomInfo">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpenModal(false)}
        />
        <div className="rTitleInfo">
          Room {(roomModal.number < 10) ? roomModal.number.toString().padStart(3, '0') : roomModal.number}
        </div>
        <div className="rInfo">
          <div className="rInfoLeft">
            <div className="">
              <label>Room type: </label>
              <div style={{ color: 'red' }}>
                {roomModal.type}
              </div>
            </div>
            <div className="rInfoPrice">
              <label>Price: </label>
              <div>
                <input className="rInfoData" value={`${roomModal.price} $`} readOnly disabled />
                <div className="rPencil"><ion-icon name="pencil"></ion-icon></div>
              </div>
            </div>
            <div className="">
              <label>Check-in date: </label>
              <div><DatePicker className="rInfoData" selected={startDate} onChange={(date) => setStartDate(date)} /></div>
            </div>
            <div className="">
              <label>Check-out date: </label>
              <div><DatePicker className="rInfoData" selected={endDate} onChange={(date) => setEndDate(date)} /></div>
            </div>
          </div>

          <div className="rInfoRight">
            <div className="">
              <label>Prepay: </label>
              <input
                className="rInfoData"
                type="number"
                min="0"
                step="10"
                value={prePay}
                onChange={(e) => setPrePay(e.target.value)}
              />
            </div>
            <div className="">
              <label>Note: </label>
              <textarea
                className="rInfoData"
                style={{ resize: "none" }}
                rows="4"
                placeholder="Note..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="customerInfo">
        </div>
      </div>
    </div>
  )
}

export default RoomInfo
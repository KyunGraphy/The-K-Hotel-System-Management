import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useEffect, useState } from 'react'

import './styles/roomInfo.css'

const RoomInfo = ({ setOpenModal, roomModal }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [selectedService, setSelectedService] = useState("");
  const [selectedServiceQuantity, setSelectedServiceQuantity] = useState(1);

  console.log(selectedServiceQuantity)
  console.log(selectedService)

  const handleChange = (e) => {
    setSelectedService(e.target.value);
  };

  useEffect(() => {
    function handleEscape(e) {
      if (e.key === 'Escape') {
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
          <nav className="rInfoHeader">Register Information</nav>
          <div className="rInfoBookSide">
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
          </div>

          <div className="rInfoBookSide">
            <div className="">
              <label>Check-in date: </label>
              <div><DatePicker className="rInfoData" selected={startDate} onChange={(date) => setStartDate(date)} /></div>
            </div>
            <div className="">
              <label>Check-out date: </label>
              <div><DatePicker className="rInfoData" selected={endDate} onChange={(date) => setEndDate(date)} /></div>
            </div>
          </div>
        </div>

        <div className="rInfo">
          <nav className="rInfoHeader">Service Information</nav>
          <div className="rInfoService">
            <div className="">
              <label>Service: </label>
              <div>
                <select
                  className="rInfoData"
                  value={selectedService}
                  onChange={handleChange}
                >
                  <option value="">--Please select an option--</option>
                  <option value="water">Water(10000)</option>
                  <option value="pepsi">Pepsi(12000)</option>
                  <option value="budweiser">Budweiser(45000)</option>
                  <option value="vodka">Vodka(70000)</option>
                </select>
              </div>
              <input
                className="rInfoData"
                type="number"
                value={selectedServiceQuantity}
                onChange={(e) => setSelectedServiceQuantity(e.target.value)}
              />
              <button>
                <ion-icon name="add-circle"></ion-icon>
                Add
              </button>
              <div className="rServicePrice">
                <label>Total: </label>
                <span>94000</span>
              </div>
            </div>
            <table className="rServiceTable">
              <tr>
                <th>#</th>
                <th>Service</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Amount</th>
              </tr>
              <tr>
                <td>1</td>
                <td>Pepsi</td>
                <td>2</td>
                <td>12000</td>
                <td>24000</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Vodka</td>
                <td>1</td>
                <td>70000</td>
                <td>70000</td>
              </tr>
            </table>
          </div>
        </div>

        <div className="rInfo">
          <nav className="rInfoHeader">Customer Information</nav>
          <div className="rInfoCustomerSide">
            <div>
              <label>ID/Passport: </label>
              <input className="rInfoData" />
            </div>
            <div>
              <label>Name: </label>
              <input className="rInfoData" />
            </div>
            <div>
              <label>Address: </label>
              <input className="rInfoData" />
            </div>
          </div>
          <div className="rInfoCustomerSide">
            <div>
              <label>DOB: </label>
              <input className="rInfoData" />
            </div>
            <div>
              <label>Email: </label>
              <input type="email" className="rInfoData" />
            </div>
            <div>
              <label>Phone: </label>
              <input type="tel" className="rInfoData" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" />
            </div>
          </div>
        </div>

        <div className="rBtn">
          <span className="rBookedBtn">Booked</span>
          <span className="rCancelBtn">Cancel</span>
        </div>
      </div>
    </div>
  )
}

export default RoomInfo
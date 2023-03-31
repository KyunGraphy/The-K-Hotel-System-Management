import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import './styles/roomInfo.css'

const RoomPayment = ({ setOpenModal, roomModal }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

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
  });

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
                {roomModal.department}
              </div>
            </div>
            <div className="">
              <label>Room type: </label>
              <div style={{ color: 'red' }}>
                {roomModal.type}
              </div>
            </div>
            <div className="rInfoPrice">
              <label>Price per day: </label>
              <div>
                <input className="rInfoData" value={`${roomModal.price} $`} readOnly disabled />
                <div className="rPencil"><ion-icon name="pencil"></ion-icon></div>
              </div>
            </div>
            <div className="rRoomPrice">
              <label>Total: </label>
              <span>123 $</span>
            </div>
          </div>

          <div className="rInfoBookSide">
            <div className="rInfoPrice">
              <label>Pre pay: </label>
              <div>
                <input className="rInfoData" value="10 $" readOnly disabled />
                <div className="rPencil"><ion-icon name="pencil"></ion-icon></div>
              </div>
            </div>
            <div className="">
              <label>Check-in date: </label>
              <div><DatePicker
                className="rInfoData"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                disabled
              /></div>
            </div>
            <div className="">
              <label>Check-out date: </label>
              <div><DatePicker
                className="rInfoData"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
              /></div>
            </div>
          </div>
        </div>

        <div className="rInfo">
          <nav className="rInfoHeader">Customer Information</nav>
          <div className="rInfoCustomerSide">
            <div style={{ position: "relative" }}>
              <label>ID/Passport: </label>
              <input className="rInfoData" value="1234567890" readOnly disabled />
              <div className="rPencil"><ion-icon name="pencil"></ion-icon></div>
            </div>
            <div style={{ position: "relative" }}>
              <label>Name: </label>
              <input className="rInfoData" value="Customer Name..." readOnly disabled />
              <div className="rPencil"><ion-icon name="pencil"></ion-icon></div>
            </div>
            <div style={{ position: "relative" }}>
              <label>Address: </label>
              <input className="rInfoData" value="Customer address..." readOnly disabled />
              <div className="rPencil"><ion-icon name="pencil"></ion-icon></div>
            </div>
          </div>
          <div className="rInfoCustomerSide">
            <div style={{ position: "relative" }}>
              <label>DOB: </label>
              <input className="rInfoData" value="Customer DOB" readOnly disabled />
              <div className="rPencil"><ion-icon name="pencil"></ion-icon></div>
            </div>
            <div style={{ position: "relative" }}>
              <label>Email: </label>
              <input type="email" className="rInfoData" value="customer@thek.com" readOnly disabled />
              <div className="rPencil"><ion-icon name="pencil"></ion-icon></div>
            </div>
            <div style={{ position: "relative" }}>
              <label>Phone: </label>
              <input
                type="tel"
                className="rInfoData"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                value="0987654321"
                readOnly
                disabled
              />
              <div className="rPencil"><ion-icon name="pencil"></ion-icon></div>
            </div>
          </div>
        </div>

        <div className="rInfo">
          <nav className="rInfoHeader">Service Information</nav>
          <div className="rInfoService">
            <div className="">
              <div className="rServicePrice">
                <label>Total: </label>
                <span>123 $</span>
              </div>
            </div>
            <table className="rServiceTable">
              <tr>
                <th>#</th>
                <th>Service</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Amount</th>
                <th></th>
              </tr>
              {/* <td colSpan={5} className="noServiceText">No Services Order</td> */}
              <tr>
                <td>1</td>
                <td>Water</td>
                <td>2</td>
                <td>0.5</td>
                <td>1</td>
                <td>
                  <button
                    style={{ cursor: "pointer" }}
                  >
                    X
                  </button>
                </td>
              </tr>
            </table>
          </div>
        </div>

        <div className="rFooter">
          <div className="rTotalPrice">
            <label>Total: </label>
            <span>123 $</span>
          </div>
          <div className="rBtn">
            <span className="rBookedBtn">Payment</span>
            <span className="rCancelBtn">Cancel</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoomPayment
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useCallback, useEffect, useState } from 'react'

import { listServicesMock } from "../../../mocks/ListServices.js";
import './styles/roomInfo.css'

const BookRoom = ({ setOpenModal, roomModal, listRooms, setListRooms }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [selectedService, setSelectedService] = useState({ name: "Water", price: 0.5 });
  const [selectedServiceQuantity, setSelectedServiceQuantity] = useState(1);
  const [listOrderedServices, setListOrderedServices] = useState([]);

  console.log(roomModal)

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

  const handleChooseService = (e) => {
    const item = (e.target.value.split("-"))
    setSelectedService({
      name: item[0],
      price: item[1],
    });
  };

  const handleAddService = () => {
    let service = {
      name: selectedService.name,
      price: selectedService.price,
      quantity: selectedServiceQuantity,
    }

    setSelectedServiceQuantity(1)
    setListOrderedServices([...listOrderedServices, service]);
  };

  const handleDeleteOrderItem = (i) => {
    let newListService = [...listOrderedServices];
    newListService.splice(i, 1)
    setListOrderedServices(newListService);
  };

  const totalServicePrice = useCallback(() => {
    return listOrderedServices.reduce(getServicePriceTotal, 0);

    function getServicePriceTotal(total, item) {
      return total + item.price * item.quantity;
    }
  }, [listOrderedServices])

  const getDiffDays = useCallback(() => {
    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round(Math.abs((startDate - endDate) / oneDay))
    return diffDays + 1;
  }, [startDate, endDate])

  const handleSetBooked = (roomId) => {
    setOpenModal(false);
    const newListRooms = listRooms.map(room => {
      if (room.id === roomId) {
        return {
          ...room,
          status: 'Booked'
        }
      }

      return { ...room }
    })

    setListRooms(newListRooms)
  }

  return (
    <div className='rInfoContainer' onClick={(e) => {
      if (e.target.className === 'rInfoContainer') setOpenModal(false)
    }}>
      <div className="rBoard">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={setOpenModal(false)}
        />
        <div className="rTitleInfo">
          Room {(roomModal.number < 10) ? roomModal.number.toString().padStart(3, '0') : roomModal.number}
        </div>

        <div className="rInfo">
          <nav className="rInfoHeader">Register Information</nav>
          <div className="rInfoBookSide">
            <div className="">
              <label>Department: </label>
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
              <div style={{ color: 'red' }}>
                {roomModal.price} $
              </div>
            </div>
          </div>

          <div className="rInfoBookSide">
            <div className="">
              <label>Check-in date: </label>
              <div><DatePicker
                className="rInfoData"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
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
            <div className="rRoomPrice">
              <label>Total: </label>
              <span>{getDiffDays() * roomModal.price} $</span>
            </div>
          </div>
        </div>

        <div className="rInfo">
          <nav className="rInfoHeader">Customer Information</nav>
          <div className="rInfoCustomerSide">
            <div>
              <label>ID/Passport: </label>
              <input className="rInfoData" required />
            </div>
            <div>
              <label>Name: </label>
              <input className="rInfoData" required />
            </div>
            <div>
              <label>Address: </label>
              <input className="rInfoData" required />
            </div>
          </div>
          <div className="rInfoCustomerSide">
            <div>
              <label>Country: </label>
              <input className="rInfoData" required />
            </div>
            <div>
              <label>Email: </label>
              <input type="email" className="rInfoData" required />
            </div>
            <div>
              <label>Phone: </label>
              <input type="tel" className="rInfoData" required pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" />
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
                  onChange={handleChooseService}
                >
                  {listServicesMock.map((service, i) => (
                    <option key={i} value={service.name + "-" + service.price}>
                      {service.name} ({service.price}$)
                    </option>
                  ))}
                </select>
              </div>
              <input
                className="rInfoData"
                type="number"
                value={selectedServiceQuantity}
                min={1}
                onChange={(e) => setSelectedServiceQuantity(e.target.value)}
              />
              <button onClick={handleAddService}>
                <ion-icon name="add-circle"></ion-icon>
                Add
              </button>
              <div className="rServicePrice">
                <label>Total: </label>
                <span>{totalServicePrice().toFixed(2)} $</span>
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
              {listOrderedServices.length === 0 && (
                <tr><td colSpan={5} className="noServiceText">No Services Order</td></tr>
              )}
              {listOrderedServices.map((item, i) => (
                <tr key={i + 1}>
                  <td>{i + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                  <td>{(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDeleteOrderItem(i)}
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </div>

        <div className="rFooter">
          <div className="rTotalPrice">
            <label>Total: </label>
            <span>{totalServicePrice() + getDiffDays() * roomModal.price} $</span>
          </div>
          <div className="rBtn">
            <span
              className="rBookedBtn"
              onClick={() => handleSetBooked(roomModal.id)}
            >Book room</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookRoom
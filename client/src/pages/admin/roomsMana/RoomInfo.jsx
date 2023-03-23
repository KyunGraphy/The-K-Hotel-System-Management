import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"

import React, { useEffect } from 'react'
import './styles/roomInfo.css'

const RoomInfo = ({ setOpenModal, roomModal }) => {
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
      </div>
    </div>
  )
}

export default RoomInfo
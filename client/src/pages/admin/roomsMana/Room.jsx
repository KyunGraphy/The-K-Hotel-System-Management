import React, { useState } from 'react'
import RoomInfo from './RoomInfo';
import './styles/rooms.css'

const Room = ({ rooms }) => {
  const [openModal, setOpenModal] = useState(false);
  const [roomModal, setRoomModal] = useState();
  // const roomsContext = useContext(RoomsManaContext)
  const statusMap = {
    'Available': 'bgGreen',
    'Booked': 'bgRed',
    'Using': 'bgOrange',
    'Check Out': 'bgPurple',
    'Maintenance': 'bgGrey',
  }

  // const handleClickRoom = () => {
  //   roomsContext.setShowRoomInfo(!roomsContext.showRoomInfo);
  // };
  const handleClickRoom = (room) => {
    setRoomModal(room);
    setOpenModal(true);
  };

  return (
    <div className='room'>
      <div className='roomFloor'>{rooms.title} Floor</div>
      <div className='roomField'>
        {rooms.rooms.map((room, index) => (
          <span key={index}
            className={`${statusMap[room.status]} roomItem`}
            onClick={() => handleClickRoom(room)}
          >{(room.number < 10) ? room.number.toString().padStart(3, '0') : room.number}
          </span>
        ))}
      </div>
      {openModal && <RoomInfo setOpenModal={setOpenModal} roomModal={roomModal} />}
    </div>
  )
}

export default Room
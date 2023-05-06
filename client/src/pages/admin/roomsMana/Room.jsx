import React, { useState } from 'react'
import BookRoom from './BookRoom';
import RoomPayment from './RoomPayment';

import { IoPeopleOutline, IoPersonOutline } from "react-icons/io5";
import { TbCrown } from "react-icons/tb";


const Room = ({ room, listRooms, setListRooms }) => {
  const [openModal, setOpenModal] = useState(false);
  const [roomModal, setRoomModal] = useState();

  const statusMap = {
    'Available': 'bgGreen',
    'Booked': 'bgRed',
    'Using': 'bgOrange',
    'Check Out': 'bgPurple',
    'Maintenance': 'bgGrey',
  }
  console.log(openModal)

  const handleClickRoom = (room) => {
    console.log('Set open modal')
    setRoomModal(room);
    setOpenModal(!openModal);
  };

  return (
    <span
      className={`${statusMap[room.status]} rItem`}
      onClick={() => {
        if (openModal === false) handleClickRoom(room)
      }}
    >
      {room?.type === 'Single' && <IoPersonOutline />}
      {room?.type === 'Double' && <IoPeopleOutline />}
      {room?.type === 'Royal' && <TbCrown />}
      {(room.number < 10) ? room.number.toString().padStart(3, '0') : room.number}

      {(openModal && roomModal.status === "Available") && <BookRoom
        setOpenModal={setOpenModal}
        roomModal={roomModal}
        listRooms={listRooms}
        setListRooms={setListRooms}
      />}

      {(openModal && roomModal.status === "Booked") && <RoomPayment
        setOpenModal={setOpenModal}
        roomModal={roomModal}
        listRooms={listRooms}
        setListRooms={setListRooms}
      />}
    </span>

  )
}

export default Room
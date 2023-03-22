import React from 'react'
import { faBed, faCrown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Room = ({ room }) => {
  const statusMap = {
    'Available': 'bgGreen',
    'Booked': 'bgRed',
    'Using': 'bgOrange',
    'Check Out': 'bgPurple',
    'Maintenance': 'bgGrey',
  }
  const bgColor = statusMap[room.status]

  return (
    <div className={`room ${bgColor}`}>
      <div className='roomInfo'>
        {room.number} <br />
        {room.type}
        <FontAwesomeIcon style={{ margin: '0 12px' }} icon={room.type === 'Royal Room' ? faCrown : faBed} />
      </div>
      <div className='roomPrice'>$ {room.price}</div>
      <div className='roomDepartment'>
        {/* {`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`} <br />
        {`${date.getHours()}:${date.getMinutes()}`} */}
        {room.department}
      </div>
    </div>
  )
}

export default Room
import React from 'react'
import './rooms.css'

const Room = ({ rooms }) => {
  const statusMap = {
    'Available': 'bgGreen',
    'Booked': 'bgRed',
    'Using': 'bgOrange',
    'Check Out': 'bgPurple',
    'Maintenance': 'bgGrey',
  }
  // const bgColor = statusMap[]

  return (
    <div className='room'>
      <div className='roomFloor'>{rooms.title} Floor</div>
      <div className='roomField'>
        {rooms.rooms.map((room, index) => (
          <span key={index}>{(room.number < 10) ? room.number.toString().padStart(3, '0') : room.number}</span>
        ))}
      </div>
    </div>
  )
}

export default Room
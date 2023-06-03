import React from 'react'
import './confirmBox.css'

const ConfirmBox = ({ msg, type, callBack, cancelFunc }) => {
  return (
    <div className='confirmBoxContainer'>
      <div className='confirmBox'>
        <p>{msg}</p>
        <div className='actBtn'>
          {type === 'accept' && <button
            type='button'
            className='viewBtn'
            onClick={callBack}
          >Delete</button>}
          {type === 'delete' && <button
            type='button'
            className='delBtn'
            onClick={callBack}
          >Delete</button>}
          <button
            type='button'
            className='cancelBtn'
            onClick={cancelFunc}
          >Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmBox
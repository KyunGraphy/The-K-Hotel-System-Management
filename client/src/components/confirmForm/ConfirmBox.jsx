import React from 'react'
import './confirmBox.css'

const ConfirmBox = ({ msg, type, callBack, cancelFunc, loading }) => {
  return (
    <div className='confirmBoxContainer'>
      <div className='confirmBox'>
        <p>{msg}</p>
        <div className='actBtn'>
          {type === 'accept' && (
            <button
              type='button'
              className='formBtn acceptFormBtn'
              onClick={callBack}
              disabled={loading}
            >
              Delete
            </button>
          )}
          {type === 'delete' && (
            <button
              type='button'
              className='formBtn delFormBtn'
              onClick={callBack}
              disabled={loading}
            >
              Delete
            </button>
          )}
          <button
            type='button'
            className='formBtn cancelFormBtn'
            onClick={cancelFunc}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmBox
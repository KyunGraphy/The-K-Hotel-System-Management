import React from 'react'
import './confirmBox.css'
import { Button } from '@mui/material'

const ConfirmBox = ({ msg, type, callBack, cancelFunc, loading }) => {
  return (
    <div className='confirmBoxContainer'>
      <div className='confirmBox'>
        <p>{msg}</p>
        <div className='actBtn'>
          {type === 'accept' && (
            <Button
              variant='outlined'
              color='success'
              onClick={callBack}
              disabled={loading}
            >
              Delete
            </Button>
          )}
          {type === 'delete' && (
            <Button
              variant='outlined'
              color='error'
              onClick={callBack}
              disabled={loading}
            >
              Delete
            </Button>
          )}
          <Button
            variant='outlined'
            onClick={cancelFunc}
            disabled={loading}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmBox
import React from 'react'

const AvailableRoom = () => {
  return (
    <div className='reservationAvailableRoom'>
      <div>
        <h2>Assign Rooms</h2>
        <div className='reservationHeader'>
          <p>Number</p>
          <p>Type</p>
          <p>Description</p>
          <p>Max People</p>
          <p></p>
        </div>
        <section>
          <div className='reservationData'>
            <p>101</p>
            <p>Single</p>
            <p>2 Bed 2 Bathroom 1 Balcony</p>
            <p>3</p>
            <p className='actBtn'>
              <div className='assBtn'>
                <ion-icon name="remove-circle-outline"></ion-icon>Remove
              </div>
            </p>
          </div>
        </section>
      </div>
      <div>
        <h2>Available Rooms</h2>
        <div className='reservationHeader'>
          <p>Number</p>
          <p>Type</p>
          <p>Description</p>
          <p>Max People</p>
          <p></p>
        </div>
        <section>
          <div className='reservationData'>
            <p>101</p>
            <p>Single</p>
            <p>2 Bed 2 Bathroom 1 Balcony</p>
            <p>3</p>
            <p className='actBtn'>
              <div className='assBtn'>
                <ion-icon name="add-circle-outline"></ion-icon>Assign
              </div>
            </p>
          </div>
          <div className='reservationData'>
            <p>102</p>
            <p>Single</p>
            <p>2 Bed 2 Bathroom 1 Balcony</p>
            <p>3</p>
            <p className='actBtn'>
              <div className='assBtn'>
                <ion-icon name="add-circle-outline"></ion-icon>Assign
              </div>
            </p>
          </div>
          <div className='reservationData'>
            <p>103</p>
            <p>Single</p>
            <p>2 Bed 2 Bathroom 1 Balcony</p>
            <p>3</p>
            <p className='actBtn'>
              <div className='assBtn'>
                <ion-icon name="add-circle-outline"></ion-icon>Assign
              </div>
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default AvailableRoom
import React, { useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Alert from '../../../components/alert/Alert'
import useFetch from '../../../hooks/useFetch';
import axios from 'axios';

const AvailableRoom = ({ reserve, date, reFetch }) => {
  const [assignLoading, setAssignLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const { data, loading } = useFetch(`/hotel/room/${reserve.hotelID}`);

  const handleAssignRoom = async (roomId) => {
    setAssignLoading(true)
    try {
      await axios.post(`/reservation/assign/${reserve._id}`, {
        reserveId: reserve._id,
        roomId,
        date,
      })
      setSuccessMsg('Assign rooms successfully!!');
    } catch (err) {
      setErrMsg("Assign rooms failed")
    }
    reFetch()
    setAssignLoading(false)
  };

  return (
    <div className='reservationAvailableRoom'>
      {assignLoading && (<div className='loadingSection'>
        <p>Please wait...</p>
      </div>)}
      <Alert msg={errMsg} type="danger" />
      <Alert msg={successMsg} type="success" />
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
          {loading ? (
            <>
              <div className="listSkeleton">
                <p><Skeleton width={120} height={120} circle="true" /></p>
                <p><Skeleton count={5} /></p>
              </div>
              <div className="listSkeleton">
                <p><Skeleton width={120} height={120} circle="true" /></p>
                <p><Skeleton count={5} /></p>
              </div>
            </>
          ) : (
            <>
              {data.map(item => (
                reserve.rooms.includes(item._id) && (<div
                  key={item._id}
                  className='reservationData'
                >
                  <p>{item.number}</p>
                  <p>{item.type}</p>
                  <p>{item.description}</p>
                  <p>{item.maxPeople}</p>
                  <p className='actBtn'>
                    <div className='assBtn'>
                      <ion-icon name="remove-circle-outline"></ion-icon>Remove
                    </div>
                  </p>
                </div>)
              ))}
            </>
          )}
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
          {loading ? (
            <>
              <div className="listSkeleton">
                <p><Skeleton width={120} height={120} circle="true" /></p>
                <p><Skeleton count={5} /></p>
              </div>
              <div className="listSkeleton">
                <p><Skeleton width={120} height={120} circle="true" /></p>
                <p><Skeleton count={5} /></p>
              </div>
            </>
          ) : (
            <>
              {data.map(item => (
                <div
                  key={item._id}
                  className='reservationData'
                >
                  <p>{item.number}</p>
                  <p>{item.type}</p>
                  <p>{item.description}</p>
                  <p>{item.maxPeople}</p>
                  <p className='actBtn'>
                    <div
                      onClick={() => handleAssignRoom(item._id)}
                      className='assBtn'
                    >
                      <ion-icon name="add-circle-outline"></ion-icon>Assign
                    </div>
                  </p>
                </div>
              ))}
            </>
          )}
        </section>
      </div>
    </div>
  )
}

export default AvailableRoom
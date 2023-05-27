import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Alert from '../../../components/alert/Alert'
import useFetch from '../../../hooks/useFetch';
import { MILLISECONDS_PER_DAY } from '../../../constants/Constant';

const AvailableRoom = ({ reserve, date, reFetchReservation }) => {
  const [roomFound, setRoomFound] = useState([]);
  const [assignLoading, setAssignLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const { data, loading, reFetch } = useFetch(`/hotel/room/${reserve.hotelID}`);

  const handleAssignRoom = async (roomId) => {
    setAssignLoading(true)
    try {
      await axios.post(`/reservation/assign/${reserve._id}`, {
        reserveId: reserve._id,
        roomId,
        date,
      })
      setSuccessMsg('Assign rooms successfully!!');
      reFetchReservation()
      reFetch()
    } catch (err) {
      setErrMsg("Assign rooms failed")
    }
    setAssignLoading(false)
  };

  const handleRemoveRoom = async (roomId) => {
    setAssignLoading(true)
    try {
      await axios.post(`/reservation/remove/${reserve._id}`, {
        reserveId: reserve._id,
        roomId,
        date,
      })
      setSuccessMsg('Remove rooms successfully!!');
      reFetchReservation()
      reFetch()
    } catch (err) {
      setErrMsg("Remove rooms failed")
    }
    setAssignLoading(false)
  };

  const getDatesInRange = (startDate, endDate) => {
    const start = startDate.getTime();
    const end = endDate.getTime();
    let date = start;
    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date += MILLISECONDS_PER_DAY;
    }
    return dates;
  };

  const allDates = getDatesInRange(date[0].startDate, date[0].endDate)

  useEffect(() => {
    if (data.length !== 0) {
      setRoomFound(data.filter(item => !(
        item.unavailableDate.some(date => (
          allDates.includes(date)
        ))
      )))
    }
  }, [data])

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
                    <span
                      className='assBtn'
                      onClick={() => handleRemoveRoom(item._id)}
                    >
                      <ion-icon name="remove-circle-outline"></ion-icon>Remove
                    </span>
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
              {roomFound.map(item => (
                <div
                  key={item._id}
                  className='reservationData'
                >
                  <p>{item.number}</p>
                  <p>{item.type}</p>
                  <p>{item.description}</p>
                  <p>{item.maxPeople}</p>
                  <p className='actBtn'>
                    <span
                      className='assBtn'
                      onClick={() => handleAssignRoom(item._id)}
                    >
                      <ion-icon name="add-circle-outline"></ion-icon>Assign
                    </span>
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
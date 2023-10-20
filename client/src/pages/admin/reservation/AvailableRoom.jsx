import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import useFetch from '../../../hooks/useFetch';
import { MILLISECONDS_PER_DAY } from '../../../constants/Constant';
import { Toastify } from '../../../components/toastify/Toastify';
import BackdropComponent from '../../../components/backdrop/BackdropComponent';

// ----------------------------------------------------------------
const AvailableRoom = ({ reserve, date, reFetchReservation }) => {
  const [roomFound, setRoomFound] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const { data, loading: dataLoading, reFetch } = useFetch(`/hotel/room/${reserve.hotelID}`);

  const handleAssignRoom = async (roomId) => {
    if (date[0].startDate < new Date()) {
      setErrMsg("The reservation has expired")
      return
    }
    setLoading(true)
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
    setLoading(false)
  };

  const handleRemoveRoom = async (roomId) => {
    if (date[0].endDate < new Date()) {
      setErrMsg("The reservation has expired")
      setTimeout(function () {
        setErrMsg('');
      }, 10000)
      return
    }
    setLoading(true)
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
    setLoading(false)
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


  useEffect(() => {
    const allDates = getDatesInRange(date[0].startDate, date[0].endDate)

    if (data.length !== 0) {
      setRoomFound(data.filter(item => !(
        item.unavailableDate.some(date => (
          allDates.includes(date)
        ))
      )))
    }
  }, [data, date])

  return (
    <div className='reservationAvailableRoom'>
      {loading && (
        <div className='loadingSection'>
          <BackdropComponent />
        </div>
      )}
      {errMsg && <Toastify msg={errMsg} type="error" />}
      {successMsg && <Toastify msg={successMsg} type="success" />}
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
          {dataLoading ? (
            <React.Fragment>
              <div className="listSkeleton">
                <p><Skeleton width={120} height={120} circle="true" /></p>
                <p><Skeleton count={5} /></p>
              </div>
              <div className="listSkeleton">
                <p><Skeleton width={120} height={120} circle="true" /></p>
                <p><Skeleton count={5} /></p>
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
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
            </React.Fragment>
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
          {dataLoading ? (
            <React.Fragment>
              <div className="listSkeleton">
                <p><Skeleton width={120} height={120} circle="true" /></p>
                <p><Skeleton count={5} /></p>
              </div>
              <div className="listSkeleton">
                <p><Skeleton width={120} height={120} circle="true" /></p>
                <p><Skeleton count={5} /></p>
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
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
                    {item.status === "Maintenance" ? (
                      <span
                        className='maintenanceBtn'
                      >
                        <ion-icon name="build-outline"></ion-icon>Maintenance
                      </span>
                    ) : (
                      <span
                        className='assBtn'
                        onClick={() => handleAssignRoom(item._id)}
                      >
                        <ion-icon name="add-circle-outline"></ion-icon>Assign
                      </span>
                    )}
                  </p>
                </div>
              ))}
            </React.Fragment>
          )}
        </section>
      </div>
    </div>
  )
}

export default AvailableRoom
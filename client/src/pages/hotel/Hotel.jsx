import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from '@mui/material';

import "./hotel.css";
import useFetch from "../../hooks/useFetch";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { AuthContext } from "../../contexts/AuthContext";
import Rating from "../../components/searchItem/Rating";
import Comment from "../../components/comment/Comment";
import { Toastify } from "../../components/toastify/Toastify";
import { MILLISECONDS_PER_DAY, roomPrice } from "../../constants/Constant";
import { HOTELS_IMAGES } from '../../constants/Images';
import useSetDefaultDate from '../../hooks/useSetDefaultDate';
import { Languages } from '../../constants/Languages';


// ----------------------------------------------------------------
const Hotel = () => {
  const [dateRange, setDateRange] = useState(0.6)
  const [loading, setLoading] = useState(false)
  const [errMsg, setErrMsg] = useState("");
  const params = useParams()

  const defaultToday = useSetDefaultDate(new Date())

  const [date, setDate] = useState([
    {
      startDate: new Date(defaultToday),
      endDate: new Date(defaultToday),
      key: "selection",
    },
  ]);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    singleRoom: 0,
    doubleRoom: 0,
  });

  const [openDate, setOpenDate] = useState(false);

  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handlePress(e) {
      if (e.keyCode === 27) setOpen(false)
    }
    window.addEventListener('keydown', handlePress);

    return () => {
      window.removeEventListener('keydown', handlePress);
    }
  })

  useEffect(() => {
    if (date[0].startDate.getTime() === date[0].endDate.getTime()) {
      setDateRange(0.6);
    } else {
      setDateRange((date[0].endDate - date[0].startDate) / MILLISECONDS_PER_DAY);
    }
  }, [date])

  const { loading: loadingData, data } = useFetch(`/hotel/${params.id}`)
  const { user, lang } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleOption = (name, value) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: Number(value),
      };
    });
  }

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber)
  };

  const handleReserve = async () => {
    setLoading(true);
    if (!user) {
      return navigate("/login", { state: { errMsg: "You have to login to make reservation" } })
    }

    if (options.singleRoom === 0 && options.doubleRoom === 0) {
      setErrMsg("Single room or Double room must be better than 0")
      setLoading(false);
      setTimeout(function () {
        setErrMsg('')
      }, 10000);
      return
    } else {
      setErrMsg(null)
      const reservationForm = {
        ...options,
        department: data.department,
        checkInDate: date[0].startDate.getTime(),
        checkOutDate: date[0].endDate.getTime(),
        isOnline: true,
      }
      return navigate(`/payment/${params.id}`, {
        state: {
          reservationData: {
            ...reservationForm,
            night: Math.floor(dateRange),
            price: dateRange * (
              options.singleRoom * roomPrice.single +
              options.doubleRoom * roomPrice.double
            )
          }
        }
      })
    }
  };

  return (
    <div>
      <Navbar />
      {errMsg && <Toastify msg={errMsg} type="error" />}
      <Header type="list" />
      <div className="hotelContainer">
        {open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")}
            />
            <div className="sliderWrapper">
              <img src={HOTELS_IMAGES[slideNumber].src} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
        <div className="hotelWrapper">
          {loadingData ? (
            <React.Fragment>
              <div className="listSkeleton">
                <p><Skeleton width={120} height={120} circle="true" /></p>
                <p><Skeleton count={5} /></p>
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {/* <button className="bookNow">Reserve or Book Now!</button> */}
              <h1 className="hotelTitle">
                {data.department}
                <Rating hotelId={params.id} />
              </h1>
              <div className="hotelAddress">
                <FontAwesomeIcon icon={faLocationDot} />
                <span>{data.address}</span>
              </div>
              <span className="hotelDistance">
                Excellent location
              </span>
              <span className="hotelPriceHighlight">
                {data.title}
              </span>
              <div className="hotelImages">
                {HOTELS_IMAGES.map((photo, i) => (
                  <div className="hotelImgWrapper" key={i}>
                    <img
                      onClick={() => handleOpen(i)}
                      src={photo.src}
                      alt=""
                      className="hotelImg"
                    />
                  </div>
                ))}
              </div>
              <div className="hotelDetails">
                <div className="hotelDetailsContent">
                  <h1 className="hotelTitle">Stay in the {data.title}</h1>
                  <p className="hotelDesc">
                    {Languages.hotel.hotelDesc[lang]}
                  </p>
                  <Comment hotelId={params.id} />
                </div>
                <div className="hotelDetailsPrice">
                  <div className="listSearch">
                    <h1 className="lsTitle">Search</h1>
                    <div className="lsItem">
                      <label>{Languages.reservation.checkInDate[lang]}</label>
                      <span onClick={() => setOpenDate(!openDate)}>{`${format(
                        date[0].startDate,
                        "MM/dd/yyyy"
                      )} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
                      {openDate && (
                        <DateRange
                          editableDateInputs={true}
                          onChange={(item) => setDate([item.selection])}
                          moveRangeOnFirstSelection={false}
                          ranges={date}
                          minDate={new Date()}
                        />
                      )}
                    </div>
                    <div className="lsItem">
                      <label>{Languages.other.options[lang]}</label>
                      <div className="lsOptions">
                        <div className="lsOptionItem">
                          <span className="lsOptionText">{Languages.reservation.adult[lang]}</span>
                          <input
                            type="number"
                            min={1}
                            className="lsOptionInput"
                            id="adult"
                            value={options.adult}
                            onChange={(e) => handleOption(e.target.id, e.target.value)}
                          />
                        </div>
                        <div className="lsOptionItem">
                          <span className="lsOptionText">{Languages.reservation.children[lang]}</span>
                          <input
                            type="number"
                            min={0}
                            className="lsOptionInput"
                            id="children"
                            value={options.children}
                            onChange={(e) => handleOption(e.target.id, e.target.value)}
                          />
                        </div>
                        <div className="lsOptionItem">
                          <span className="lsOptionText">{Languages.reservation.singleRoom[lang]}</span>
                          <input
                            type="number"
                            min={0}
                            className="lsOptionInput"
                            id="singleRoom"
                            value={options.singleRoom}
                            onChange={(e) => handleOption(e.target.id, e.target.value)}
                          />
                        </div>
                        <div className="lsOptionItem">
                          <span className="lsOptionText">{Languages.reservation.doubleRoom[lang]}</span>
                          <input
                            type="number"
                            min={0}
                            className="lsOptionInput"
                            id="doubleRoom"
                            placeholder={options.doubleRoom}
                            onChange={(e) => handleOption(e.target.id, e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <h2>
                      <b>${dateRange * (
                        options.singleRoom * roomPrice.single +
                        options.doubleRoom * roomPrice.double
                      )}</b> ({Math.floor(dateRange)} {Languages.reservation.day[lang]})
                    </h2>
                    <Button
                      variant="contained"
                      onClick={handleReserve}
                      disabled={loading}
                    >{Languages.reservation.reserve[lang]}</Button>
                  </div>
                </div>
              </div>
            </React.Fragment>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Hotel;

import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Alert from "../../components/alert/Alert";
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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import Rating from "../../components/searchItem/Rating";
import Comment from "../../components/comment/Comment";
import { MILLISECONDS_PER_DAY } from "../../constants/Constant";

const Hotel = () => {
  const [dateRange, setDateRange] = useState(0.6)
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const params = useParams()
  const location = useLocation();

  const today = new Date();
  today.setHours(0)
  today.setMinutes(0)
  today.setSeconds(0)

  const [date, setDate] = useState(location.state?.date || [
    {
      startDate: Math.floor(today.getTime() / 100000) * 100000,
      endDate: Math.floor(today.getTime() / 100000) * 100000,
      key: "selection",
    },
  ]);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state?.options || {
    adult: 1,
    children: 0,
    singleRoom: 0,
    doubleRoom: 0,
  });

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

  const { loading, data } = useFetch(`/hotel/${params.id}`)
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleOption = (name, value) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: Number(value),
      };
    });
  }

  const photos = [
    { src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1", },
    { src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1", },
    { src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1", },
    { src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1", },
    { src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1", },
    { src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1", },
  ];

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
    if (!user) {
      return navigate("/login", { state: { errMsg: "You have to login to make reservation" } })
    }

    if (user && options.singleRoom === 0 && options.doubleRoom === 0) {
      setErrMsg("Single room or Double room must be better than 0")
    } else {
      setErrMsg(null)
      const reservationForm = {
        ...options,
        userId: user._id,
        checkInDate: date[0].startDate.getTime(),
        checkOutDate: date[0].endDate.getTime(),
        isOnline: true,
      }
      try {
        await axios.post(`/reservation/${params.id}`, reservationForm)
        setSuccessMsg('Booking successfully!!');
      } catch (err) {
        if (err.response.data.message === 'You are not authenticated!') {
          navigate("/login", { state: { errMsg: "Login session expired, please login!" } })
        } else {
          setErrMsg('Something went wrong!');
        }
      }
    }
  };

  return (
    <div>
      <Navbar />
      <Alert msg={errMsg} type="danger" />
      <Alert msg={successMsg} type="success" />
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
              <img src={photos[slideNumber].src} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
        <div className="hotelWrapper">
          {loading ? (
            <>
              <div className="listSkeleton">
                <p><Skeleton width={120} height={120} circle="true" /></p>
                <p><Skeleton count={5} /></p>
              </div>
            </>
          ) : (
            <>
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
                {photos.map((photo, i) => (
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
                    {data.description}
                  </p>
                  <Comment hotelId={params.id} />
                </div>
                <div className="hotelDetailsPrice">
                  <div className="listSearch">
                    <h1 className="lsTitle">Search</h1>
                    <div className="lsItem">
                      <label>Check-in Date</label>
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
                      <label>Options</label>
                      <div className="lsOptions">
                        <div className="lsOptionItem">
                          <span className="lsOptionText">Adult</span>
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
                          <span className="lsOptionText">Children</span>
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
                          <span className="lsOptionText">Single Room</span>
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
                          <span className="lsOptionText">Double Room</span>
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
                      <b>${dateRange * (options.singleRoom * 30 + options.doubleRoom * 50)}</b> ({Math.floor(dateRange)} nights)
                    </h2>
                    <button
                      onClick={handleReserve}
                    >Reserve or Book Now!</button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Hotel;

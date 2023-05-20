import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./featuredProperties.css";
import Rating from "./Rating";

const FeaturedProperties = ({ hotels }) => {
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    singleRoom: 0,
    doubleRoom: 0,
  });
  const navigate = useNavigate();

  return (
    <div className="fp">
      {hotels.map((hotel) => (
        <div
          key={hotel._id}
          className="fpItem"
          onClick={() => navigate(`/hotels/${hotel._id}`, { state: { date, options } })}
        >
          <img
            src={hotel.photo}
            alt=""
            className="fpImg"
          />
          <span className="fpName">{hotel.department}</span>
          <span className="fpCity">
            <FontAwesomeIcon icon={faLocationDot} />
            {hotel.address}
          </span>
          <span className="fpPrice">{hotel.title}</span>
          <Rating hotelId={hotel._id} />
        </div>
      ))}
    </div>
  );
};

export default FeaturedProperties;

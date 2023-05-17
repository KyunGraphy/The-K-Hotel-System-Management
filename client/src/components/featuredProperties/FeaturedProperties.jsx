import { useNavigate } from "react-router-dom";
import "./featuredProperties.css";
import { useState } from "react";

const FeaturedProperties = ({ hotels }) => {
  const [destination, setDestination] = useState("");
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
          onClick={() => navigate("/hotels", { state: { date, options } })}
        >
          <img
            src={hotel.photo}
            alt=""
            className="fpImg"
          />
          <span className="fpName">{hotel.department}</span>
          <span className="fpCity">{hotel.address}</span>
          <span className="fpPrice">{hotel.description}</span>
          <div className="fpRating">
            <button>4.9</button>
            <span>Excellent</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedProperties;

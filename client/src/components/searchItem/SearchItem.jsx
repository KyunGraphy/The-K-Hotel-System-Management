import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./searchItem.css";
import Rating from "./Rating";

const SearchItem = ({ item, date, options }) => {
  const navigate = useNavigate();

  return (
    <div className="searchItem">
      <img
        src={item.photo}
        alt=""
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">{item.department}</h1>
        <span className="siDistance">
          <FontAwesomeIcon icon={faLocationDot} />
          {item.address}
        </span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">{item.title}</span>
        <span className="siFeatures">
          Entire studio • 1 bathroom • 21m² 1 full bed
        </span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        <Rating hotelId={item._id} />
        <div className="siDetailTexts">
          <span className="siPrice">$30-$50/Day</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <button
            className="siCheckButton"
            onClick={() => navigate(`/hotels/${item._id}`, { state: { date, options } })}
          >See Details</button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;

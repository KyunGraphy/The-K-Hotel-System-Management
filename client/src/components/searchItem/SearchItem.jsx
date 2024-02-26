import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import "./searchItem.css";
import Rating from "./Rating";
import { roomPrice } from '../../constants/Constant.js'
import { Languages } from "../../constants/Languages.js";
import { AuthContext } from "../../contexts/AuthContext.js";

const SearchItem = ({ item, date, options }) => {
  const navigate = useNavigate();
  const { lang } = useContext(AuthContext)

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
        <span className="siCancelOp">{Languages.other.freeCancel[lang]} </span>
        <span className="siCancelOpSubtitle">
          {Languages.hotel.hotelNote[lang]}
        </span>
      </div>
      <div className="siDetails">
        <Rating hotelId={item._id} />
        <div className="siDetailTexts">
          <span className="siPrice">${roomPrice.single}-${roomPrice.double}/{Languages.reservation.day[lang]}</span>
          <span className="siTaxOp">{Languages.hotel.hotelTax[lang]}</span>
          <button
            className="siCheckButton"
            onClick={() => navigate(`/hotels/${item._id}`, { state: { date, options } })}
          >{Languages.other.detail[lang]}</button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;

import "./searchItem.css";

const SearchItem = ({ item, date, options }) => {
  return (
    <div className="searchItem">
      <img
        src={item.photo}
        alt=""
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">{item.department}</h1>
        <span className="siDistance">{item.address}</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">{item.description}</span>
        <span className="siFeatures">
          Entire studio • 1 bathroom • 21m² 1 full bed
        </span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        <div className="siRating">
          <span>Excellent</span>
          <button>8.9</button>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">$30-$50/Day</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <button className="siCheckButton">See Detail</button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./propertyList.css";

const PropertyList = () => {
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
  const navigate = useNavigate()

  return (
    <div className="pList">
      <div
        className="pListItem"
        onClick={() => navigate("/hotels", { state: { date, options } })}
      >
        <img
          src="https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o="
          alt=""
          className="pListImg"
        />
        <div className="pListTitles">
          <h1>Relax Space</h1>
        </div>
      </div>
      <div
        className="pListItem"
        onClick={() => navigate("/hotels", { state: { date, options } })}
      >
        <img
          src="https://images.pexels.com/photos/1267321/pexels-photo-1267321.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
          className="pListImg"
        />
        <div className="pListTitles">
          <h1>Party Organization</h1>
        </div>
      </div>
      <div
        className="pListItem"
        onClick={() => navigate("/hotels", { state: { date, options } })}
      >
        <img
          src="https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg"
          alt=""
          className="pListImg"
        />
        <div className="pListTitles">
          <h1>Double Room</h1>
        </div>
      </div>
      <div
        className="pListItem"
        onClick={() => navigate("/hotels", { state: { date, options } })}
      >
        <img
          src="https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
          className="pListImg"
        />
        <div className="pListTitles">
          <h1>Gym & Fitness</h1>
        </div>
      </div>
      <div
        className="pListItem"
        onClick={() => navigate("/hotels", { state: { date, options } })}
      >
        <img
          src="https://images.pexels.com/photos/261101/pexels-photo-261101.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
          className="pListImg"
        />
        <div className="pListTitles">
          <h1>Swimming Pool</h1>
        </div>
      </div>
    </div>
  );
};

export default PropertyList;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./propertyList.css";

const PropertyList = () => {
  const navigate = useNavigate()

  return (
    <div className="pList">
      <div
        className="pListItem"
        onClick={() => navigate("/services", { state: { service: 'relax-space' } })}
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
        onClick={() => navigate("/services", { state: { service: 'party-organization' } })}
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
        onClick={() => navigate("/services", { state: { service: 'rent-cars' } })}
      >
        <img
          src="https://images.pexels.com/photos/2036544/pexels-photo-2036544.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
          className="pListImg"
        />
        <div className="pListTitles">
          <h1>Rent Cars</h1>
        </div>
      </div>
      <div
        className="pListItem"
        onClick={() => navigate("/services", { state: { service: 'gym' } })}
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
        onClick={() => navigate("/services", { state: { service: 'swimming-pool' } })}
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
      <div
        className="pListItem"
        onClick={() => navigate("/services", { state: { service: 'billiards' } })}
      >
        <img
          src="https://images.pexels.com/photos/261043/pexels-photo-261043.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
          className="pListImg"
        />
        <div className="pListTitles">
          <h1>Billiards</h1>
        </div>
      </div>
    </div>
  );
};

export default PropertyList;

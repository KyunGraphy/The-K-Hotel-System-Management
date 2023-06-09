import { faBed, faCalendarDays, faCar, faDumbbell, faPerson, faPersonSwimming, faUtensils } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { DateRange } from "react-date-range";
import { useContext, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext.js"

const Header = ({ type }) => {
  const [openDate, setOpenDate] = useState(false);

  const today = new Date();
  today.setHours(0)
  today.setMinutes(0)
  today.setSeconds(0)

  const [date, setDate] = useState([
    {
      startDate: new Date(Math.floor(today.getTime() / 100000) * 100000),
      endDate: new Date(Math.floor(today.getTime() / 100000) * 100000),
      key: "selection",
    },
  ]);

  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    singleRoom: 0,
    doubleRoom: 0,
  });

  const navigate = useNavigate();

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const handleSearch = () => {
    navigate("/hotels", { state: { date, options } });
  };

  const handleManagePage = () => {
    navigate("/admin/room");
  };

  const { user } = useContext(AuthContext)

  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        <div className="headerList">
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faUtensils} />
            <span>Restaurant</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faDumbbell} />
            <span>Gym Fitness</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faPersonSwimming} />
            <span>Pool</span>
          </div>
        </div>
        {type !== "list" && (
          <>
            <h1 className="headerTitle">
              A lifetime of discounts? It's Genius.
            </h1>
            <p className="headerDesc">
              Get rewarded for your travels – unlock instant savings of 10% or
              more with a free account
            </p>
            <div>
              <button
                className="headerBtn"
                onClick={handleSearch}
              >Get Started !</button>
              {(user?.isAdmin) && <button
                className="headerBtn"
                onClick={handleManagePage}
              >Admin page</button>}
            </div>
            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
                >{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                  date[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                <span
                  onClick={() => setOpenOptions(!openOptions)}
                  className="headerSearchText"
                >{`${options.adult} adult · ${options.children} children · ${options.singleRoom} singleRoom · ${options.doubleRoom} doubleRoom`}</span>
                {openOptions && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Adult</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.adult <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.adult}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Children</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.children <= 0}
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.children}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Single Room</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.singleRoom <= 0}
                          className="optionCounterButton"
                          onClick={() => handleOption("singleRoom", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.singleRoom}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("singleRoom", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Double Room</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.doubleRoom <= 0}
                          className="optionCounterButton"
                          onClick={() => handleOption("doubleRoom", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.doubleRoom}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("doubleRoom", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="headerSearchItem">
                <button className="headerSearchBtn" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;

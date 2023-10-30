import "./list.css";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import React, { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";

const List = () => {
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

  const { loading, data } = useFetch("/hotel")

  const handleOption = (name, value) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: Number(value),
      };
    });
  }

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
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
          </div>
          <div className="listResult">
            {loading ? (
              <React.Fragment>
                <div className="listSkeleton">
                  <p><Skeleton width={120} height={120} circle="true" /></p>
                  <p><Skeleton count={5} /></p>
                </div>
                <div className="listSkeleton">
                  <p><Skeleton width={120} height={120} circle="true" /></p>
                  <p><Skeleton count={5} /></p>
                </div>
                <div className="listSkeleton">
                  <p><Skeleton width={120} height={120} circle="true" /></p>
                  <p><Skeleton count={5} /></p>
                </div>
                <div className="listSkeleton">
                  <p><Skeleton width={120} height={120} circle="true" /></p>
                  <p><Skeleton count={5} /></p>
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {data.map(item => (
                  <div key={item._id}>
                    <SearchItem
                      key={item._id}
                      item={item}
                      date={date}
                      options={options}
                    />
                  </div>
                ))}
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;

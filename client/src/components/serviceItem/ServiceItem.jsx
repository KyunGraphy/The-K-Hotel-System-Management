import "./serviceItem.css";
import { Card, CardContent } from '@mui/material'

const SearchItem = ({ item, date, options }) => {

  return (
    <Card className="serviceBlock">
      <CardContent sx={{ display: 'flex' }}>
        <img
          src='https://ae01.alicdn.com/kf/HTB1h1ViOrvpK1RjSZPiq6zmwXXaf/Full-HD-1080P-42-55-65-inch-ultra-slim-android-television-Smart-TV-HD-LED-2GB.jpg'
          alt=""
          className="siImg"
        />
        <div className="siDesc">
          <h1 className="siTitle">Television</h1>
          <span className="siSubtitle">Amount: 1</span>
          <span className="siFeatures">
            quis ipsum suspendisse ultrices gravida dictum fusce ut placerat orci
          </span>
          <span className="siCancelOp">Free</span>
          <span className="siCancelOpSubtitle">
            You can cancel later, so lock in this great price today!
          </span>
          {/* <div className="siServiceBtn">
            <button
              className="siCheckButton"
              onClick={null}
            >See Details</button>
            <button
              className="siRemoveButton"
              onClick={null}
            >Remove</button>
          </div> */}
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchItem;

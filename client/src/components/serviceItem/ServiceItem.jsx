import "./serviceItem.css";
import { Card, CardContent } from '@mui/material'

const ServiceItem = ({ data }) => {
  if (data.using === 0) return

  return (
    <Card
      sx={{
        width: 500,
        border: '1px solid lightgray',
        display: 'flex',
        justifyContent: 'space-between',
        gap: '2em',
      }}
    >
      <CardContent sx={{ display: 'flex', gap: '2em', padding: '1em' }}>
        <img
          src={data.img}
          alt=""
          className="siImg"
        />
        <div className="siDesc">
          <h1 className="siTitle">{data.name}</h1>
          <span className="siSubtitle">Amount: {data.using}</span>
          <span className="siFeatures">
            quis ipsum suspendisse ultrices gravida dictum fusce ut placerat orci
          </span>
          <span className="siCancelOp">Free</span>
          <span className="siCancelOpSubtitle">
            You can cancel later, so lock in this great price today!
          </span>
        </div>
      </CardContent>
    </Card >
  );
};

export default ServiceItem;

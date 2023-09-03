import Carousel from 'better-react-carousel'
import "./featured.css";
import { OVERVIEW_IMAGES } from '../../constants/Images';

const Featured = () => {
  return (
    <div className="featured">
      <Carousel cols={3} rows={1} gap={12} loop showDots={true} autoplay={4000}>
        {OVERVIEW_IMAGES.map((image, index) => (
          <Carousel.Item key={index}>
            <img
              alt=''
              width="100%"
              src={image}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Featured;

import Carousel from 'better-react-carousel'
import "./featured.css";

const Featured = () => {
  return (
    <div className="featured">
      <Carousel cols={3} rows={1} gap={12} loop>
        <Carousel.Item>
          <img
            alt=''
            width="100%"
            src="https://images.pexels.com/photos/1838554/pexels-photo-1838554.jpeg?auto=compress&cs=tinysrgb&w=600"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            alt=''
            width="100%"
            src="https://images.pexels.com/photos/2291367/pexels-photo-2291367.jpeg?auto=compress&cs=tinysrgb&w=600"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            alt=''
            width="100%"
            src="https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=600"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            alt=''
            width="100%"
            src="https://images.pexels.com/photos/3770106/pexels-photo-3770106.jpeg?auto=compress&cs=tinysrgb&w=600"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            alt=''
            width="100%"
            src="https://images.pexels.com/photos/7820308/pexels-photo-7820308.jpeg?auto=compress&cs=tinysrgb&w=600"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            alt=''
            width="100%"
            src="https://images.pexels.com/photos/2725675/pexels-photo-2725675.jpeg?auto=compress&cs=tinysrgb&w=600"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            alt=''
            width="100%"
            src="https://images.pexels.com/photos/2788792/pexels-photo-2788792.jpeg?auto=compress&cs=tinysrgb&w=600"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            alt=''
            width="100%"
            src="https://images.pexels.com/photos/1910472/pexels-photo-1910472.jpeg?auto=compress&cs=tinysrgb&w=600"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            alt=''
            width="100%"
            src="https://images.pexels.com/photos/5379219/pexels-photo-5379219.jpeg?auto=compress&cs=tinysrgb&w=600"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Featured;

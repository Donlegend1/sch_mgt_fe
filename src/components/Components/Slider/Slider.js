import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 2000, // Duration of the transition in milliseconds
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000, // Time between each slide in milliseconds
    pauseOnHover: true,
  };

  return (
    <div className="text-center">
      <Slider {...settings}>
        <div>
          <img
            style={{ height: "200px" }}
            src="/img/justice.jpg"
            alt="Justice logo"
          />
        </div>
        <div>
          <img
            style={{ height: "200px" }}
            src="/img/another-image.jpg"
            alt="Another logo"
          />
        </div>
        {/* Add more slides as needed */}
      </Slider>
    </div>
  );
};

export default ImageSlider;

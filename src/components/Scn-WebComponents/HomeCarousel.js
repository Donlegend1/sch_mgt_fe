import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomeCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
  };

  return (
    <div className="container-fluid p-0 pb-5 mb-5">
      <Slider {...settings}>
        <div
          className="carousel-item"
          style={{ minHeight: "300px" }}>
          <img
            className="position-relative w-100"
            src="/web2/img/carousel-1.jpg"
            style={{ minHeight: "300px", objectFit: "cover" }}
            alt="School Management Features"
          />
          <div className="carousel-caption d-flex align-items-center justify-content-center">
            <div
              className="p-5"
              style={{ width: "100%", maxWidth: "900px" }}>
              <h5 className="text-white text-uppercase mb-md-3">
                Complete School Management
              </h5>
              <h1 className="display-3 text-white mb-md-4">
                Streamline Your School Operations
              </h1>
              <a
                href="#"
                className="btn btn-primary py-md-2 px-md-4 font-weight-semi-bold mt-2">
                Learn More
              </a>
            </div>
          </div>
        </div>
        <div
          className="carousel-item"
          style={{ minHeight: "300px" }}>
          <img
            className="position-relative w-100"
            src="/web2/img/carousel-2.jpg"
            style={{ minHeight: "300px", objectFit: "cover" }}
            alt="Student and Staff Management"
          />
          <div className="carousel-caption d-flex align-items-center justify-content-center">
            <div
              className="p-5"
              style={{ width: "100%", maxWidth: "900px" }}>
              <h5 className="text-white text-uppercase mb-md-3">
                Student & Staff Management
              </h5>
              <h1 className="display-3 text-white mb-md-4">
                Effortlessly Register and Manage Your School Community
              </h1>
              <a
                href="#"
                className="btn btn-primary py-md-2 px-md-4 font-weight-semi-bold mt-2">
                Learn More
              </a>
            </div>
          </div>
        </div>
        <div
          className="carousel-item"
          style={{ minHeight: "300px" }}>
          <img
            className="position-relative w-100"
            src="/web2/img/carousel-3.jpg"
            style={{ minHeight: "300px", objectFit: "cover" }}
            alt="Parent Access and Bus Tracking"
          />
          <div className="carousel-caption d-flex align-items-center justify-content-center">
            <div
              className="p-5"
              style={{ width: "100%", maxWidth: "900px" }}>
              <h5 className="text-white text-uppercase mb-md-3">
                Parental Access & Bus Tracking
              </h5>
              <h1 className="display-3 text-white mb-md-4">
                Stay Connected with Your Child's Progress
              </h1>
              <a
                href="#"
                className="btn btn-primary py-md-2 px-md-4 font-weight-semi-bold mt-2">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default HomeCarousel;

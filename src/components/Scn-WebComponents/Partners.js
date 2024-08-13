import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

const Clients = () => {
  return (
    <div className="container-fluid py-5">
      <div className="container pt-5 pb-3">
        <div className="text-center mb-5">
          <h5
            className="text-primary text-uppercase mb-3"
            style={{ letterSpacing: "5px" }}>
            Schools
          </h5>
          <h1>Top Schools Using Our Application</h1>
        </div>
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          loop={true}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper">
          <SwiperSlide>
            <div className="school-item position-relative overflow-hidden rounded mb-2">
              <img
                className="img-fluid"
                src="/web2/img/blog-2.jpg"
                alt="School 1"
              />
              <a
                className="school-overlay text-decoration-none"
                href="#">
                <h5 className="text-white mb-3">
                  Greenfield International School
                </h5>
                <p className="text-primary m-0">
                  Top-notch education with innovative learning techniques.
                </p>
              </a>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="school-item position-relative overflow-hidden rounded mb-2">
              <img
                className="img-fluid"
                src="/web2/img/blog-2.jpg"
                alt="School 2"
              />
              <a
                className="school-overlay text-decoration-none"
                href="#">
                <h5 className="text-white mb-3">Bright Future Academy</h5>
                <p className="text-primary m-0">
                  Empowering students to excel academically and socially.
                </p>
              </a>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="school-item position-relative overflow-hidden rounded mb-2">
              <img
                className="img-fluid"
                src="/web2/img/blog-2.jpg"
                alt="School 3"
              />
              <a
                className="school-overlay text-decoration-none"
                href="#">
                <h5 className="text-white mb-3">Harmony High School</h5>
                <p className="text-primary m-0">
                  Nurturing talents and fostering excellence.
                </p>
              </a>
            </div>
          </SwiperSlide>
          {/* Add more SwiperSlide components for additional schools */}
        </Swiper>
      </div>
    </div>
  );
};

export default Clients;

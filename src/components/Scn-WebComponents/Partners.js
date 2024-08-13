import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

const Clients = () => {
  return (
    <div className="container-fluid py-5">
      <div className="container py-5">
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
            <div className="rounded overflow-hidden mb-2">
              <img
                className="img-fluid"
                src="/web2/img/course-1.jpg"
                alt="Course 1"
              />
              <div className="bg-secondary p-4">
                <div className="d-flex justify-content-between mb-3">
                  <small className="m-0">
                    <i className="fa fa-users text-primary mr-2" />
                    25 Students
                  </small>
                  
                </div>
                <a
                  className="h5"
                  href="#">
                  Greenfield International School
                </a>
                <div className="border-top mt-4 pt-4">
                  <div className="d-flex justify-content-between">
                    <h6 className="m-0">
                      <i className="fa fa-star text-primary mr-2" />
                      4.5
                    </h6>
                   
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="rounded overflow-hidden mb-2">
              <img
                className="img-fluid"
                src="/web2/img/course-2.jpg"
                alt="Course 2"
              />
              <div className="bg-secondary p-4">
                <div className="d-flex justify-content-between mb-3">
                  <small className="m-0">
                    <i className="fa fa-users text-primary mr-2" />
                    25 Students
                  </small>
                 
                </div>
                <a
                  className="h5"
                  href="#">
                  Bright Future Academy
                </a>
                <div className="border-top mt-4 pt-4">
                  <div className="d-flex justify-content-between">
                    <h6 className="m-0">
                      <i className="fa fa-star text-primary mr-2" />
                      4.5 
                    </h6>
                    
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="rounded overflow-hidden mb-2">
              <img
                className="img-fluid"
                src="/web2/img/course-3.jpg"
                alt="Course 3"
              />
              <div className="bg-secondary p-4">
                <div className="d-flex justify-content-between mb-3">
                  <small className="m-0">
                    <i className="fa fa-users text-primary mr-2" />
                    30 Students
                  </small>
              
                </div>
                <a
                  className="h5"
                  href="#">
                  Harmony High School
                </a>
                <div className="border-top mt-4 pt-4">
                  <div className="d-flex justify-content-between">
                    <h6 className="m-0">
                      <i className="fa fa-star text-primary mr-2" />
                      4.8 
                    </h6>
                    
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="rounded overflow-hidden mb-2">
              <img
                className="img-fluid"
                src="/web2/img/course-3.jpg"
                alt="Course 3"
              />
              <div className="bg-secondary p-4">
                <div className="d-flex justify-content-between mb-3">
                  <small className="m-0">
                    <i className="fa fa-users text-primary mr-2" />
                    30 Students
                  </small>
                 
                </div>
                <a
                  className="h5"
                  href="#">
                  Harmony High School
                </a>
                <div className="border-top mt-4 pt-4">
                  <div className="d-flex justify-content-between">
                    <h6 className="m-0">
                      <i className="fa fa-star text-primary mr-2" />
                      4.8 
                    </h6>
                    
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="rounded overflow-hidden mb-2">
              <img
                className="img-fluid"
                src="/web2/img/course-3.jpg"
                alt="Course 3"
              />
              <div className="bg-secondary p-4">
                <div className="d-flex justify-content-between mb-3">
                  <small className="m-0">
                    <i className="fa fa-users text-primary mr-2" />
                    30 Students
                  </small>
                 
                </div>
                <a
                  className="h5"
                  href="#">
                  Harmony High School
                </a>
                <div className="border-top mt-4 pt-4">
                  <div className="d-flex justify-content-between">
                    <h6 className="m-0">
                      <i className="fa fa-star text-primary mr-2" />
                      4.8 
                    </h6>
                   
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Clients;

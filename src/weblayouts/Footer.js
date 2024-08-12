import React from "react";
import { Breadcrumb, Card, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";


const Footer = () => {
  const year = new Date();
  const curYear = year.getFullYear();
  return (
    <>
      <div>
        <div
          className="container-fluid bg-dark text-white py-5 px-sm-3 px-lg-5"
          style={{ "margin-top": "90px" }}>
          <div className="row pt-5">
            <div className="col-lg-7 col-md-12">
              <div className="row">
                <div className="col-md-6 mb-5">
                  <h5
                    className="text-primary text-uppercase mb-4"
                    style={{ "letter-spacing": "5px" }}>
                    Get In Touch
                  </h5>
                  <p>
                    <i className="fa fa-map-marker-alt mr-2" />
                    Phase IV, Nyanya Abuja, Nigeria
                  </p>
                  <p>
                    <i className="fa fa-phone-alt mr-2" />
                    +2348147122184
                  </p>
                  <p>
                    <i className="fa fa-envelope mr-2" />
                    Legendosaconsultants@gmail.com
                  </p>
                  <div className="d-flex justify-content-start mt-4">
                    <a
                      className="btn btn-outline-light btn-square mr-2"
                      href="#">
                      <i className="fa fa-twitter" />
                    </a>
                    <a
                      className="btn btn-outline-light btn-square mr-2"
                      href="#">
                      <i className="fa fa-facebook-f" />
                    </a>
                    <a
                      className="btn btn-outline-light btn-square mr-2"
                      href="#">
                      <i className="fa fa-linkedin" />
                    </a>
                    <a
                      className="btn btn-outline-light btn-square"
                      href="#">
                      <i className="fa fa-instagram" />
                    </a>
                  </div>
                </div>
                <div className="col-md-6 mb-5">
                  <h5
                    className="text-primary text-uppercase mb-4"
                    style={{ "letter-spacing": "5px" }}>
                    Our Services
                  </h5>
                  <div className="d-flex flex-column justify-content-start">
                    <a
                      className="text-white mb-2"
                      href="#">
                      <i className="fa fa-angle-right mr-2" />
                      Digital School Management
                    </a>
                    <a
                      className="text-white mb-2"
                      href="#">
                      <i className="fa fa-angle-right mr-2" />
                      Result Checker
                    </a>
                    <a
                      className="text-white mb-2"
                      href="#">
                      <i className="fa fa-angle-right mr-2" />
                      Track Student Progress
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-md-12 mb-5">
              <h5
                className="text-primary text-uppercase mb-4"
                style={{ "letter-spacing": "5px" }}>
                Newsletter
              </h5>
              <p>To recieve updates from us pls sign up with your email</p>
              <div className="w-100">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control border-light"
                    style={{ padding: "30px" }}
                    placeholder="Your Email Address"
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-primary px-4"
                      // style={{ color: "white", backgroundColor: "#FF6600" }}
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="container-fluid bg-dark text-white border-top py-4 px-sm-3 px-md-5"
          // style={{ "border-color": "rgba(256, 256, 256, .1) !important" }}
        >
          <div className="row">
            <div className="col-lg-6 text-center text-md-left mb-3 mb-md-0">
              <p className="m-0 text-white">
                © <a href="#">Eazischool.com</a>. All Rights Reserved. Designed
                by{" "}
                <a href="https://legendosaconsultants.vercel.app/" target="blank">
                 Legend OSA Consultants
                </a>
              </p>
            </div>
            <div className="col-lg-6 text-center text-md-right">
              <ul className="nav d-inline-flex">
                <li className="nav-item">
                  <a
                    className="nav-link text-white py-0"
                    href="#">
                    Privacy
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link text-white py-0"
                    href="#">
                    Terms
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link text-white py-0"
                    href="#">
                    FAQs
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link text-white py-0"
                    href="#">
                    Help
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;

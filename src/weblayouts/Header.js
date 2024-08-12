import React, { useState } from "react";
import { Breadcrumb, Card, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  const [open, setOpen] = useState(false);
  const toggleNav = () => {
    setOpen(!open);
  };

  return (
    <>
      <div>
        {/* Topbar Start */}
        <div className="container-fluid d-none d-lg-block">
          <div className="row align-items-center py-4 px-xl-5">
            <div className="col-lg-3">
              <a
                href="/"
                className="text-decoration-none">
                <h1 className="m-0">
                  <span className="text-primary">Eazi</span>School
                </h1>
              </a>
            </div>
            <div className="col-lg-3 text-right">
              <div className="d-inline-flex align-items-center">
                <i className="fa fa-2x fa-map-marker-alt text-primary mr-3" />
                <div className="text-left">
                  <h6 className="font-weight-semi-bold mb-1">Our Office</h6>
                  <small>Phase IV, Nyanya Abuja, Nigeria</small>
                </div>
              </div>
            </div>
            <div className="col-lg-3 text-right">
              <div className="d-inline-flex align-items-center">
                <i className="fa fa-2x fa-envelope text-primary mr-3" />
                <div className="text-left">
                  <h6 className="font-weight-semi-bold mb-1">Email Us</h6>
                  <small>Legendosaconsultants@gmail.com</small>
                </div>
              </div>
            </div>
            <div className="col-lg-3 text-right">
              <div className="d-inline-flex align-items-center">
                <i className="fa fa-2x fa-phone text-primary mr-3" />
                <div className="text-left">
                  <h6 className="font-weight-semi-bold mb-1">Call Us</h6>
                  <small>+2348147122184</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Topbar End */}

        {/* Navbar Start */}
        <div className="container-fluid ">
          <div className="row border-top px-xl-5 ">
            <div className="col-lg-3 d-none d-lg-block">
              <img
                src="/web2/img/eazischhool1.png"
                alt="logo"
                style={{ width: "200px" }}
              />
            </div>
            <div className="col-lg-9">
              <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
                <a
                  href="/"
                  className="text-decoration-none d-block d-lg-none">
                  <h1 className="m-0">
                    <span className="text-primary">Eazi</span>School
                  </h1>
                </a>
                <button
                  type="button"
                  className="navbar-toggler"
                  onClick={toggleNav}>
                  <span className="navbar-toggler-icon" />
                </button>
                <div
                  className={`collapse navbar-collapse ${open ? "show" : ""}`}
                  id="navbarCollapse">
                  <div className="navbar-nav py-0 flex-column flex-lg-row">
                    <a
                      href="index.html"
                      className="nav-item nav-link active">
                      Home
                    </a>
                    <a
                      href="about.html"
                      className="nav-item nav-link">
                      About
                    </a>

                    <div className="nav-item dropdown">
                      <a
                        href="#"
                        className="nav-link dropdown-toggle"
                        data-toggle="dropdown">
                        Self Service
                      </a>
                      <div className="dropdown-menu rounded-0 m-0">
                        <a
                          href="blog.html"
                          className="dropdown-item">
                          Check Result
                        </a>
                      </div>
                    </div>

                    <a
                      href="/register"
                      className="nav-item nav-link d-block d-sm-none">
                      Sign Up
                    </a>
                    <a
                      href="/login"
                      className="nav-item nav-link  d-block d-sm-none">
                      Sign In
                    </a>
                    <a
                      href="/contact"
                      className="nav-item nav-link">
                      Contact
                    </a>
                  </div>
                  <a
                    className="btn btn-primary py-2 px-4 ml-auto d-none d-lg-block"
                    href="/register">
                    Sign Up
                  </a>
                  <a
                    className="btn btn-primary py-2 px-4 ml-1 d-none d-lg-block"
                    href="/login">
                    Sign In
                  </a>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;

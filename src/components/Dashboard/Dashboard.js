import React, { useState, useEffect, useContext } from "react";
import CountUp from "react-countup";
import ReactApexChart from "react-apexcharts";
import { Breadcrumb, Col, Row, Card, Carousel } from "react-bootstrap";
import * as dashboard from "../../data/dashboard/dashboard";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../context/Context.js";
import endpoint from "../../context/endpoint";


// import { useAuthDispatch, logout, useAuthState } from '../../context'

export default function Dashboard() {
  const [pending, setPending] = useState("");
  const [enrolled, setEnrolled] = useState("");
 
  const [decline, setDecline] = useState("");

  const [enrollmentNo, setEnrollmentNo] = useState("");
  const { user } = useContext(Context);

  useEffect(() => {
    getPending();
    getEnrolled();
    getEnrollmentNo();
    getDecline();
  }, []);

  const getPending = async () => {
    await endpoint
      .get(`/enrollment/count-pending`)
      .then(({ data }) => setPending(data.data.total));
  };


  const getEnrolled = async () => {
    await endpoint
      .get(`/enrollment/count-approved-enrolled`)
      .then(({ data }) => setEnrolled(data.data.total));
  };
  const getDecline = async () => {
    await endpoint.get(`/enrollment/count-declined`).then(({ data }) => {
      console.log("declined data", data.data.total);
      setDecline(data.data.total);
    });
  };

  const getEnrollmentNo = async () => {
    await endpoint
      .get(`/enrollment/enrollment-number`)
      .then(({ data }) => setEnrollmentNo(data.data));
  };


  return (
    <div>
      <Row>
        <Col
          lg={12}
          md={12}
          sm={12}
          xl={12}>
          <h4
            className="text-center"
            style={{
              fontWeight: "bold",
              fontFamily: "comic sans serif",
              fontSize: "25px",
              color: "#05A850",
            }}>
            {" "}
            SCHOOL MANAGEMENT SYSTEM
          </h4>
        </Col>
      </Row>
      <Row>
        <Col
          lg={12}
          md={12}
          sm={12}
          xl={12}>
          {/* <h5 className=""><strong>Welcome <em>{user.user ? user.user.fullname : ''}</em></strong></h5> */}
        </Col>
      </Row>
      <Row>
        <Col
          sm={12}
          md={6}
          lg={4}
          xl={4}>
          <Card className="card bg-primary img-card box-primary-shadow">
            <Card.Body className="">
              <div className="d-flex">
                {/* <div className="text-white">
                  <h2 className="mb-0 number-font">83</h2>
                  <p className="text-white mb-0">Closed Cases</p>
                </div> */}
                <div>
                  {pending !== null ? (
                    <div className="text-white">
                      <h2 className="mb-0 number-font text-white">{pending}</h2>
                      <p className="text-white mb-0">Total Schools </p>
                    </div>
                  ) : (
                    <p className="text-white">Loading...</p>
                  )}
                </div>
                <div className="ms-auto">
                  <i className="fa fa-home text-white fs-30 me-2 mt-2"></i>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col
          sm={12}
          md={6}
          lg={4}
          xl={4}>
          <Card className="card bg-secondary img-card box-secondary-shadow">
            <Card.Body className="">
              <div className="d-flex">
                {/* <div className="text-white">
                  <h2 className="mb-0 number-font">83</h2>
                  <p className="text-white mb-0">Closed Cases</p>
                </div> */}
                <div>
                  {decline !== null ? (
                  <div className="text-white">
                    <h2 className="mb-0 number-font text-white">{decline}</h2>
                    <p className="text-white mb-0">
                      Total Students
                    </p>
                  </div>
                 ) : (
                    <p className="text-white">Loading...</p>
                  )} 
                </div>
                <div className="ms-auto">
                  <i className="fa fa-users text-white fs-30 me-2 mt-2"></i>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col
          sm={12}
          md={6}
          lg={4}
          xl={4}>
          <Card className="card  bg-success img-card box-success-shadow">
            <Card.Body className="">
              <div className="d-flex">
                {/* <div className="text-white">
                  <h2 className="mb-0 number-font">28</h2>
                  <p className="text-white mb-0">Council/Legal Officers</p>
                </div> */}
                <div>
                  {enrolled !== null ? (
                    <div className="text-white">
                      <h2 className="mb-0 number-font text-white">
                        {enrolled}
                      </h2>
                      <p className="text-white mb-0">Total Staffs</p>
                    </div>
                  ) : (
                    <p className="text-white">Loading...</p>
                  )}
                </div>
                <div className="ms-auto">
                  <i className="fa fa-users text-white fs-30 me-2 mt-2"></i>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <Card>
            <Card.Header className="card-header">
              <h3 className="card-title"> Enrollment Applications </h3>
            </Card.Header>
            <Card.Body className="card-body pb-0">
              <div
                id="chartArea"
                className="chart-donut">
                <ReactApexChart
                  options={dashboard.totalTransactions.options}
                  series={dashboard.totalTransactions.series}
                  type="area"
                  height={300}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

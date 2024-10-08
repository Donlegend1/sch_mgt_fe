import React from "react";
import CountUp from "react-countup";
import ReactApexChart from "react-apexcharts";
import { Breadcrumb, Col, Row, Card } from "react-bootstrap";

import * as changename from "../../../data/changeOfName/getChangeOfName";
import { Link, useNavigate } from "react-router-dom";
// import { useAuthDispatch, logout, useAuthState } from '../../context'


export default function GetChangeOfName() {

  return (
    <div>
      {/* <div className="page-header ">
        <div>
          <h1 className="page-title">Enrollment Management</h1>
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item" href="#">
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="breadcrumb-item active breadcrumds"
              aria-current="page"
            >
              Get Enrollment
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>

      </div> */}


      <Row>
        <Col sm={12} className="col-12">
          <Card>
            <Card.Header>
              <h3 className="card-title mb-0">Change of Name Request</h3>
            </Card.Header>
            <Card.Body>
              <div className="">
                <div className="">
                  <changename.GetChangeOfName />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
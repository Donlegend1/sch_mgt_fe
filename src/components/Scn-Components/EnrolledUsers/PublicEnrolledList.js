import React from "react";
import CountUp from "react-countup";
import ReactApexChart from "react-apexcharts";
import { Breadcrumb, Col, Row, Card } from "react-bootstrap";

import * as enrolled from "../../../data/enrollment/PublicEnrolledListData";
import { Link, useNavigate } from "react-router-dom";
// import { useAuthDispatch, logout, useAuthState } from '../../context'


export default function PublicEnrolledList() {

  return (
    <div>
      <Row>
        <Col sm={12} className="col-12">
          <Card>
            <Card.Header>
              <h3 className="card-title mb-0">ALL ENROLLED LAWYERS</h3>
            </Card.Header>
            <Card.Body>
              <div className="">
                <div className="">
                  <enrolled.PublicEnrolledListData />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
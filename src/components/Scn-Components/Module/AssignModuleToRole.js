import React from "react";
import CountUp from "react-countup";
import ReactApexChart from "react-apexcharts";
import { Breadcrumb, Col, Row, Card } from "react-bootstrap";
import * as module from "../../../data/module/assignModuleToRole";

export default function AssignModuleToRole() {

  return (
    <div>
      {/* <div className="page-header ">
        <div>
          <h1 className="page-title">    Role Management </h1>
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item" href="#">
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="breadcrumb-item active breadcrumds"
              aria-current="page"
            >
              Assign Module To Role
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>

      </div> */}


      <Row>
        <Col sm={12} className="col-12">
          <Card>
            <Card.Header>
              <h3 className="card-title mb-0">  Assign Module To Role</h3>
            </Card.Header>
            <Card.Body>
              <div className="">
                <div className="">
                  <module.AssignModuleToRole />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
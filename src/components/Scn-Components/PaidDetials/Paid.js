import React from "react";
import { useState, useContext, useEffect, useRef } from "react";
import {
  Card,
  Row,
  Col,
  Modal,
  Button,
  Form,
  FormGroup,
  Badge,
} from "react-bootstrap";
import endpoint from "../../../context/endpoint";
import { ErrorAlert, SuccessAlert } from "../../../data/Toast/toast";
import { useParams } from "react-router-dom";
import { GraduandListData } from "../../../data/EnrollDetails/Paid";

const PaidEnroll = () => {
  const { volume_no } = useParams();

  return (
    <div>
      <Row>
        <Col
          sm={12}
          className="col-12">
          <Card>
            <Card.Header>
              <h3 className="card-title mb-0"> List of Graduand that have paid</h3>
            </Card.Header>
            <Card.Body>
              <div className="">
                <div className="">
                  <h4 className="text-center">
                    {" "}
                    <span className="fa fa-list"></span> Graduands that have made Payments
                  </h4>
                  <GraduandListData />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PaidEnroll;

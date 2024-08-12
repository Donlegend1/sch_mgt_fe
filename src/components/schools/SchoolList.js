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
import endpoint from "../../context/endpoint";
import { ErrorAlert, SuccessAlert } from "../../data/Toast/toast";
import { useParams } from "react-router-dom";
import { TemEnrollData } from "../../data/TemEnroll/TemEnroll";
import Loader from "../../data/Loader/loader";

const SchoolList = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [temList, setTemList] = useState([]);
  const [details, setDetails] = useState({
    volume_no: "",
  });

  useEffect(() => {
    getTemEnrolledList();
  }, []);

  //get year of graduation
  const getTemEnrolledList = async () => {
    try {
      const res = await endpoint.get("temp/user/list");
      console.log("temp", res.data.data);
      setTemList(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div>
        <Row>
          <Col
            sm={12}
            className="col-12">
            <Card>
              <Card.Header>
                <h3 className="card-title mb-0"> Change of Details History</h3>
              </Card.Header>
              <Card.Body>
                {loading && <Loader />}
                {!loading && (
                  <div className="">
                    {/* <h3 className='text-center'> <span className='fa fa-list'></span> Enrollment Report, Volume {details.volume_no && details.volume_no}</h3> */}
                    <TemEnrollData data={temList} />
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default SchoolList;

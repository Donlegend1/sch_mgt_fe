import React from "react";
import { useState, useContext, useEffect, useRef } from "react";
import { Card, Row, Col, Modal, Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import endpoint from "../../context/endpoint";
import { Context } from "../../context/Context";
import moment from "moment";
import { ErrorAlert, SuccessAlert } from "../Toast/toast";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Loader from "../Loader/loader";
import { log } from "nvd3";
import { Link, useParams, useNavigate } from "react-router-dom";
import PassportCard from "../../components/Scn-Components/PassportCard";

export const GetSingleEnrollment = () => {
  const [data, setData] = useState({});
  const params = useParams();
  const navigate = useNavigate();
  const [deleteOpen, setDeleteOpen] = useState(false);
  useEffect(() => {
    getSingleEnrollement();
  }, []);

  const onDelete = () => {
    setDeleteOpen(true);
  };

  const getSingleEnrollement = async () => {
    console.log("id", params.id);
    await endpoint
      .get(`/enrollment/show/${params.id}`)
      .then((res) => {
        console.log("single enrollment", res.data.data);
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
  };
  const handleDelete = async (e) => {
    // console.log("title2 to delete", idToDelete)
    e.preventDefault();
    await endpoint
      .delete(`/enrollment/delete/${params.id}`)
      .then((res) => {
        console.log(res.data);
        SuccessAlert(res.data.message);
        setDeleteOpen(false);
        navigate(`${process.env.PUBLIC_URL}/enrolled-list`);
      })
      .catch((err) => {
        ErrorAlert(err.response.data.message);
        console.log(err);
      });
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);

    // Convert day to include the appropriate suffix (e.g., 1st, 2nd, 3rd, 4th, etc.)
    const day = date.getDate();
    const suffix = getDaySuffix(day);
    return formattedDate.replace(/\b\d{1,2}\b/, `${day}${suffix}`);
  };

  const getDaySuffix = (day) => {
    if (day >= 11 && day <= 13) {
      return "th";
    }
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };
  return (
    <>
      <div>
        <Col
          xl={12}
          md={12}>
          <Card className="card border">
            <Card.Body>
              <PassportCard
                image={process.env.REACT_APP_UPLOAD_URL + data.passport_url}
              />

              <p className="mt-5">
                <strong className="text-bold m-3">TITLE:</strong>
                <strong>{data.Title ? data.Title.name : ""}</strong>
              </p>
              <p className="mt-3">
                <strong className="text-bold m-3">GENDER:</strong>
                <strong>{data.gender}</strong>
              </p>
              <p className="mt-3">
                <strong className="text-bold m-3">NAME:</strong>
                <strong>
                  {data.surname +
                    " " +
                    data.first_name +
                    " " +
                    data.middle_name}
                </strong>
              </p>
              <p className="mt-3">
                <strong className="text-bold m-3">NATIONALITY:</strong>
                <strong>{data.Country ? data.Country.name : ""}</strong>
              </p>
              <p className="mt-3">
                <strong className="text-bold m-3">STATE OF ORIGIN:</strong>
                <strong>{data.State ? data.State.name : ""}</strong>
              </p>
              <p className="mt-3">
                <strong className="text-bold m-3">LOCAL GOVERNMENT:</strong>
                <strong>{data.Lga ? data.Lga.name : ""}</strong>
              </p>
              <p className="mt-3">
                <strong className="text-bold m-3">DATE OF BIRTH:</strong>
                <strong>{formatDate(data.date_of_birth)}</strong>
              </p>
              <p className="mt-3">
                <strong className="text-bold m-3">UNIVERSITY ATTENDED:</strong>
                <strong>{data.university_attended}</strong>
              </p>
              <p className="mt-3">
                <strong className="text-bold m-3">
                  LAW SCHOOL CAMPUS ATTENDED:
                </strong>
                <strong>{data.law_sch_camp_attended}</strong>
              </p>
              <p className="mt-3">
                <strong className="text-bold m-3">
                  YEAR OF ADMISSION TO LAW SCHOOL:
                </strong>
                <strong>{data.year_of_admission_law_sch}</strong>
              </p>
              <p className="mt-3">
                <strong className="text-bold m-3">YEAR OF CALL TO BAR:</strong>
                <strong>{data.year_of_call_to_bar}</strong>
              </p>
              <p className="mt-3">
                <strong className="text-bold m-3">
                  PERMANENT HOME ADDRESS:
                </strong>
                <strong>{data.permanent_home_address}</strong>
              </p>
              <p className="mt-3">
                <strong className="text-bold m-3">PHONE NUMBER:</strong>
                <strong>{data.phone_number}</strong>
              </p>
              <p className="mt-3">
                <strong className="text-bold m-3">EMAIL ADDRESS:</strong>
                <strong>{data.email}</strong>
              </p>
              <p className="mt-3">
                <strong className="text-bold m-3">Signature</strong>
              </p>
            </Card.Body>
          </Card>
        </Col>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <Link
              to={`${process.env.PUBLIC_URL}/enrolled-user/edit/${params.id}`}
              className="btn btn-primary">
              Edit Record
            </Link>
            <Link
              to="#"
              className="btn btn-danger"
              onClick={(e) => {
                onDelete();
              }}>
              Delete Record
            </Link>
          </div>
        </div>

        <Modal show={deleteOpen}>
          <Modal.Header>
            <Button
              onClick={() => setDeleteOpen(false)}
              className="btn-close"
              variant="">
              x
            </Button>
          </Modal.Header>

          <Modal.Body>
            <div>
              <Card>
                <Card.Header>
                  <Card.Title as="h3">Delete Enrolled User</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Col
                    lg={12}
                    md={12}>
                    Please confirm you are about to delete{" "}
                    {data.surname +
                      " " +
                      data.middle_name +
                      " " +
                      data.first_name}
                    ?
                  </Col>
                </Card.Body>
              </Card>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="warning"
              className="me-1"
              onClick={() => setDeleteOpen(false)}>
              Close
            </Button>
            <Button
              variant="danger"
              className="me-1"
              onClick={(e) => handleDelete(e, params.id)}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

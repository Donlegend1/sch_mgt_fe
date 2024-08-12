import React, { useState, useEffect } from "react";
import { Breadcrumb, Col, Row, Card, FormGroup, Button } from "react-bootstrap";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";
import { Link, useNavigate } from "react-router-dom";
import {
  CForm,
  CCol,
  CFormLabel,
  CFormFeedback,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CButton,
  CFormCheck,
} from "@coreui/react";
import * as formvalidation from "../../../data/Form/formvalidations/formvalidations";
import endpoint from "../../../context/endpoint";
import { useForm } from "react-hook-form";
import { ErrorAlert, SuccessAlert } from "../../../data/Toast/toast";

export default function CreateUser() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [roles, setUserRoles] = useState([]);

  useEffect(() => {
    getUserRole();
  }, []);

  const genderList = [
    { id: 1, value: "male", label: "Male" },
    { id: 2, value: "female", label: "Female" },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const getUserRole = async () => {
    await endpoint
      .get("/role/getRoles")
      .then((res) => {
        console.log("res", res.data.data)
        setUserRoles(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCreateUser = async (data) => {
    setLoading(true);
    await endpoint
      .post("/user/create", data)
      .then((res) => {
        console.log(res.data.message);
        navigate(`${process.env.PUBLIC_URL}/users`);
        SuccessAlert(res.data.message);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.response.data.message);
        ErrorAlert(err.response.data.message);
      });

    console.log("user data", data);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">New Appointment</h1>
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item
              className="breadcrumb-item"
              href="#">
              Registry
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="breadcrumb-item active breadcrumds"
              aria-current="page">
              New User
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="ms-auto pageheader-btn">
          <Link
            to={`${process.env.PUBLIC_URL}/users`}
            className="btn btn-primary btn-icon text-white me-3">
            <span>
              <i className="fe fe-eye"></i>&nbsp;
            </span>
            Users List
          </Link>
        </div>
      </div>

      <Row>
        <Col
          md={12}
          lg={12}>
          <Card>
            <Card.Header>
              <Col className="card-title text-center">
                <span> Enter Staff Credentials </span>
                <span className="fe fe-user"></span>
              </Col>
            </Card.Header>

            <Card.Body>
              {/* <formvalidation.CustomValidation /> */}
              <CForm
                onSubmit={handleSubmit(handleCreateUser)}
                className="row g-3 needs-validation">
                <CCol md={12}>
                  <CFormLabel htmlFor="validationCustom02">
                    Full Name
                  </CFormLabel>
                  <CFormInput
                    type="text"
                    required
                    name="fullname"
                    {...register("fullname")}
                  />
                </CCol>

                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom02">Email.</CFormLabel>
                  <CFormInput
                    type="text"
                    name="email"
                    {...register("email")}
                  />
                </CCol>

                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom02">
                    Password.
                  </CFormLabel>
                  <CFormInput
                    type="text"
                    name="password"
                    {...register("password")}
                  />
                </CCol>

                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustomUsername">
                    User Type
                  </CFormLabel>

                  <select
                    className="form-control"
                    {...register("role_id", {
                      required: "Please select urole",
                    })}>
                    <option value=""> Select... </option>
                    {roles.map((role) => (
                      <option
                        key={role.id}
                        value={role.id}>
                        {role.role_name}
                      </option>
                    ))}
                  </select>
                </CCol>

                <CCol
                  xs={12}
                  className="text-center">
                  <CButton
                    color="primary"
                    type="submit"
                    className={isLoading ? "btn-loading" : "btn-primary"}>
                    <span className="fe fe-plus"></span>
                    {isLoading ? "" : "Save"}
                  </CButton>
                </CCol>
              </CForm>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

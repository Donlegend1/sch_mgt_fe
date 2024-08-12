import React, { useState, useEffect, useRef } from "react";
import { Breadcrumb, Col, Row, Card, FormGroup, Button } from "react-bootstrap";
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
  CFormTextarea,
} from "@coreui/react";
import endpoint from "../../context/endpoint";
import { useForm } from "react-hook-form";
import { ErrorAlert, SuccessAlert } from "../../data/Toast/toast";
import PassportCard from "../Scn-Components/PassportCard";
import "./styles.css";

export default function CreateUser() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [states, setStates] = useState([]);
  const [LGAs, setLGAs] = useState([]);
    const [previewImage, setPreviewImage] = useState(null);

  const [schoolDetails, setSchoolDetails] = useState({
    name: "",
    description: "",
    address: "",
    stateId: "",
    lgaId: "",
    zipcode: "",
    phone: "",
    email: "",
    logo: null,
    propietor: "",
    colorOne: "",
    colorTwo: "",
  });


  const fileInputRef = useRef(null);

  const handleDivClick = () => {
    fileInputRef.current.click();
  };
  useEffect(() => {
    getStates();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  //get all states
  const getStates = async () => {
    await endpoint
      .get("/state/showAll")
      .then((res) => {
        console.log("====================================");
        console.log(res.data.data);
        console.log("====================================");
        setStates(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getLGAs = async (id) => {
    console.log("====================================");
    console.log(id);
    console.log("====================================");
    await endpoint
      .get(`/state/get/${id}`)
      .then((res) => {
        console.log("================setLGAs====================");
        console.log(res.data.data.Lgas);
        console.log("====================================");
        setLGAs(res.data.data.Lgas);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCreateUser = async () => {
    console.log("====================================");
    console.log(schoolDetails);
    console.log("====================================");
    setLoading(true);
    await endpoint
      .post("/school/create", schoolDetails)
      .then((res) => {
        console.log(res.data.message);
        navigate(`${process.env.PUBLIC_URL}/schools`);
        SuccessAlert(res.data.message);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.response.data.message);
        ErrorAlert(err.response.data.message);
      });
  };

  //preview logo
  const getPreview = (targetFile) => {
    if (targetFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(targetFile);
    } else {
      setPreviewImage(null);
    }
  };

  return (
    <div>
      <div className="">
        <div>
          <h1 className="page-title">New School</h1>
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item
              className="breadcrumb-item"
              href="#">
              Registry
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="d-flex justify-end mb-5">
          <div className="ms-auto pageheader-btn">
            <Link
              to={`${process.env.PUBLIC_URL}/school`}
              className="btn btn-primary btn-icon text-white me-3">
              <span>
                <i className="fe fe-eye"></i>&nbsp;
              </span>
              School List
            </Link>
          </div>
        </div>
      </div>

      <Row className="customBorder justify-center">
        <Col
          md={9}
          lg={9}>
          <Card>
            <Card.Header>
              <Col className="card-title text-center">
                <span className="customText"> Enter School Details </span>
                <span className="fe fe-school"></span>
              </Col>
            </Card.Header>

            <Card.Body>
              {/* <formvalidation.CustomValidation /> */}
              <CForm
                onSubmit={handleSubmit(handleCreateUser)}
                className="row g-3 needs-validation">
                {schoolDetails ? (
                  <div className="col">
                    <label className="customText">Upload School Logo</label>{" "}
                    <br />
                    <span>
                      <strong
                        className="customText"
                        style={{
                          fontSize: "12px",
                          fontWeight: "bold",
                        }}>
                        Note
                      </strong>
                      :{" "}
                      <i
                        style={{
                          color: "black",
                          fontSize: "12px",
                          fontWeight: "bold",
                        }}>
                        Accepted file formats are .jpg, .png, .jpeg, and the
                        file size should not exceed 200KB.
                      </i>
                    </span>
                    <div className="col text-center">
                      {previewImage ? (
                        <div onClick={handleDivClick}>
                          <PassportCard image={previewImage} />
                        </div>
                      ) : schoolDetails.logo == null ? (
                        <div className="d-flex justify-content-center">
                          <div
                            className="passport-placeholder"
                            onClick={handleDivClick}>
                            Click to Select School Logo
                          </div>
                        </div>
                      ) : (
                        " "
                      )}
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={(e) => {
                        getPreview(e.target.files[0]);
                        setSchoolDetails({
                          ...schoolDetails,
                          logo: e.target.files[0],
                        });
                      }}
                    />
                  </div>
                ) : (
                  ``
                )}
                <CCol md={12}>
                  <CFormLabel
                    htmlFor="validationCustom02"
                    className="customText">
                    School Name
                  </CFormLabel>
                  <CFormInput
                    onChange={(e) => {
                      setSchoolDetails({
                        ...schoolDetails,
                        name: e.target.value,
                      });
                    }}
                    type="text"
                    name="name"
                  />
                </CCol>

                <CCol md={6}>
                  <CFormLabel
                    htmlFor="validationCustom02"
                    className="customText">
                    Propietors Name.
                  </CFormLabel>
                  <CFormInput
                    onChange={(e) => {
                      setSchoolDetails({
                        ...schoolDetails,
                        propietor: e.target.value,
                      });
                    }}
                    type="text"
                    name="propietor"
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel
                    htmlFor="validationCustom02"
                    className="customText">
                    Propietor's Contact.
                  </CFormLabel>
                  <CFormInput
                    onChange={(e) => {
                      setSchoolDetails({
                        ...schoolDetails,
                        propietor_contact: e.target.value,
                      });
                    }}
                    type="text"
                    name="propietor_contact"
                  />
                </CCol>
                <CCol md={12}>
                  <CFormLabel
                    htmlFor="validationCustom02"
                    className="customText">
                    School Decription
                  </CFormLabel>
                  <CFormTextarea
                    onChange={(e) => {
                      setSchoolDetails({
                        ...schoolDetails,
                        description: e.target.value,
                      });
                    }}
                    type="text"
                    name="description"
                  />
                </CCol>
                <CCol md={12}>
                  <CFormLabel
                    htmlFor="validationCustom02"
                    className="customText">
                    School Address
                  </CFormLabel>
                  <CFormTextarea
                    onChange={(e) => {
                      setSchoolDetails({
                        ...schoolDetails,
                        address: e.target.value,
                      });
                    }}
                    type="text"
                    name="fullname"
                  />
                </CCol>

                <CCol md={6}>
                  <CFormLabel
                    htmlFor="validationCustom02"
                    className="customText">
                    State.
                  </CFormLabel>
                  <select
                    onChange={(e) => {
                      getLGAs(e.target.value);
                      setSchoolDetails({
                        ...schoolDetails,
                        stateId: e.target.value,
                      });
                    }}
                    className="form-select"
                    name=""
                    id="">
                    <option value="">--select--</option>
                    {states.map((state, index) => (
                      <option
                        value={state.id}
                        key={state.id}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </CCol>
                <CCol md={6}>
                  <CFormLabel
                    htmlFor="validationCustom02"
                    className="customText">
                    Lga.
                  </CFormLabel>
                  <select
                    onChange={(e) => {
                      setSchoolDetails({
                        ...schoolDetails,
                        lgaId: e.target.value,
                      });
                    }}
                    className="form-select"
                    name=""
                    id="">
                    <option value="">--select--</option>
                    {LGAs &&
                      LGAs.map((lga, index) => (
                        <option
                          value={lga.id}
                          key={lga.id}>
                          {lga.lga}
                        </option>
                      ))}
                  </select>
                </CCol>
                <CCol md={4}>
                  <CFormLabel
                    htmlFor="validationCustom02"
                    className="customText">
                    School Color 1.
                  </CFormLabel>
                  <CFormInput
                    onChange={(e) => {
                      setSchoolDetails({
                        ...schoolDetails,
                        colorOne: e.target.value,
                      });
                    }}
                    type="color"
                    name="color1"
                  />
                </CCol>
                <CCol md={4}>
                  <CFormLabel
                    htmlFor="validationCustom02"
                    className="customText">
                    School Color 2.
                  </CFormLabel>
                  <CFormInput
                    onChange={(e) => {
                      setSchoolDetails({
                        ...schoolDetails,
                        colorTwo: e.target.value,
                      });
                    }}
                    type="color"
                    name="color2"
                  />
                </CCol>
                <CCol md={4}>
                  <CFormLabel
                    htmlFor="validationCustom02"
                    className="customText">
                    Zip Code
                  </CFormLabel>
                  <CFormInput
                    onChange={(e) => {
                      setSchoolDetails({
                        ...schoolDetails,
                        zipcode: e.target.value,
                      });
                    }}
                    type="text"
                    name="zipcode"
                  />
                </CCol>

                <CCol md={6}>
                  <CFormLabel
                    htmlFor="validationCustom02"
                    className="customText">
                    Email.
                  </CFormLabel>
                  <CFormInput
                    type="text"
                    name="email"
                    onChange={(e) => {
                      setSchoolDetails({
                        ...schoolDetails,
                        email: e.target.value,
                      });
                    }}
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel
                    htmlFor="validationCustom02"
                    className="customText">
                    Contact.
                  </CFormLabel>
                  <CFormInput
                    type="text"
                    name="text"
                    onChange={(e) => {
                      setSchoolDetails({
                        ...schoolDetails,
                        phone: e.target.value,
                      });
                    }}
                  />
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

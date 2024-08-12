import React, { useState, useContext, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import endpoint from "../../../context/endpoint";
import { Tabs, Tab, Breadcrumb, Card, Row, Col, Table } from "react-bootstrap";
import Loader from "../../../data/Loader/loader";
import PassportCard from "../PassportCard";
import { Context, ContextProvider } from "../../../context/Context";

export default function MyProfile() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const { user } = useContext(Context);
  const authUser = user?.user;

  console.log("=========vhbjnkml===========================");
  console.log(authUser);
  console.log("====================================");

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    setLoading(true);
    await endpoint
      .get(`/profile/show-auth-profile`)
      .then(({ data }) => {
        console.log("profile details for update", data.data);
        setData(data.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  return (
    <>
      {data ? (
        <div>
          <Col
            xl={12}
            md={12}>
            <Card className="card border">
              {loading && <Loader />}
              {!loading && (
                <Card.Body>
                  <div className="text-center">
                    {data && (
                      <PassportCard
                        image={
                          process.env.REACT_APP_UPLOAD_URL + data.passport_url
                        }
                      />
                    )}
                  </div>
                  <div className="mt-5">
                    <h4 className="text-center">Profile Information</h4>
                    <Link to={`/enrollment-status/${data.id}`}>
                      <button
                        className="btn btn-sm btn-primary"
                        variant="secondary"
                        title="Action"
                        size="sm">
                        <span className="fa fa-eye"></span>
                        View Certificate
                      </button>
                    </Link>
                    <hr className="my-4" />
                    <div className="row m-5">
                      {data && (
                        <div className="col-md-12">
                          <div className="row border">
                            <div className="fw-bold col-md-6">Name:</div>
                            <div className="col-md-6">
                              {data.Title ? data.Title.name : ""}{" "}
                              {`${data.surname} ${data.first_name} ${data.middle_name}`}
                            </div>
                          </div>

                          <div className="row border">
                            <div className="fw-bold col-md-6">Gender:</div>
                            <div
                              className="col-md-6"
                              // style={{ textAlign: `right` }}
                            >
                              {data.gender}
                            </div>
                          </div>

                          <div className="row border">
                            <div className="fw-bold col-md-6">
                              Date of Birth:
                            </div>
                            <div className="col-md-6">
                              {formatDate(data.date_of_birth)}
                            </div>
                          </div>

                          <div className="row border">
                            <div className="fw-bold col-md-6">
                              Law School Campus Attended:
                            </div>
                            <div className="col-md-6">
                              {data.law_sch_camp_attended}
                            </div>
                          </div>

                          <div className="row border">
                            <div className="fw-bold col-md-6">
                              University Attended:
                            </div>
                            <div className="col-md-6">
                              {data.university_attended}
                            </div>
                          </div>

                          {/* <div className="row border">
                      <div className="fw-bold col-md-6">
                        Year of Admission to Law School:
                      </div>
                      <div className="col-md-6">
                        {data.year_of_admission_law_sch}
                      </div>
                    </div> */}

                          <div className="row border">
                            <div className="fw-bold col-md-6">
                              Year of Call to Bar:
                            </div>
                            <div className="col-md-6">
                              {data.year_of_call_to_bar &&
                                formatDate(data.year_of_call_to_bar)}
                            </div>
                          </div>

                          <div className="row border">
                            <div className="fw-bold col-md-6">
                              Call to Bar Certificate:
                            </div>
                            <div className="col-md-6">
                              {data.call_to_bar_cert_dir && (
                                <a
                                  href={`${
                                    process.env.REACT_APP_UPLOAD_URL +
                                    data.call_to_bar_cert_dir
                                  }`}
                                  target="_blank"
                                  className="btn btn-sm btn-success m-1">
                                  <span className="fa fa-eye"></span>{" "}
                                  View/Download
                                </a>
                              )}
                            </div>
                          </div>

                          <div className="row border">
                            <div className="fw-bold col-md-6">
                              State of Origin:
                            </div>
                            <div className="col-md-6">
                              {data.State ? data.State.name : ""}
                            </div>
                          </div>

                          <div className="row border">
                            <div className="fw-bold col-md-6">
                              Permanent Home Address:
                            </div>
                            <div className="col-md-6">
                              {data.permanent_home_address}
                            </div>
                          </div>

                          <div className="row border">
                            <div className="fw-bold col-md-6">
                              Phone Number:
                            </div>
                            <div className="col-md-6">{data.phone}</div>
                          </div>

                          <div className="row border">
                            <div className="fw-bold col-md-6">
                              Email Address:
                            </div>
                            <div className="col-md-6">{data.email}</div>
                          </div>

                          <div className="row border">
                            <div className="fw-bold col-md-6">Nationality:</div>
                            <div className="col-md-6">
                              {data.Country ? data.Country.name : ""}
                            </div>
                          </div>

                          {/* <div className="row border">
                          <div className="fw-bold col-md-6">
                            Status:
                          </div>
                          <div className="col-md-6">
                            <span className="badge text-dark mt-3">
                              {data.Status ? data.Status.name : ""}
                            </span>
                          </div>
                        </div> */}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-center m-3">
                    <p className="fw-bold">Signature</p>
                    {data ? (
                      <img
                        src={
                          process.env.REACT_APP_UPLOAD_URL +
                          data.speciment_signature
                        }
                        crossOrigin="anonymous"
                        alt="Signature.."
                      />
                    ) : (
                      "Signature..."
                    )}
                  </div>
                </Card.Body>
              )}
            </Card>
          </Col>
        </div>
      ) : (
        <div className="text-center">Complete profile to view certificate</div>
      )}
    </>
  );
}

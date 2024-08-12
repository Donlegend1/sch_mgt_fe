import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import ReactApexChart from "react-apexcharts";
import { Breadcrumb, Col, Row, Card } from "react-bootstrap";
import endpoint from "../../../context/endpoint";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import "./style.css";
import PassportCard from "../PassportCard";

export default function GetEnrollment() {
  const location = useLocation();
  const params = useParams();

  const [data, setData] = useState([]);

  const getAllEnrollment = async () => {
    console.log("volume", params)
    try {
      const res = await endpoint.post(`/profile/list-profile-by-volume`, { volume_no: params.id });
      console.log("enrollment report", res.data.data);
      setData(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllEnrollment();
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    let dayStr;
    switch (day) {
      case 1:
      case 21:
      case 31:
        dayStr = day + "st";
        break;
      case 2:
      case 22:
        dayStr = day + "nd";
        break;
      case 3:
      case 23:
        dayStr = day + "rd";
        break;
      default:
        dayStr = day + "th";
    }

    return `${dayStr} day of ${month} ${year}`;
  };

  return (
    <>
      <button onClick={() => window.print()} className="btn btn-primary hideBtn">
        Print
      </button>
      
      <div className="" id="print">
        {data.map((user, index) => (
          <div key={index} className="">
            {/* <h3 className="text-center">
              {user.surname} {user.first_name} {user.middle_name}
            </h3>
            <hr /> */}
            <div className="enrollNoPrintPassport">
              <PassportCard image={process.env.REACT_APP_UPLOAD_URL+user.passport_url}/>
            </div>
            <h3 className="text-center"><strong>{user.surname ? user.surname.toUpperCase() : ""} {user.first_name ? user.first_name.toUpperCase() : ""} {user.middle_name ? user.middle_name.toUpperCase() : ""}</strong></h3>
            <div className="container enrollNoPrintSection" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ float: 'left' }}>
                <strong>Enrollment No.:</strong> {user.enrollment_number ? user.enrollment_number : ''}
              </div>
              <div style={{ textAlign: 'right', float: 'right' }}>
                <strong>Volume:</strong> {user.volume_no ? user.volume_no : ''}
              </div>
            </div>
            <hr />

            <div className="container mt-3 mainPrintSection">
              <div className="left-col">
                <div className="text-left">
                  {/* <p>
                  <strong>{user.surname ? user.surname.toUpperCase() : ""} {user.first_name ? user.first_name.toUpperCase() : ""} {user.middle_name ? user.middle_name.toUpperCase() : ""}</strong> was called to the Nigerian
                    Bar on the {formatDate(user.date_of_placement)} and is hereby placed on the role
                    of Legal Practitioners under section 6 (1) of the Legal Practitioners Act of 1975
                  </p> */}
                  <p>
                  <strong>{user.surname ? user.surname.toUpperCase() : ""} {user.first_name ? user.first_name.toUpperCase() : ""} {user.middle_name ? user.middle_name.toUpperCase() : ""}</strong> was called to the Nigerian
                    Bar and is hereby placed on the role
                    of Legal Practitioners under Section 6 (1) of the Legal Practitioners Act of 1975
                  </p>
                </div>
              </div>

              <div className="vertical-line "></div>
              <div className="right-col ">
                <div className="text-right">
                  <ul className="dotted-list">
                    <li> <div style={{flex:`left`}}>I &nbsp;<strong>{user.Registrar ? user.Registrar.surname.toUpperCase() : ""}, {user.Registrar ? user.Registrar.first_name.toUpperCase() : ""} {user.Registrar ? user.Registrar.middle_name.toUpperCase() : ""}</strong>
                      <span className="list-item"></span></div>
                    </li>
                    <li>
                      <span className="list-item"></span>
                    </li>
                    <li>
                      <span className="list-item"></span>
                    </li>
                  </ul>
                  <span className="mb-5">Chief Registrar, Supreme Court of Nigeria do enroll</span>

                  <ul className="dotted-list mt-5">
                    <li>
                      <span className="mt-3">{user.surname ? user.surname.toUpperCase() : ""} {user.first_name ? user.first_name.toUpperCase() : ""} {user.middle_name ? user.middle_name.toUpperCase() : ""}</span>
                      <span className="list-item"></span>
                    </li>
                    <li>
                      <span className="mt-3">OF {user.permanent_home_address.toUpperCase()}</span>

                      <span className="list-item"></span>
                      <span className="list-item"></span>
                    </li>
                    <li>
                      {/* <span className="mt-3"> {user.Lga && user.Lga.name.toUpperCase()} {user.State && user.State.name.toUpperCase()} STATE</span> */}

                      {/* <span className="list-item"></span> */}
                    </li>
                  </ul>
                  <span className="mb-5">to practice as a Barrister and Solicitor in the Supreme Court of Nigeria</span>
                  <br />
                  <br />
                  <div className="text-center">
                    <span className="mt-3">
                      {user.surname ? user.surname.toUpperCase() : ""}{" "}
                      {user.first_name ? user.first_name.toUpperCase() : ""}{" "}
                      {user.middle_name ? user.middle_name.toUpperCase() : ""}
                    </span>
                    <br />
                    <li style={{listStyleType: 'none'}}>
                      <img
                        style={{ width: '150px', height: '70px' }}
                        className="mt-1"
                        src={process.env.REACT_APP_UPLOAD_URL + user.speciment_signature}
                        crossOrigin="anonymous"
                        alt="Authorized Signatory..."
                      />
                    </li>
                  </div>

                  <ul className="dotted-list mt-1">
                    <li>
                      <span className="mt-3">DATED at Abuja this {formatDate(user.date_of_placement)}</span>
                      <span className="list-item"></span>
                    </li>
                  </ul>
                  <ul className="dotted-list mt-1" style={{ textAlign: "center" }}>
                    {user.Registrar ?
                      <img
                        src={process.env.REACT_APP_UPLOAD_URL + user.Registrar.signature}
                        crossOrigin="anonymous"
                        alt="Awaiting Authorization..."
                      />
                      : "Awaiting Authorization..."
                    }

                    <li>
                      <span className="list-item"></span>
                    </li>
                    <span className="list-item">
                      Chief Registrar,<br />
                      Supreme Court of Nigeria
                    </span>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

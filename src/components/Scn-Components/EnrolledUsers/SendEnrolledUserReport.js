import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import ReactApexChart from "react-apexcharts";
import { Breadcrumb, Col, Row, Card } from "react-bootstrap";
import endpoint from "../../../context/endpoint";
import { Link, useParams, useNavigate } from "react-router-dom";
import * as enrolled from "../../../data/enrollment/EnrolledUsersList";
import "./style.css";
import PassportCard from "../PassportCard";

export default function SendEnrolledUserReport() {
  const [data, setData] = useState({});
  const params = useParams();

  const getSingleEnrollment = async () => {
    console.log('id', params.id);
    try {
      const res = await endpoint.get(`/profile/show-enrollment/${params.id}`);
      console.log("single enrollment", res.data.data);
      setData(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSingleEnrollment();
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    let dayStr;
    switch (day) {
      case 1:
      case 21:
      case 31:
        dayStr = day + 'st';
        break;
      case 2:
      case 22:
        dayStr = day + 'nd';
        break;
      case 3:
      case 23:
        dayStr = day + 'rd';
        break;
      default:
        dayStr = day + 'th';
    }

    return `${dayStr} day of ${month} ${year}`;
  };

  const formattedDate = formatDate(data.date_of_placement);
  console.log(formattedDate);

  const registrarSignature = data.Registrar ? data.Registrar.signature : "";

  return (
    <>
      <div id="print">
        <div className="enrollNoPrintPassport">
          <PassportCard image={process.env.REACT_APP_UPLOAD_URL + data.passport_url} />
        </div>
        <h3 className="text-center"><strong>{data.surname ? data.surname.toUpperCase() : ""} {data.first_name ? data.first_name.toUpperCase() : ""} {data.middle_name ? data.middle_name.toUpperCase() : ""}</strong></h3>
        
        <div className="container enrollNoPrintSection" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ float: 'left' }}>
            <strong>Enrollment No.:</strong> {data.enrollment_number ? data.enrollment_number : ``}
          </div>
          <div style={{ textAlign: 'right', float: 'right' }}>
            <strong>Volume:</strong> {data.volume_no ? data.volume_no : ``}
          </div>
        </div>
        <hr />
        <div className="container mt-3 mainPrintSection">
          <div className="left-col" >
            <div className="text-left">
              {/* <div>
                <PassportCard image={process.env.REACT_APP_UPLOAD_URL+data.passport_url}/>
              </div> */}
              {/* <p style={{ textAlign: `left` }}>
                <strong>{data.surname ? data.surname.toUpperCase() : ""} {data.first_name ? data.first_name.toUpperCase() : ""} {data.middle_name ? data.middle_name.toUpperCase() : ""}</strong> was called to the Nigerian
                Bar on the {formattedDate} and is
                hereby placed on the role of Legal Practitioners
                under section 6 (1) of the Legal Practitioners Act of 1975

              </p> */}
              <p style={{ textAlign: `left` }}>
                <strong>{data.surname ? data.surname.toUpperCase() : ""} {data.first_name ? data.first_name.toUpperCase() : ""} {data.middle_name ? data.middle_name.toUpperCase() : ""}</strong> was called to the Nigerian
                Bar and is hereby placed on the role of Legal Practitioners
                under Section 6 (1) of the Legal Practitioners Act of 1975

              </p>
            </div>
          </div>

          <div className="vertical-line "></div>
          <div className="right-col">
            <div className="text-right">
              {/* <span className="mb-5">I Ogwuche Shedrack</span> */}
              <ul className="dotted-list">
                <li> <div style={{flex:`left`}}>I &nbsp;<strong>{data.Registrar ? data.Registrar.surname.toUpperCase() : ""}, {data.Registrar ? data.Registrar.first_name.toUpperCase() : ""} {data.Registrar ? data.Registrar.middle_name.toUpperCase() : ""}</strong>
                  <span className="list-item"></span></div>
                </li>
                <li>
                  <span className="list-item"></span>
                </li>
              </ul>
              <span className="mb-5">Chief Registrar, Supreme Court of Nigeria do enroll</span>

              <ul className="dotted-list mt-5">
                <li>
                  <span className="mt-3">{data.surname ? data.surname.toUpperCase() : ""} {data.first_name ? data.first_name.toUpperCase() : ""} {data.middle_name ? data.middle_name.toUpperCase() : ""}</span>
                  <span className="list-item"></span>
                </li>
                <li>
                  <span className="mt-3 a printDot">OF {data.permanent_home_address && data.permanent_home_address.toUpperCase()}</span>

                  <span className="list-item"></span>
                  <span className="list-item"></span>
                </li>
                <li>
                  {/* <span className="mt-3 a printDot"> {data.Lga && data.Lga.name.toUpperCase()} {data.State && data.State.name.toUpperCase()} STATE</span> */}

                  {/* <span className="list-item"></span> */}
                </li>
              </ul>
              <span className="mb-5">to practice as a Barrister and Solicitor in the Supreme Court of Nigeria</span>
              <br />
              <br />
              <div className="text-center">
                <span className="mt-3">{data.surname ? data.surname.toUpperCase() : ""} {data.first_name ? data.first_name.toUpperCase() : ""} {data.middle_name ? data.middle_name.toUpperCase() : ""}</span>
                <br />
                {data.speciment_signature ?
                  <img className="mt-1" style={{ width: '150px', height: '70px' }} src={process.env.REACT_APP_UPLOAD_URL + data.speciment_signature} crossOrigin="anonymous" alt="Authorized Signatory..." />
                  : ``}
              </div>

              <ul className="dotted-list mt-1">
                <li>
                  <span className="mt-1">DATED at Abuja this {formatDate(data.date_of_placement)}</span>
                  <span className="list-item"></span>
                </li>

              </ul>
              <ul className="dotted-list mt-1" style={{ textAlign: "center" }}>
                {registrarSignature ?
                  <img src={process.env.REACT_APP_UPLOAD_URL + registrarSignature} crossOrigin="anonymous" alt="Authorized Signatory..." />
                  : `Awaiting Authorization`}

                <li>
                  <span className="list-item"></span>
                </li>
                <span className="list-item">Chief Registrar,<br />Supreme Court of Nigeria</span>
              </ul>

            </div>
          </div>

        </div>
      </div>
      <div>
        <button onClick={() => window.print()} className="btn btn-primary m-2 hideBtn"> <span className="fa fa-print"></span> Print</button>

        <Link to={`${process.env.PUBLIC_URL}/to-enroll`} className="btn btn-warning hideBtn m-1">
            <i className="fa fa-list"></i> Verification List
          </Link>
        {/* <button onClick={() => window.print()} className="btn btn-warning hideBtn"> <span className="fa fa-inbox"></span> Mail to Lawyer</button> */}
      </div>
      

    </>
  );

}
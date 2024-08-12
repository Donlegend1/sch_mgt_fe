import React, { useState } from "react";
import CountUp from "react-countup";
import ReactApexChart from "react-apexcharts";
import { Breadcrumb, Col, Row, Card } from "react-bootstrap";
import * as enrolled from "../../../data/enrollment/getEnrollment";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import * as SingleEnrollment from "../../../data/enrollment/SingleEnrolledUser";


export default function GetEnrollment() {
 
  return (
    <>
     <div className=" ">
        <div>
          <h1 className="page-title text-center">Enrollmenet Details</h1>
          <Breadcrumb className="breadcrumb">
            
        
          </Breadcrumb>
        </div>

      </div>
     <SingleEnrollment.GetSingleEnrollment />
    </>
  );
}

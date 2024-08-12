import React, { useState, useEffect } from "react";
import { Card, Col, Modal, Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import endpoint from "../../../context/endpoint";
import moment from 'moment';
import { ErrorAlert, SuccessAlert } from "../../../data/Toast/toast";
import { Link, useParams, useNavigate } from "react-router-dom";
import Loader from "../../../data/Loader/loader";

const GetSingleEnrollment = () => {
  const [data, setData] = useState({});
  const [documents, setDocuments] = useState([]);
  const [remarks, setRemarks] = useState([]);


  const params = useParams();
  const navigate = useNavigate();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getSingleEnrollment();
  }, []);

  const onDelete = () => {
    setDeleteOpen(true);
  };

  const getSingleEnrollment = async () => {
    console.log('id', params.id);
    try {
      const res = await endpoint.get(`/temp/user/list/${params.id}`);
      console.log("single enrollment", res.data.data);
      setData(res.data.data);
      setDocuments(res.data.data.Documents)
      setRemarks(res.data.data.Remarks)
    } catch (err) {
      console.log(err);
    }
  };
  // const formatDate = (dateString) => {
  //   const date = new Date(dateString);
  //   const options = { day: 'numeric', month: 'long', year: 'numeric' };
  //   const formattedDate = date.toLocaleDateString('en-US', options);
  
  //   // Convert day to include the appropriate suffix (e.g., 1st, 2nd, 3rd, 4th, etc.)
  //   const day = date.getDate();
  //   const suffix = getDaySuffix(day);
  //   return formattedDate.replace(/\b\d{1,2}\b/, `${day}${suffix}`);
  // };
  
  // const getDaySuffix = (day) => {
  //   if (day >= 11 && day <= 13) {
  //     return 'th';
  //   }
  //   switch (day % 10) {
  //     case 1:
  //       return 'st';
  //     case 2:
  //       return 'nd';
  //     case 3:
  //       return 'rd';
  //     default:
  //       return 'th';
  //   }
  // };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear();
    
    return `${day}-${month}-${year}`;
  }

  return (
    <div>
      <Col xl={12} md={12}>
        <Card className="card border">
          {loading && <Loader />}
          {!loading &&
            <Card.Body>
              <div className="text-center">
               
              </div>
              <div className="mt-5">
                <h4 className="text-center">Change of Details Information</h4>
                <hr className="my-4" />
                <div className="row m-5">
                  <div className="col-md-6">
                    <div className="fw-bold border">Name:</div>
                    <div className="fw-bold border">Gender:</div>
                    <div className="fw-bold border">Local Government:</div>
                    <div className="fw-bold border">Date of Birth:</div>
                    <div className="fw-bold border">Law School Campus Attended:</div>
                    <div className="fw-bold border">University Attended:</div>
                    <div className="fw-bold border">Year of Admission to Law School:</div>
                    <div className="fw-bold border">Year of Call to Bar:</div>
                    <div className="fw-bold border">State of Origin:</div>
                    <div className="fw-bold border">Permanent Home Address:</div>
                    <div className="fw-bold border">Phone Number:</div>
                    <div className="fw-bold border">Email Address:</div>
                    <div className="fw-bold border">Nationality:</div>
                    <div className="fw-bold border">Status:</div>
                  </div>
                  <div className="col-md-6">
                    <div className="border">
                      {data.Title ? data.Title.name : ""} {`${data.surname} ${data.first_name} ${data.middle_name}`}
                    </div>
                    <div className="border">{data.gender}</div>
                    <div className="border">{data.Lga ? data.Lga.name : ""}</div>
                    <div className="border">{formatDate(data.date_of_birth)}</div>
                    <div className="border">{data.law_sch_camp_attended}</div>
                    <div className="border">{data.university_attended}</div>
                    <div className="border">{data.year_of_admission_law_sch}</div>
                    <div className="border">{data.year_of_call_to_bar}</div>
                    <div className="border">{data.State ? data.State.name : ""}</div>
                    <div className="border">{data.permanent_home_address}</div>
                    <div className="border">{data.phone}</div>
                    <div className="border">{data.email}</div>
                    <div className="border">{data.Country ? data.Country.name : ""}</div>
                    <div className="badge text-dark mt-3" style={{ color: data.Status ? data.Status.color.toLowerCase() : "" }}>
  {data.Status ? data.Status.name : ""}
</div>


                  </div>
                </div>
              </div>
              
            </Card.Body>
          }
        </Card>
      </Col>
      {documents.length != 0 ?
      <div>
      <h2 className="text-center mt-5 ">Supporting Document(s)</h2>
      <div className="d-flex justify-content-between mt-4">
      <table className="table">
     
        <thead>
          <tr>
            <th>S/N</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
         
        
        {documents.map((document, index)=>
            <tr >
              <td>{index +1}</td>
              <td>{document.doc_name}</td>
              <td>
              <a href={`${process.env.REACT_APP_UPLOAD_URL+document.doc_url}`} rel="noreferrer" className="btn btn-primary" target="_blank"> <span className="fa fa-eye"></span></a>
              {/* <Link className="btn btn-primary" to={`${process.env.REACT_APP_UPLOAD_URL+document.doc_url}`} target="_blank">
              <span className="fa fa-eye"></span>
            </Link> */}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </div>
    :
    <div className="text-center fw-bold"> No Attched Documents</div>
    }
     {remarks.length !=0?
     <div>
      <h2 className="text-center mt-5 ">Remark(s)</h2>
      <div className="d-flex justify-content-between mt-4">
      <table className="table">
     
        <thead>
          <tr>
            <th>S/N</th>
            <th>Remark</th>
         
          </tr>
        </thead>
        <tbody>
        {remarks.map(( remark, index)=>
            <tr >
              <td>{index +1}</td>
              <td>{remark.remark}</td>
            </tr>
            )}
        </tbody>
      </table>
    </div>
    </div>
:
<div className="text-center mt-5 fw-bold"> No Remark</div>

}


    </div>



  );
};

export default GetSingleEnrollment;

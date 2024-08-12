import React from "react";
import { useState, useContext, useEffect, useRef } from "react";
import { Card, Row, Col, Modal, Button, Form, Badge } from "react-bootstrap"
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import endpoint from "../../context/endpoint";
import { Context } from "../../context/Context";
import moment from 'moment';
import { ErrorAlert, SuccessAlert } from "../Toast/toast";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Loader from "../Loader/loader";
import { log } from "nvd3";
import { Link } from "react-router-dom";

export const GetEnrollment = () => {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [idToDelete, setIdToDelete] = useState('')
  const [yearOfGraduation, setYearOfGraduation] = useState([]);
  const [volumes, setVolumes] = useState([]);

  const [details, setDetails] = useState({
    volume_no:""
  })
  const [searched, setSearched] = useState(false);
  const [no, setNo] = useState('');


 

 //set search details
 const handleBatchChange = (event) => {
  setDetails({ ...details, year_of_graduation: event.target.value });
};
const handleVolumeChange = (event) => {
  setDetails({ ...details, volume_no: event.target.value });
};

  useEffect(() => {
    getAllData();
    getYearOfGraduation();
    getAllProfileVolumes();
  }, []);

  //get year of graduation
  const getYearOfGraduation = async () => {
    try {
      const res = await endpoint.get('/graduand/year-of-graduation');
      setYearOfGraduation(res.data.data);
      console.log('graduation date', res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllProfileVolumes = async () => {
    try {
      const res = await endpoint.get('/profile/volumes');
      setVolumes(res.data.data);
      console.log('volumes', res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllData = async () => {
    await endpoint.get(`/profile/list-enrolled-lawyer`)
      .then((res) => {
        console.log("all profile lists", res.data.data)
        setData(res.data.data)
      })
      .catch((err) => console.log(err))
  }

	const handleSubmitQuery = async (event) => {
		event.preventDefault();

		console.log('details:', details);
		await endpoint.post(`/profile/enrolled/search/`, details)
			.then((res) => {
				console.log("searched data", res.data.data);
				setLoading(false)
        setData(res.data.data);
        setNo(res.data.data[0].volume_no)
				SuccessAlert(res.data.message)
        setSearched(true);
				
			}).catch((err) => {
				setLoading(false)
				  ErrorAlert(err.response.data.message)
          setSearched(true);
				console.log(err)
			})

	};

  const onClose = () => {
    setOpen(false);
    setDeleteOpen(false);
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear();
    
    return `${day}-${month}-${year}`;
  }

  const columns = [
    {
      name: "S/N",
      cell: (row, index) => (index + 1) + ((page - 1) * perPage),
      width: "70px"
    },
    {
      name: "Enrollment Number",
      selector: (row) => [row.enrollment_number],
      sortable: true,
      width: "180px",
      cell: (row) => (
        <h6 className="fs-12 fw-bold">{(row.enrollment_number)}</h6>
      ),
    },
    {
      name: "Full Name",
      selector: (row) => [row.surname],
      sortable: true,
      width: "240px",
      cell: (row) => (
        <h6 className="fs-12 fw-bold">{row.Title ? (row.Title.name).toUpperCase() : ""} {(row.surname).toUpperCase() + ' ' + (row.first_name).toUpperCase() + " " + (row.middle_name).toUpperCase()}</h6>
      ),
    },
      {
        name: "Enrollment Volume",
        selector: (row) => [row.volume_no],
        sortable: true,
        width: "180px",
        cell: (row) => (
          <h6 className="fs-12 fw-bold">{(row.volume_no)}</h6>
        ),
      },
    {
      name: "Gender",
      selector: (row) => [row.gender],
      sortable: true,
      width: "100px",
      cell: (row) => (
        <h6 className="fs-12 fw-bold">{(row.gender).toUpperCase()}</h6>
      ),
    },
    // {
    //   name: "Year of Call to Bar",
    //   selector: (row) => [row.year_of_call_to_bar],
    //   sortable: true,
    //   width: "200px",
    //   cell: (row) => (
    //     <h6 className="fs-12 fw-bold">{formatDate(row.year_of_call_to_bar)}</h6>
    //   ),
    // },
    {
      name: "Date of Placement",
      selector: (row) => [row.date_of_placement],
      sortable: true,
      width: "200px",
      cell: (row) => (
        <h6 className="fs-12 fw-bold">{row.date_of_placement && formatDate(row.date_of_placement)}</h6>
      ),
    },
    {
      name: "Year of Graduation",
      selector: (row) => [row.year_of_graduation],
      sortable: true,
      width: "200px",
      cell: (row) => (
        <h6 className="fs-12 fw-bold">{(row.year_of_graduation)}</h6>
      ),
    },
    {
      name: "Action",
      width: "150px",
      cell: (row) => (
        <Row>
          <Col xs={4} style={{ paddingRight: "0px", paddingLeft: "0px" }}>
            <Link to={`/enrollment-status/${row.id}`}>
              <button className="btn btn-sm btn-primary" variant="secondary" title="Action" size="sm">
                View
              </button>
            </Link>
          </Col>
        </Row>
      )
    },
  ];
  

  const tableDatas = {
    columns,
    data,
  };

  return (
    <>
      {load ?
        <Loader /> :

        <div>

          <Card>
            <Card.Body>
              <div className="row mb-3">
                {/* <div className="col-md-3 d-flex align-items-center">
                  <Form.Group className="mb-0">
                    <Form.Label>Batch</Form.Label>
                    <Form.Select className="form-select-lg" value={details.year_of_graduation} onChange={handleBatchChange}>
                      <option value="">Select Batch...</option>
                      {yearOfGraduation.map((year, index) =>
                        <option key={index + 1} value={year.year_of_graduation}>{year.year_of_graduation}</option>
                      )}

                    </Form.Select>
                  </Form.Group>
                  
                </div> */}
                <div className="col-md-3 d-flex align-items-center">
                  <Form.Group className="mb-0">
                    <Form.Label>Volumes</Form.Label>
                    <Form.Select className="form-select-lg" value={details.volume_no} onChange={handleVolumeChange}>
                      <option value="">Select Volume...</option>
                      {volumes.map((volume, index) =>
                        <option key={index + 1} value={volume.volume_no}>{volume.volume_no}</option>
                      )}

                    </Form.Select>
                  </Form.Group>
                  
                </div>

                <div className="col-md-4 d-flex align-items-center mt-4">
                  <Button variant="primary" onClick={handleSubmitQuery}>Search</Button>
                </div>
              </div>

              <h3 className="text-center">ENROLLED LAWYERS</h3>
              <Row className="row">
                <Col md={12} className="col-md-12">
                  <DataTableExtensions {...tableDatas}>
                    <DataTable
                      //  fixedHeader
                      columns={columns}
                    //   selectableRows
                    //   onSelectedRowsChange={handleRowSelection}
                      data={data}
                      // customStyles={customStyles}
                      persistTableHead
                      defaultSortField="id"
                      defaultSortAsc={false}
                      striped={true}
                      center={true}
                      pagination
                      // onChangePage={handlePageChange}
                      // onChangeRowsPerPage={handlePerRowsChange}
                      paginationRowsPerPageOptions={[10, 15, 20, 25, 30, 50, 100]}
                      // paginationPerPage={perPage}
                      highlightOnHover
                    />
                  </DataTableExtensions>

                </Col>
              </Row>

            </Card.Body>
          </Card>
          {searched && data.length > 0 && (
          <Row className="mt-3">
            <Col className="text-center">
              <Link to={`/enrolled-users/reports/${encodeURIComponent(no)}`}>
                <button className="btn btn-primary" variant="secondary">
                  View Report
                </button>
              </Link>
            </Col>
          </Row>
        )}
        </div>
        
      }
    </>
  )
}
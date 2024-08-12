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

export const GetChangeOfName = () => {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [idToDelete, setIdToDelete] = useState('')

  const [details, setDetails] = useState({
    year_of_graduation: '',
  })
  const [selectedCount, setSelectedCount] = useState('');


  useEffect(() => {
    getAllData();
  }, []);


  const getAllData = async () => {
    await endpoint.get(`/profile/list-temp-profile`)
      .then((res) => {
        console.log("all profile lists", res.data.data)
        setData(res.data.data)
      })
      .catch((err) => console.log(err))
  }

  const handlePageChange = page => {
    setPage(page);
  }

  const handlePerRowsChange = async (newPerPage, page) => {
    setPerPage(newPerPage);

  }

  const handleEdit = async () => {

  }

  // const handleDelete = async (e) => {
  //   e.preventDefault()
  //   await endpoint.delete(`/enrollment/delete/${idToDelete}`).then((res) => {
  //     console.log(res.data)
  //     SuccessAlert(res.data.message)
  //     getAllData()
  //     setLoading(false)
  //     setDeleteOpen(false);
  //   }).catch((err) => {
  //     ErrorAlert(err.response.data.message)
  //     console.log(err)
  //   })
  // }

  const onClose = () => {
    setOpen(false);
    setDeleteOpen(false);
  }

  const columns = [
    {
      name: "S/N",

      cell: (row, index) => (index + 1) + ((page - 1) * perPage),
      width: "70px"
    },
    {
      name: "Surname",
      selector: (row) => [row.surname],
      sortable: true,
      width: "200px",
      cell: (row) => (
        <h6 className="fs-12 fw-bold">{row.surname ? (row.surname).toUpperCase() : ""} </h6>
      ),
    },
    {
      name: "First Name",
      selector: (row) => [row.first_name],
      sortable: true,
      width: "200px",
      cell: (row) => (
        <h6 className="fs-12 fw-bold">{row.first_name ? (row.first_name).toUpperCase() : ""}</h6>
      ),
    },
    {
      name: "Middle Name",
      selector: (row) => [row.middle_name],
      sortable: true,
      width: "200px",
      cell: (row) => (
        <h6 className="fs-12 fw-bold">{row.middle_name ? (row.middle_name).toUpperCase() : ""}</h6>
      ),
    },
    {
			name: 'Status',
			selector: 'status',
			style: { textAlign: 'right' },
			sortable: true,
			width: '180px',
			cell: (row) => (
				<div className="fs-12 fw-bold">{row.Status && <span className={`text-${row.Status.color}`}> {row.Status.name}</span> 
				}</div>
			),
		},
    {
      name: "Action",
      width: "150px",
      cell: (row) => (
        <Row>
          <Col xs={4} style={{ paddingRight: "0px", paddingLeft: "0px" }}>
            <Link to={`/change-of-name/edit/${row.id}`}>
              <button className="btn btn-sm btn-primary" variant="secondary" title="Action" size="sm">
                View
              </button>
            </Link>
          </Col>
          
          <Col>
          {/* {row.status_id == 1 &&
						<Link to={`${process.env.PUBLIC_URL}/change-of-name/edit/${row.id}`} className="btn btn-warning btn-sm m-1">
							<button className="fe fe-check"> Approve </button>
						</Link>
					} */}
          </Col>
        </Row>
      )
    },


  ];

  const tableDatas = {
    columns,
    data,
  };

  const handleRowSelection = ({ selectedRows }) => {
    setSelectedCount(selectedRows.length)
    console.log("rows selected", selectedRows.map(({ id }) => id))
    console.log("enrollment count", selectedRows.length);
  }

  return (
    <>
      {load ?
        <Loader /> :

        <div>

          <Card>
            <Card.Body>
              <h3 className="text-center">CHANGE OF NAME REQUEST</h3>
              <Row className="row">
                <Col md={12} className="col-md-12">
                  <DataTableExtensions {...tableDatas}>
                    <DataTable
                      //  fixedHeader
                      columns={columns}
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

                  {/* {selectedCount > 0 &&
                    <button className="btn btn-success pd-x-25 " onClick={() => setOpen(!open)}>
                      <span className="fa fa-refresh"></span> Generate Enrollment Number
                    </button>
                  } */}

                  <Modal show={open} >

                    <Modal.Body className="text-center p-4">
                      <Button
                        onClick={onClose}
                        className="btn-close"
                        variant=""
                      >
                        x
                      </Button>
                      <i className="fe fe-check-circle fs-100 text-success lh-1 mb-4 d-inline-block"></i>
                      <h4 className="text-success mb-4">Alert!</h4>
                      {/* <p className="mb-4 mx-4">
                        Your are about to generate enrollment number for <Badge bg="success" className="badge me-1 mb-1 mt-1">{selectedCount && selectedCount}</Badge> selected lawyers,
                        to proceed click on continue...
                      </p> */}
                      <button className="btn btn-danger pd-x-25 m-1" onClick={onClose}>
                        Cancel
                      </button>
                      <button className="btn btn-success pd-x-25 " onClick={onClose}>
                        Continue
                      </button>
                    </Modal.Body>
                  </Modal>

                  <Modal show={deleteOpen}>
                    <Modal.Body className="text-center p-4">
                      <DialogTitle>Delete Title
                        <Button
                          onClick={onClose}
                          className="btn-close"
                          variant=""
                        >
                          x
                        </Button>
                      </DialogTitle>
                      <DialogContent>
                        <div>

                          <div className="modal-body">
                            <p>Do you really want to delete <span className="fw-bold"></span> change of name detail? <br /> This process cannot be undone.</p>
                          </div>

                          <Row>
                            <Col xs={5} md={5} align="right">
                              <button type="button" className="btn btn-sm btn-secondary"
                                onClick={onClose}
                              >Cancel</button>
                            </Col>
                            <Col xs={1} md={1}  ></Col>
                            <Col xs={5} md={5} align="left">
                              <button
                                // onClick={handleDelete}
                                className="btn btn-sm btn-danger">Yes, Delete </button>
                            </Col>
                          </Row>

                        </div>

                      </DialogContent>
                    </Modal.Body>
                  </Modal>

                </Col>
              </Row>

            </Card.Body>
          </Card>
        </div>
      }
    </>
  )
}
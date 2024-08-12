import React from "react";
import { useState, useContext, useEffect, useRef } from "react";
import { Card, Row, Col, Modal, Button, Form, Badge } from "react-bootstrap"
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import endpoint from "../../context/endpoint";
import { Context } from "../../context/Context";
import moment from 'moment';
import { ErrorAlert, SuccessAlert } from "../Toast/toast";
import Loader from "../Loader/loader";
import { Link } from "react-router-dom";

export const GetEnrollment = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [yearOfGraduation, setYearOfGraduation] = useState([]);
  const [details, setDetails] = useState({
    year_of_graduation: '',
  })
  const [selectedCount, setSelectedCount] = useState('');
  const [selected, setSelected] = useState({
    selectedArray: '',
    volume: ''
  })

  //set search details
  const handleBatchChange = (event) => {
    setDetails({ ...details, year_of_graduation: event.target.value });
  };

  useEffect(() => {
    getAllData();
    getYearOfGraduation();
    nextVolNo()
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

  const getAllData = async () => {
    await endpoint.get(`/profile/list`)
      .then((res) => {
        console.log("all enrollment lists", res.data.data)
        setData(res.data.data)
      })
      .catch((err) => console.log(err))
  }

  const nextVolNo = async () => {
    await endpoint.get(`/profile/auto-generate-volume-no`)
      .then(({ data }) => {
        setSelected({ ...selected, volume: data.data.volumeNo })
      })
  }

  const handlePageChange = page => {
    setPage(page);
  }

  const handlePerRowsChange = async (newPerPage, page) => {
    setPerPage(newPerPage);

  }

  const onClose = () => {
    setOpen(false);
  }

  const columns = [
    {
      name: "S/N",

      cell: (row, index) => (index + 1) + ((page - 1) * perPage),
      width: "70px"
    },
    {
      name: "Fullname",
      selector: (row) => [row.surname],
      sortable: true,
      width: "250px",
      cell: (row) => (
        <h6 className="fs-12 fw-bold">{row.Title ? (row.Title.name).toUpperCase() : ""} {(row.surname).toUpperCase() + ' ' + (row.first_name).toUpperCase() + " " + (row.middle_name).toUpperCase()}</h6>
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
    {
      name: <div>Law School Campus Attended</div>,
      selector: (row) => [row.law_sch_camp_attended],
      sortable: true,
      width: "250px",
      cell: (row) => (
        <h6 className="fs-12 fw-bold">{(row.law_sch_camp_attended).toUpperCase()}</h6>
      ),
    },
    {
      name: "Batch",
      selector: (row) => [row.year_of_graduation],
      sortable: true,
      width: "120px",
      cell: (row) => (
        <h6 className="fs-12 fw-bold">{(row.year_of_graduation)}</h6>
      ),
    },
    {
      name: "Year of Call to Bar",
      selector: (row) => [row.year_of_call_to_bar],
      sortable: true,
      width: "200px",
      cell: (row) => (
        <h6 className="fs-12 fw-bold">{(row.year_of_call_to_bar)}</h6>
      ),
    },


    {
      name: "Action",
      width: "150px",
      cell: (row) => (
        <Row>
          <Col xs={4} style={{ paddingRight: "0px", paddingLeft: "0px" }}>
            <Link to={`/enrolled-user/${row.id}`}>
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

  const handleRowSelection = ({ selectedRows }) => {
    setSelectedCount(selectedRows.length)
    setSelected({ ...selected, selectedArray: selectedRows.map(({ id }) => id) })
  }

  const genEnrollmentNum = async (e) => {
    e.preventDefault()
    onClose()
    setLoading(true)
    await endpoint.post(`/profile/lawyer-enrollment-number`, selected)
      .then(({ data }) => {
        setLoading(false)
        console.log(data)
        getAllData()
        SuccessAlert(data.message)
        setSelectedCount('')
      }).catch((err) => {
        setLoading(false)
        console.log(err)
      })
  }

  const handleSearch = async () => {
    setLoading(true)
    await endpoint.post(`/profile/graduation/search`, details)
      .then(({ data }) => {
        setLoading(false)
        setData(data.data)
      }).catch((err) => {
        setLoading(false)
        console.log(err)
      })
  }

  return (
    <>
      {isLoading ?
        <Loader /> :

        <div>

          <Card>
            <Card.Body>
              <div className="row mb-3">
                <div className="col-md-3 d-flex align-items-center">
                  <Form.Group className="mb-0">
                    <Form.Label>Session</Form.Label>
                    <Form.Select className="form-select-lg" value={details.year_of_graduation} onChange={handleBatchChange}>
                      <option value="">Select Session...</option>
                      {yearOfGraduation.map((year, index) =>
                        <option key={index + 1} value={year.year_of_graduation}>{year.year_of_graduation}</option>
                      )}

                    </Form.Select>
                  </Form.Group>
                </div>

                <div className="col-md-4 d-flex align-items-center mt-4">
                  <Button variant="primary" onClick={handleSearch}>Search</Button>
                </div>
              </div>

              <h3 className="text-center">VERIFIED LAWYERS</h3>
              <Row className="row">
                <Col md={12} className="col-md-12">
                  <DataTableExtensions {...tableDatas}>
                    <DataTable
                      //  fixedHeader
                      columns={columns}
                      selectableRows
                      onSelectedRowsChange={handleRowSelection}
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

                  {selectedCount > 0 &&
                    <button className="btn btn-success pd-x-25 " onClick={() => setOpen(!open)}>
                      <span className="fa fa-refresh"></span> Generate Enrollment Number
                    </button>
                  }

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
                      <p className="mb-4 mx-4">
                        Your are about to generate enrollment number for <Badge bg="success" className="badge me-1 mb-1 mt-1">{selectedCount && selectedCount}</Badge> selected lawyers,
                        to proceed click on continue...
                      </p>
                      <p>
                        <div className="mt-2">
                          <label>Enter Volume No.</label>
                          <input type="text" className="form-control" placeholder="Please Enter Volume"
                            value={selected.volume}
                            onChange={(e) => {
                              setSelected({ ...selected, volume: e.target.value })
                            }}
                          />
                        </div>
                      </p>
                      <button className="btn btn-danger pd-x-25 m-1" onClick={onClose}>
                        Cancel
                      </button>
                      {selected.volume &&
                        <button className="btn btn-success pd-x-25 " onClick={(e) => genEnrollmentNum(e)}>
                          Continue
                        </button>
                      }
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
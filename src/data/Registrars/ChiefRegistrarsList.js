import React from "react";
import { useState, useContext, useEffect, useRef } from "react";
import { Card, Row, Col, Modal, Button, Form, Badge } from "react-bootstrap"
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import endpoint from "../../context/endpoint";
import { ErrorAlert, SuccessAlert } from "../Toast/toast";
import Loader from "../Loader/loader";
import { Link } from "react-router-dom";

export const ChiefRegistrarsList = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  
  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = async () => {
    setLoading(true);
    await endpoint.get(`/registrar/list`)
      .then(({data}) => {
        setData(data.data)
        setLoading(false);
      })
      .catch((err) => console.log(err))
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
      name: "SNo.",

      cell: (row, index) => (index + 1) + ((page - 1) * perPage),
      width: "70px"
    },
    {
      name: "Fullname",
      selector: (row) => [row.surname],
      sortable: true,
    //   width: "400px",
      cell: (row) => (
        <h6 className="fs-12 fw-bold"> {(row.surname).toUpperCase() + ' ' + (row.first_name).toUpperCase() + " " + (row.middle_name).toUpperCase()}</h6>
      ),
    },
    {
      name: "Email",
      selector: (row) => [row.email],
      sortable: true,
      width: "400px",
      cell: (row) => (
        <h6 className="fs-12 fw-bold"> {row.email}</h6>
      ),
    },

    {
      name: "Action",
    //   width: "200px",
      cell: (row) => (
        <div className="fs-12 fw-bold mx-1 ">
          <td>
          <Link to={`/create-chief-registrar/${row.id}`}>
              <button className="btn btn-sm btn-warning m-1" variant="warning" title="Action" size="sm">
                <span className="fa fa-edit"></span> Edit
              </button>
            </Link>
            
          </td>
        </div>
        // <Row>
        //   <Col xs={4} style={{ paddingRight: "0px", paddingLeft: "0px" }}>
        //     <Link to={`#`}>
        //       <button className="btn btn-sm btn-warning" variant="warning" title="Action" size="sm">
        //         <span className="fa fa-edit"></span> Edit
        //       </button>
        //     </Link>
        //     <Link to={`#`}>
        //       <button className="btn btn-sm btn-danger" variant="danger" title="Action" size="sm">
        //         <span className="fa fa-trash"></span>
        //       </button>
        //     </Link>
        //   </Col>

        // </Row>
      )
    },


  ];

  const tableDatas = {
    columns,
    data,
  };

  return (
    <>
      {isLoading ?
        <Loader /> :

        <div>

          <Card>
            <Card.Body>
              <div>
                <Link to={`/create-chief-registrar`} className="btn btn-primary btn-outline"> <span className="fa fa-plus"></span> Add Registrar</Link>
              </div>
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

                 
                  {/* <Modal show={open} >

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
                      
                      <button className="btn btn-danger pd-x-25 m-1" onClick={onClose}>
                        Cancel
                      </button>
                      <button className="btn btn-success pd-x-25 " onClick={(e) => genEnrollmentNum(e)}>
                        Continue
                      </button>
                    </Modal.Body>
                  </Modal> */}

                </Col>
              </Row>

            </Card.Body>
          </Card>
        </div>
      }
    </>
  )
}
import React from "react";
import { useState, useContext, useEffect, useRef } from "react";
import { Card, Row, Col, Modal, Button, Form, Badge } from "react-bootstrap"
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import endpoint from "../../context/endpoint";
import { ErrorAlert, SuccessAlert } from "../Toast/toast";
import Loader from "../Loader/loader";
import { Link } from "react-router-dom";

export const EnrollmentBatchApproval = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [volume_no, setVolume_no] = useState('')
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = async () => {
    await endpoint.get(`/profile/list-profile-by-group-volume`)
      .then((res) => {
        console.log("data registera", res.data.data)
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
      name: "Volume",
      selector: (row) => [row.volume_no],
      sortable: true,
      //   width: "400px",
      cell: (row) => (
        <h6 className="fs-12 fw-bold">{row.volume_no}</h6>
      ),
    },
    {
      name: "Status",
      selector: (row) => [row.status_id],
      sortable: true,
      //   width: "400px",
      cell: (row) => (
        <h6 className="fs-12 fw-bold">{row.Status ? row.Status.name : ``}</h6>
      ),
    },
    {
      name: "Approved By",
      selector: (row) => [row.Registrar],
      sortable: true,
      //   width: "400px",
      cell: (row) => (
        <h6 className="fs-12 fw-bold">{row.Registrar ? row.Registrar.surname : ``} {row.Registrar ? row.Registrar.first_name : ``} {row.Registrar ? row.Registrar.middle_name : ``}</h6>
      ),
    },

    {
      name: "Action",
      width: "250px",
      cell: (row) => (
        <div className="fs-12 fw-bold mx-1 ">
          <td>
            <Link to={`/approval-list/${encodeURIComponent(row.volume_no)}`}>
              <button className="btn btn-sm btn-warning m-1" variant="warning" title="Action" size="sm">
                <span className="fa fa-eye"></span> View
              </button>
            </Link>
            <Link to={`/enrolled-users/reports/${encodeURIComponent(row.volume_no)}`}>
              <button className="btn btn-sm btn-primary m-1" variant="warning" title="Action" size="sm">
                <span className="fa fa-list"></span> View Report
              </button>
            </Link>

          </td>

        </div>
      )
    },


  ];

  // const data = [
  //   {
  //       id: 1,
  //       volume: "SCN/V1",
  //       approvedBy: "Chief Justice Bashir Abubakar",
  //       status: "approved"
  //   },
  //   {
  //       id: 2,
  //       volume: "SCN/V2",
  //       approvedBy: "Chief Justice Ahmed Danlami",
  //       status: "pending"
  //   },

  // ];

  const tableDatas = {
    columns,
    data,
  };

  const approveBatch = async () => {
    console.log('batch to approve', { volume_no: volume_no })
    setLoading(true)
    await endpoint.post(`/profile/approve-graduand-profile`, { volume_no: volume_no })
      .then(({ data }) => {
        setLoading(false)
        getAllData()
        setOpen(!open)
        console.log(data)
      }).catch((err) => {
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
                        Your are about to approve volume {volume_no}
                      </p>

                      <button className="btn btn-danger pd-x-25 m-1" onClick={onClose}>
                        Cancel
                      </button>
                      <button className="btn btn-success pd-x-25 " onClick={(e) => approveBatch(e)}>
                        Continue
                      </button>
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
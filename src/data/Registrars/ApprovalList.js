import React from "react";
import { useState, useContext, useEffect, useRef } from "react";
import { Card, Row, Col, Modal, Button, Form, Badge } from "react-bootstrap"
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import endpoint from "../../context/endpoint";
import { ErrorAlert, SuccessAlert } from "../Toast/toast";
import Loader from "../Loader/loader";
import { Link } from "react-router-dom";

export const ApprovalList = ({ volume_no }) => {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    useEffect(() => {
        getAllData();
    }, []);

    const getAllData = async () => {
        setLoading(true)
        await endpoint.post(`/profile/list-profile-by-volume`, { volume_no: volume_no })
            .then(({ data }) => {
                setLoading(false)
                setData(data.data)
            })
            .catch((err) => {
                setLoading(false)
                console.log(err)
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

    const approveBatch = async () => {
        console.log('batch to approve', { volume_no: volume_no })
        setLoading(true)
        await endpoint.post(`/profile/approve-graduand-profile`, { volume_no: volume_no })
            .then(({ data }) => {
                setLoading(false)
                getAllData()
                SuccessAlert(data.data.message)
                onClose()
                console.log(data)
            }).catch((err) => {
                setLoading(false)
                console.log(err)
                ErrorAlert(err.response.data.message)
                onClose()
            })
    }

    const columns = [
        {
            name: "S/N",

            cell: (row, index) => (index + 1) + ((page - 1) * perPage),
            width: "70px"
        },
        {
            name: "Enrollment No.",
            selector: (row) => [row.enrollment_number],
            sortable: true,
            width: "300px",
            cell: (row) => (
                <h6 className="fs-12 fw-bold"> {(row.enrollment_number).toUpperCase()}</h6>
            ),
        },
        {
            name: "Fullname",
            selector: (row) => [row.surname],
            sortable: true,
            width: "400px",
            cell: (row) => (
                <h6 className="fs-12 fw-bold"> {(row.surname).toUpperCase() + ' ' + (row.first_name).toUpperCase() + " " + (row.middle_name).toUpperCase()}</h6>
            ),
        },
        {
            name: "Year of Call to Bar.",
            selector: (row) => [row.year_of_call_to_bar],
            sortable: true,
            width: "200px",
            cell: (row) => (
                <h6 className="fs-12 fw-bold"> {(row.year_of_call_to_bar).toUpperCase()}</h6>
            ),
        },
        {
            name: "Action",
            width: "250px",
            cell: (row) => (
                <div className="fs-12 fw-bold mx-1 ">
                    <td>
                        <Link to={`/enrollment-status/${row.id}`}>
                            <button className="btn btn-sm btn-primary m-1" variant="warning" title="Action" size="sm">
                                <span className="fa fa-list"></span> View Report
                            </button>
                        </Link>

                    </td>

                </div>
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
                            {data.length > 0 && data[0].status_id == 3 && <>
                                <div>
                                    <Link to={`#`} className="btn btn-primary btn-outline m-2" onClick={() => setOpen(!open)}> <span className="fa fa-check"></span> Approve</Link>
                                    <Badge bg="warning"> Pending </Badge>
                                </div>
                            </>
                            }
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
                            {data.length > 0 && data[0].status_id == 3 && <>
                                <div>
                                    <Link to={`#`} className="btn btn-primary btn-outline m-2" onClick={() => setOpen(!open)}> <span className="fa fa-check"></span> Approve</Link>
                                    <Link to={`/approve-enrolled-lawyers`} className="btn btn-primary btn-outline m-2"> <span className="fa fa-list"></span> View List</Link>
                                    <Badge bg="warning"> Pending </Badge>
                                </div>
                            </>
                            }
                            {
                                data.length > 0 && data[0].status_id == 5 &&
                                <>
                                    <div>
                                        <Link to={`/approve-enrolled-lawyers`} className="btn btn-primary m-2"> <span className="fa fa-eye"></span> View List</Link>
                                        <Badge bg="primary"> Approved </Badge>
                                    </div>
                                </>

                            }

                        </Card.Body>
                    </Card>
                </div>
            }
        </>
    )
}
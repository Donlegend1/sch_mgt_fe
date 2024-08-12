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

export const DisciplinedLawyers = () => {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [openEditModal, setEditModal] = useState(false);
    const [openDelModal, setDelModal] = useState(false);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [yearOfGraduation, setYearOfGraduation] = useState([]);
    const [details, setDetails] = useState({
        year_of_graduation: '',
    })
    const [lawyer, setLawyer] = useState('')
    const [lawyerQuery, setLawyerQuery] = useState([])
    const [disciplineToEdit, setDisciplineToEdit] = useState({
        id:"",
        query:""
    })
    const [disciplineToDelete, setDisciplineToDelete] = useState()

    useEffect(() => {
        getAllData();
        getYearOfGraduation();
    }, []);

    //set search details
    const handleBatchChange = (event) => {
        setDetails({ ...details, year_of_graduation: event.target.value });
    };

    //get year of graduation
    const getYearOfGraduation = async () => {
        try {
            const res = await endpoint.get('/graduand/year-of-graduation');
            setYearOfGraduation(res.data.data);
        } catch (err) {
            console.log(err);
        }
    };

    const getAllData = async () => {
        await endpoint.get(`/discipline/list`)
            .then((res) => {
                console.log("disciplined", res.data.data)
                setData(res.data.data)
            })
            .catch((err) => console.log(err))
    }

    //   const handlePageChange = page => {
    //     setPage(page);
    //   }

    //   const handlePerRowsChange = async (newPerPage, page) => {
    //     setPerPage(newPerPage);

    //   }

    const onClose = () => {
        setOpen(false);
    }

    const getAllQuery = async (id) => {
        await endpoint.get(`/discipline/show-all/${id}`)
            .then(({ data }) => {
                console.log("query data", data.data)
                setLawyerQuery(data.data)
            }).catch((err) => {
                console.log(err)
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
            selector: (row) => [row.Profile.enrollment_number],
            sortable: true,
            width: "150px",
            cell: (row) => (
                <h6 className="fs-12 fw-bold">{row.Profile.enrollment_number}</h6>
            ),
        },
        {
            name: "Fullname",
            selector: (row) => [row.Profile.surname],
            sortable: true,
            width: "250px",
            cell: (row) => (
                <h6 className="fs-12 fw-bold">{(row.Profile.surname).toUpperCase() + ' ' + (row.Profile.first_name).toUpperCase() + " " + (row.Profile.middle_name).toUpperCase()}</h6>
            ),
        },
        {
            name: "Gender",
            selector: (row) => [row.Profile.gender],
            sortable: true,
            width: "100px",
            cell: (row) => (
                <h6 className="fs-12 fw-bold">{(row.Profile.gender).toUpperCase()}</h6>
            ),
        },
        {
            name: "Year of Call to Bar",
            selector: (row) => [row.Profile.year_of_call_to_bar],
            sortable: true,
            width: "200px",
            cell: (row) => (
                <h6 className="fs-12 fw-bold">{(row.Profile.year_of_call_to_bar)}</h6>
            ),
        },


        {
            name: "Action",
            width: "150px",
            cell: (row) => (
                <div className="fs-12 fw-bold mx-1 ">
                    <td>
                        <button className="btn btn-sm btn-primary m-1" variant="primary" title="Action" size="sm"
                            onClick={() => {
                                setLawyer(row.Profile.surname + ' ' + row.Profile.first_name)
                                setOpen(!open)
                                getAllQuery(row.profile_id)
                            }}
                        >
                            View Query
                        </button>
                    </td>

                </div>
            )
        },


    ];

    const tableDatas = {
        columns,
        data,
    };

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

    const updateDiscipline = async() => {
        await endpoint.put(`/discipline/edit/${disciplineToEdit.id}`, disciplineToEdit)
            .then((res) => {
                setEditModal(!openEditModal)
                setDisciplineToEdit({...disciplineToEdit, 
                    id:"",
                    query:""
                })
                getAllQuery()
            }).catch((err) => {
                console.log(err)
                setEditModal(!openEditModal)
            })
    }

    const delDiscipline = async() => {
        await endpoint.delete(`/discipline/delete/${disciplineToDelete}`)
            .then((res) => {
                setDelModal(!openDelModal)
                getAllQuery(lawyerQuery.filter((data) => data.id != disciplineToDelete))
                setDisciplineToDelete('')
            }).catch((err) => {
                console.log(err)
                setDelModal(!openDelModal)
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

                            <h3 className="text-center">DISCIPLINED LAWYERS</h3>
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

                                    <Modal show={open} size="lg">

                                        <Modal.Body className="text-center p-4">
                                            <Button
                                                onClick={onClose}
                                                className="btn-close"
                                                variant=""
                                            >
                                                x
                                            </Button>
                                            <p className="mb-4 mx-4 mt-4">
                                                All Query Served to <br></br>
                                                <span className="text-success"><h4>{lawyer}</h4></span>
                                            </p>
                                            <p>
                                                <div className="mt-2 table-bordered">
                                                    <table class="table">
                                                        <thead>
                                                            <tr>
                                                                <th>Date Served</th>
                                                                <th>Query</th>
                                                                <th>Attachments</th>
                                                                <th>Actions</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {lawyerQuery && lawyerQuery.map((query) => (
                                                                <tr>
                                                                    <td>{query.query_date}</td>
                                                                    <td>{query.query}</td>
                                                                    <td>
                                                                        <a href={`${process.env.REACT_APP_UPLOAD_URL + query.file_url}`} target="_blank">Download</a>
                                                                    </td>
                                                                    <td>
                                                                        <button className="btn btn-sm btn-warning m-1" variant="warning" title="Action" size="sm"
                                                                            onClick={() => {
                                                                                setOpen(!open)
                                                                                setEditModal(!openEditModal)
                                                                                setDisciplineToEdit({
                                                                                    id:query.id,
                                                                                    query:query.query 
                                                                                })
                                                                            }}
                                                                        >
                                                                            <span className="fa fa-edit"></span>
                                                                            Edit
                                                                        </button>
                                                                        <button className="btn btn-sm btn-danger m-1" variant="danger" title="Action" size="sm"
                                                                            onClick={() => {
                                                                                setOpen(!open)
                                                                                setDelModal(!openDelModal)
                                                                                setDisciplineToDelete(query.id)
                                                                            }}
                                                                        >
                                                                            <span className="fa fa-trash"></span>
                                                                            
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </p>
                                            <button className="btn btn-danger pd-x-25 m-1" onClick={onClose}>
                                                Cancel
                                            </button>
                                        </Modal.Body>
                                    </Modal>

                                    <Modal show={openEditModal} >

                                        <Modal.Body className="text-center p-4">
                                            <Button
                                                onClick={() => setEditModal(!openEditModal)}
                                                className="btn-close"
                                                variant=""
                                            >
                                                x
                                            </Button>
                                            <h4 className="text-success mb-4">Edit Discipline!</h4>
                                            <p className="mb-4 mx-4">
                                                You want to update disciplinary record
                                            </p>
                                            <p>
                                                <div className="mt-2">
                                                    <label>Description <span className="text-danger">*</span></label>
                                                    <textarea
                                                        className="form-control"
                                                        placeholder="Description..."
                                                        required
                                                        value={disciplineToEdit.query}
                                                        onChange={(e) => setDisciplineToEdit({ ...disciplineToEdit, query: e.target.value })}
                                                    >

                                                    </textarea>
                                                </div>
                                            </p>
                                            <button className="btn btn-danger pd-x-25 m-1" onClick={() => setEditModal(!openEditModal)}>
                                                Cancel
                                            </button>
                                            <button className="btn btn-success pd-x-25 " onClick={(e) => updateDiscipline(e)}>
                                                Update
                                            </button>
                                        </Modal.Body>
                                    </Modal>

                                    <Modal show={openDelModal} >

                                        <Modal.Body className="text-center p-4">
                                            <Button
                                                onClick={() => setDelModal(!openDelModal)}
                                                className="btn-close"
                                                variant=""
                                            >
                                                x
                                            </Button>
                                            <h4 className="text-danger mb-4">Remove Disciplinary Action!</h4>
                                            <p className="mb-4 mx-4">
                                                You want sure you want to delete this record
                                            </p>
                                            <button className="btn btn-danger pd-x-25 m-1" onClick={() => setDelModal(!openDelModal)}>
                                                Cancel
                                            </button>
                                            <button className="btn btn-success pd-x-25 " onClick={(e) => delDiscipline(e)}>
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
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

export const AllLawyers = () => {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [yearOfGraduation, setYearOfGraduation] = useState([]);
    const [details, setDetails] = useState({
        year_of_graduation: '',
    })

    const curDate = new Date();
    const formatDate = (curDate) => {
        const year = curDate.getFullYear();
        const month = String(curDate.getMonth() + 1).padStart(2, '0');
        const day = String(curDate.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [disciplinaryData, setDisciplinaryData] = useState({
        profile_id: '',
        fullname: '',
        query: '',
        query_date: formatDate(curDate),
        file_url: ''
    })

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
        await endpoint.get(`/profile/list-enrolled-lawyer`)
            .then((res) => {
                console.log("all enrollment lists", res.data.data)
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
            width: "150px",
            cell: (row) => (
                <h6 className="fs-12 fw-bold">{row.enrollment_number}</h6>
            ),
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
                <div className="fs-12 fw-bold mx-1 ">
                    <td>
                        <button className="btn btn-sm btn-warning m-1" variant="warning" title="Action" size="sm"
                            onClick={() => {
                                setOpen(!open)
                                setDisciplinaryData({ ...disciplinaryData, profile_id: row.id, fullname: row.surname + ' ' + row.first_name })
                            }}
                        >
                            Discipline
                        </button>
                        {/* <Link to={`/enrolled-user/${row.id}`}>
                            <button className="btn btn-sm btn-primary m-1" variant="primary" title="Action" size="sm">
                                View Query
                            </button>
                        </Link> */}
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

    const saveDiscipline = async (e) => {
        e.preventDefault();
        setLoading(true)
        const data = new FormData()
        data.append('profile_id', disciplinaryData.profile_id)
        data.append('query', disciplinaryData.query)
        data.append('query_date', disciplinaryData.query_date)
        data.append('file_url', disciplinaryData.file_url)
        await endpoint.post(`/discipline/create`, data)
            .then((res) => {
                setOpen(!open)
                setLoading(false)
                SuccessAlert(res.data.message)
                setDisciplinaryData({
                    profile_id: '',
                    fullname: '',
                    query: '',
                    query_date: '',
                    file_url: ''
                })
            }).catch((err) => {
                console.log(err)
                setOpen(!open)
                setLoading(false)
                ErrorAlert(err.response.data.message)
                setDisciplinaryData({
                    profile_id: '',
                    fullname: '',
                    query: '',
                    query_date: '',
                    file_url: ''
                })
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

                            <h3 className="text-center">ENROLLED LAWYERS</h3>
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
                                            {/* <i className="fe fe-check-circle fs-100 text-success lh-1 mb-4 d-inline-block"></i> */}
                                            <h4 className="text-success mb-4">Discipline Lawyer!</h4>
                                            <p className="mb-4 mx-4">
                                                You want to create a disciplinary record for {disciplinaryData.fullname}
                                            </p>
                                            <p>
                                                <div className="mt-2">
                                                    <label>Description <span className="text-danger">*</span></label>
                                                    <textarea
                                                        className="form-control"
                                                        placeholder="Description..."
                                                        required
                                                        value={disciplinaryData.query}
                                                        onChange={(e) => setDisciplinaryData({ ...disciplinaryData, query: e.target.value })}
                                                    >

                                                    </textarea>
                                                </div>

                                                <div className="mt-2">
                                                    <label>Attachments (if any)</label>
                                                    <input type="file" className="form-control"
                                                        onChange={(e) => {
                                                            setDisciplinaryData({ ...disciplinaryData, file_url: e.target.files[0] })
                                                        }}
                                                    />
                                                </div>
                                            </p>
                                            <button className="btn btn-danger pd-x-25 m-1" onClick={onClose}>
                                                Cancel
                                            </button>
                                            <button className="btn btn-success pd-x-25 " onClick={(e) => saveDiscipline(e)}>
                                                Save
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
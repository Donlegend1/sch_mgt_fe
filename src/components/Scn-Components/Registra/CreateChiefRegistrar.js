import React from 'react'
import { useState, useContext, useEffect, useRef } from "react";
import { Card, Row, Col, Modal, Button, Form, FormGroup, Badge } from "react-bootstrap"
import endpoint from "../../../context/endpoint";
import { ErrorAlert, SuccessAlert } from "../../../data/Toast/toast";
import SignatureCanvas from "react-signature-canvas"
import { useNavigate, useParams, Link } from 'react-router-dom';

const CreateChiefRegistrar = () => {
    const [registrarDetails, setRegistrarDetails] = useState({
        surname: '',
        first_name: '',
        middle_name: '',
        email: '',
        status: '',
    })
    const [oldSignature, setOldSignature] = useState('')
    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [sign, setSign] = useState()
    const [url, setUrl] = useState()

    const handleClear = (e) => {
        e.preventDefault()
        sign.clear()
    }

    useEffect(() => {
        if (id) {
            getRegistrar(id)
        }
    }, [])

    const getRegistrar = async (id) => {
        await endpoint.get(`/registrar/show/${id}`)
            .then(({ data }) => {
                console.log("registrar", data.data)
                setRegistrarDetails(data.data)
                setOldSignature(data.data.signature)
            }).catch((err) => {
                console.log(err)
            })
    }

    const handleSave = async (e) => {
        e.preventDefault()
        setLoading(true)
        const data = new FormData()
        data.append('surname', registrarDetails.surname)
        data.append('first_name', registrarDetails.first_name)
        data.append('middle_name', registrarDetails.middle_name)
        data.append('email', registrarDetails.email)
        data.append('status', registrarDetails.status)
        data.append('signature', url)
        if (id) {
            console.log("id to update", id)
            await endpoint.put(`/registrar/edit/${id}`, data)
                .then(({ data }) => {
                    setLoading(false)
                    SuccessAlert(data.message)
                    navigate(`/chief-registrars`)
                    console.log(data)
                }).catch((err) => {
                    setLoading(false)
                    ErrorAlert(err.response.data.message)
                    console.log(err)
                })
        } else {
            await endpoint.post(`/registrar/create`, data)
                .then(({ data }) => {
                    setLoading(false)
                    SuccessAlert(data.message)
                    navigate(`/chief-registrars`)
                    console.log(data)
                }).catch((err) => {
                    setLoading(false)
                    ErrorAlert(err.response.data.message)
                    console.log("err", err)
                })
        }

    }

    return (
        <div>
            <Row>
                <Col sm={12} className="col-12">
                    <Card>
                        <Card.Header>
                            <h3 className="card-title mb-0">Create Chief Registrar</h3>
                        </Card.Header>
                        <Card.Body>
                            <div className="">
                                <div className="">
                                    <form onSubmit={handleSave}>
                                        <h4 className='text-center'> <span className='fa fa-edit'></span> {id ? `Edit` : `Enter`} Details of Chief Registrar</h4>
                                        <Row className="mt-2">
                                            <Col lg={6} md={12}>
                                                <FormGroup>
                                                    <label htmlFor="exampleInputname1">Surname</label>
                                                    <Form.Control
                                                        type="text"
                                                        className="form-control"
                                                        required
                                                        value={registrarDetails.surname}
                                                        onChange={(e) => setRegistrarDetails({ ...registrarDetails, surname: e.target.value })}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg={6} md={12}>
                                                <FormGroup>
                                                    <label htmlFor="exampleInputname1">Firstname</label>
                                                    <Form.Control
                                                        type="text"
                                                        className="form-control"
                                                        required
                                                        value={registrarDetails.first_name}
                                                        onChange={(e) => setRegistrarDetails({ ...registrarDetails, first_name: e.target.value })}
                                                    />
                                                </FormGroup>
                                            </Col>

                                        </Row>
                                        <Row className='mt-2'>
                                            <Col lg={6} md={12}>
                                                <FormGroup>
                                                    <label htmlFor="exampleInputname1">Othernames</label>
                                                    <Form.Control
                                                        type="text"
                                                        className="form-control"
                                                        value={registrarDetails.middle_name}
                                                        onChange={(e) => setRegistrarDetails({ ...registrarDetails, middle_name: e.target.value })}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg={6} md={12}>
                                                <FormGroup>
                                                    <label htmlFor="exampleInputname1">Email</label>
                                                    <Form.Control
                                                        type="text"
                                                        className="form-control"
                                                        value={registrarDetails.email}
                                                        onChange={(e) => setRegistrarDetails({ ...registrarDetails, email: e.target.value })}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row className='mt-2'>
                                            {id &&
                                                <Col lg={6} md={12}>
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputname1">Status</label>
                                                        <select className="form-control"
                                                            required
                                                            value={registrarDetails.status}
                                                            onChange={(e) => setRegistrarDetails({ ...registrarDetails, status: e.target.value })}
                                                        >
                                                            <option value=""> Select Status... </option>
                                                            <option value="1" selected={registrarDetails.status == 1}> Active </option>
                                                            <option value="0" selected={registrarDetails.status == 0}> Inactive </option>
                                                        </select>
                                                    </div>
                                                </Col>
                                            }
                                            <Col lg={3} md={12}>
                                                <label>Signature</label><br></br>

                                                <SignatureCanvas
                                                    ref={data => setSign(data)}
                                                    onEnd={() => setUrl(sign.getTrimmedCanvas().toDataURL('image/png'))}
                                                    canvasProps={{ width: 500, height: 70, className: 'sigCanvas' }}
                                                />
                                                <button className="btn btn-sm btn-warning justify-end" onClick={(e) => handleClear(e)}>Clear Signature field</button>

                                            </Col>
                                            {id &&
                                                <Col lg={3} md={12}>
                                                    <label>Old Signature</label><br></br>
                                                    <img src={process.env.REACT_APP_UPLOAD_URL + oldSignature} crossOrigin="anonymous" alt="Old Signatory..." />
                                                </Col>
                                            }
                                        </Row>
                                        <div className={id ? `` : `text-center`}>
                                            <button className="btn btn-primary mt-2"> <span className='fa fa-save'></span> {id ? `Update` : `Save`} </button>
                                            <Link to={`/chief-registrars`} className="btn btn-warning mt-2 mx-1"> <span className='fa fa-backward'></span> Back </Link>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default CreateChiefRegistrar
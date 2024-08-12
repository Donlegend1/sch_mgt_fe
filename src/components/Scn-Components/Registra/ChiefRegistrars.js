import React from 'react'
import { useState, useContext, useEffect, useRef } from "react";
import { Card, Row, Col, Modal, Button, Form, FormGroup, Badge } from "react-bootstrap"
import endpoint from "../../../context/endpoint";
import { ErrorAlert, SuccessAlert } from "../../../data/Toast/toast";
import SignatureCanvas from "react-signature-canvas"
import { ChiefRegistrarsList } from '../../../data/Registrars/ChiefRegistrarsList';

const ChiefRegistrars = () => {



    return (
        <div>
            <Row>
                <Col sm={12} className="col-12">
                    <Card>
                        <Card.Header>
                            <h3 className="card-title mb-0"> Chief Registrars</h3>
                        </Card.Header>
                        <Card.Body>
                            <div className="">
                                <div className="">
                                    <h4 className='text-center'> <span className='fa fa-list'></span> Chief Registrars List</h4>
                                    <ChiefRegistrarsList />
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default ChiefRegistrars
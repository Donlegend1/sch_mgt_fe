import React from 'react'
import { useState, useContext, useEffect, useRef } from "react";
import { Card, Row, Col, Modal, Button, Form, FormGroup, Badge } from "react-bootstrap"
import endpoint from "../../../context/endpoint";
import { ErrorAlert, SuccessAlert } from "../../../data/Toast/toast";
import { useParams } from 'react-router-dom';
import { GraduandTempData } from '../../../data/Graduands/GraduandTempData';

const GraduandTemp = () => {

    const { volume_no } = useParams()

    return (
        <div>
            <Row>
                <Col sm={12} className="col-12">
                    <Card>
                        <Card.Header>
                            <h3 className="card-title mb-0"> Temporary Graduand </h3>
                        </Card.Header>
                        <Card.Body>
                            <div className="">
                                <div className="">
                                    <h4 className='text-center'> <span className='fa fa-list'></span> Failed graduands Upload </h4>
                                    <GraduandTempData/>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default GraduandTemp
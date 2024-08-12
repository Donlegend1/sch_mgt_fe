import React from 'react'
import { useState, useContext, useEffect, useRef } from "react";
import { Card, Row, Col, Modal, Button, Form, FormGroup, Badge } from "react-bootstrap"
import endpoint from "../../../context/endpoint";
import { ErrorAlert, SuccessAlert } from "../../../data/Toast/toast";
import { useParams } from 'react-router-dom';
import { EnrollmentReportByVolumeData } from '../../../data/enrollment/EnrollmentReportByVolumeData';
import Loader from '../../../data/Loader/loader';

const EnrollmentByVolume = () => {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [volumes, setVolumes] = useState([]);
    const [details, setDetails] = useState({
        volume_no: '',
    })

    useEffect(() => {
        getVolumeList();
    }, []);

    //set search details
    const handleBatchChange = (event) => {
        setDetails({ ...details, volume_no: event.target.value });
    };


    //get year of graduation
    const getVolumeList = async () => {
        try {
            const res = await endpoint.get('/profile/list-profile-by-group-volume');
            setVolumes(res.data.data);
        } catch (err) {
            console.log(err);
        }
    };

    const generateReport = async (volume) => {
        setLoading(true)
        await endpoint.post(`/profile/list-profile-by-volume`, { volume_no: volume })
            .then(({ data }) => {
                setLoading(false)
                const modifiedData = data.data.map(item => {
                    const { user_id,
                            title_id,
                            enrollment_id,
                            country_id,
                            state_id,
                            lga_id,
                            status_id,
                            date_of_birth,
                            place_of_birth,
                            passport_url,
                            // contact_address,
                            permanent_home_address,
                            university_attended,
                            law_sch_camp_attended,
                            year_of_admission_law_sch,
                            year_of_call_to_bar,
                            speciment_signature,
                            year_of_graduation,
                            alternative_name,
                            volume_no,
                            createdAt,
                            updatedAt,
                            registrar_id,
                            Registrar,
                            Title,
                            Enrollment,
                            Country,
                            State,
                            Lga,
                            Status, ...rest } = item;
                    return rest;
                });
                setData(modifiedData)
            })
            .catch((err) => {
                setLoading(false)
                console.log(err)
            })
    }

    return (<>
        <div>
            <Row>
                <Col sm={12} className="col-12">
                    <Card>
                        <Card.Header>
                            <h3 className="card-title mb-0"> Enrollment Report By Volume</h3>
                        </Card.Header>
                        <Card.Body>
                            <div className="row">
                                <div className="col-md-8 col-offset-2 mt-4 d-flex align-items-center">

                                    <select className="form-select" style={{ width: '100%', marginTop: '0px' }}
                                        value={details.volume_no} onChange={handleBatchChange}
                                    >
                                        <option value="">Select Volume...</option>
                                        {volumes.map((volume, index) =>
                                            <option key={index + 1} value={volume.volume_no}>{volume.volume_no}</option>
                                        )}
                                    </select>
                                </div>


                            </div>
                            <div className='row'>
                                <div className="col-md-8 justify-content-end d-flex mt-3 mb-8 align-items-center">
                                    <Button variant="primary" onClick={() => generateReport(details.volume_no)}>Generate Report</Button>
                                </div>
                            </div>

                            {loading && <Loader />}
                            {!loading &&
                                <div className="">
                                    <h3 className='text-center'> <span className='fa fa-list'></span> Enrollment Report, Volume {details.volume_no && details.volume_no}</h3>
                                    <EnrollmentReportByVolumeData data={data} />
                                </div>
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>

    </>
    )
}

export default EnrollmentByVolume
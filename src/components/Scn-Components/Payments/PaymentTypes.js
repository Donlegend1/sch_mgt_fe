import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Modal,
  Button,
  Form,
  FormGroup,
  Badge,
} from "react-bootstrap";
import endpoint from "../../../context/endpoint";
import { ErrorAlert, SuccessAlert } from "../../../data/Toast/toast";
import { useParams } from "react-router-dom";
import PaymentList  from "../../../data/Payments/PaymentList";
import Loader from "../../../data/Loader/loader";
const PaymentTypes = () => {
    const [paymentList, setPaymentList] = useState({}); 
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
     const [selected, setSelected] = useState({
       name: "",
       api_key: "",
       secret_key: "",
     });

  useEffect(() => {
    getPaymentList();
  }, []);

  //get year of graduation
  const getPaymentList = async () => {
    try {
      const res = await endpoint.get("/payment/list");
      console.log("temp", res.data.data);
      setPaymentList(res.data.data);
    } catch (err) {
      console.log(err);
    }
    };



      const onClose = () => {
        setOpen(false);
    };


       const onOpen = () => {
         setOpen(true);
       };

    const savePaymentType = async (e) => {
        //   console.log('====================================');
        //   console.log(selected);
        // console.log('====================================');
        onClose();
        e.preventDefault();
        onClose();
        setLoading(true);
        await endpoint
          .post(`/payment/credentials`, selected)
          .then(({ data }) => {
            setLoading(false);
            console.log(data);
            getPaymentList();
            SuccessAlert(data.message);
            setSelected({});
          })
          .catch((err) => {
              setLoading(false);
               onClose();
            console.log(err);
          });
      };

 
  return (
    <div>
      <div>
        <Row>
          <Col
            sm={12}
            className="col-12">
            <div className="d-flex justify-content-end mb-3">
              <div className="text-right">
                {" "}
                {/* Updated this line */}
                <button
                  className="btn btn-primary"
                  onClick={onOpen}>
                  Create New
                </button>
              </div>
            </div>
            <Card>
              <Card.Header>
                <h3 className="card-title mb-0"> List of Payments Types</h3>
              </Card.Header>
              <Card.Body>
                {loading && <Loader />}
                {!loading && (
                  <div className="">
                    {/* <h3 className='text-center'> <span className='fa fa-list'></span> Enrollment Report, Volume {details.volume_no && details.volume_no}</h3> */}
                    <PaymentList
                      data={paymentList}
                      getPaymentList={getPaymentList}
                    />
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
      <Modal
        show={open}
        dialogClassName="modal-lg">
        <Modal.Body className="text-center ">
          <Button
            onClick={onClose}
            className="btn-close"
            variant="">
            x
          </Button>

          <h4 className="text-success mb-4">Payment Gateway Details!</h4>
          <p className="mb-4 mx-4">
            Pls fill in the details for the payment you want to add
          </p>

          <div className="mt-2">
            <label className="text-left">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Please Payment Name"
              value={selected.name}
              onChange={(e) => {
                setSelected({ ...selected, name: e.target.value });
              }}
            />
            <label className="text-left">API Key</label>
            <input
              type="text"
              className="form-control"
              placeholder="Please API Key"
              value={selected.api_key}
              onChange={(e) => {
                setSelected({ ...selected, api_key: e.target.value });
              }}
            />
            <label className="text-left">Secret Key</label>
            <input
              type="text"
              className="form-control"
              placeholder="Please Secret Key"
              value={selected.secret_key}
              onChange={(e) => {
                setSelected({ ...selected, secret_key: e.target.value });
              }}
            />
          </div>

          <button
            className="btn btn-danger pd-x-25 m-1"
            onClick={onClose}>
            Cancel
          </button>

          <button
            className="btn btn-success pd-x-25 "
            onClick={(e) => savePaymentType(e)}>
            Submit
          </button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PaymentTypes;

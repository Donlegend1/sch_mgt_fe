import React, { useState, useEffect } from "react";
import { Card, Row, Col, Table, Modal, Button } from "react-bootstrap";
import Loader from "../Loader/loader";
import { Link } from "react-router-dom";
import endpoint from "../../context/endpoint";
import { Context } from "../../context/Context";
import moment from "moment";
import { ErrorAlert, SuccessAlert } from "../Toast/toast";

const PaymentList = ({ data, getPaymentList }) => {
  const [isLoading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [detailsModalShow, setDetailsModalShow] = useState(false);
  const [activateModalShow, setActivateModalShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  const handleViewDetails = (item) => {
    setSelectedItem(item);
    setDetailsModalShow(true);
  };

  const handleActivate = (item) => {
    setSelectedItem(item);
    setActivateModalShow(true);
  };

  const handleCloseDetailsModal = () => {
    setDetailsModalShow(false);
  };

  const handleCloseActivateModal = () => {
    setActivateModalShow(false);
  };

  const handleActivateSubmit = async () => {
    try {
      const res = await endpoint.post(
        `/payment/credential-activate/${selectedItem.id}`
      );
      console.log("temp", res.data.data);
      SuccessAlert(res.data.message);
      getPaymentList();
      handleCloseActivateModal();
    } catch (err) {
      console.log(err);
      handleCloseActivateModal();
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Card>
            <Card.Body>
              <Row>
                <Col md={12}>
                  <Table
                    striped
                    bordered
                    hover
                    responsive>
                    <thead>
                      <tr>
                        <th>S/N</th>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Public Test Key</th>
                        <th>Status</th>

                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data &&
                        data.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>
                              {item.credential
                                ? item.credential.exchange_rate
                                : ""}
                            </td>
                            <td>
                              {item.credential
                                ? item.credential.public_test_key
                                : ""}
                            </td>
                            <td>
                              {item.status === 1 ? "Active" : "Not Active"}
                            </td>
                            <td>
                              <Button
                                variant="link"
                                onClick={() => handleViewDetails(item)}>
                                View Details
                              </Button>
                              <Button
                                variant="link"
                                onClick={() => handleActivate(item)}>
                                Activate
                              </Button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          {/* Modal for viewing row details */}
          <Modal
            show={detailsModalShow}
            onHide={handleCloseDetailsModal}
            centered>
            <Modal.Header closeButton>
              <Modal.Title>Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedItem && (
                <div>
                  <p>Name: {selectedItem.name}</p>
                  <p>
                    Exchange Rate:{" "}
                    {selectedItem.credential
                      ? selectedItem.credential.exchange_rate
                      : ""}
                  </p>
                  <p>
                    Public Test Key:{" "}
                    {selectedItem.credential
                      ? selectedItem.credential.public_test_key
                      : ""}
                  </p>
                  {/* Add more details as needed */}
                </div>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={handleCloseDetailsModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          {/* Modal for activating row */}
          <Modal
            show={activateModalShow}
            onHide={handleCloseActivateModal}
            centered>
            <Modal.Header closeButton>
              <Modal.Title>Activate</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to activate this item?
              {selectedItem && (
                <div>
                  <p>Name: {selectedItem.name}</p>
                  <p>
                    Exchange Rate:{" "}
                    {selectedItem.credential
                      ? selectedItem.credential.exchange_rate
                      : ""}
                  </p>
                  <p>
                    Public Test Key:{" "}
                    {selectedItem.credential
                      ? selectedItem.credential.public_test_key
                      : ""}
                  </p>
                  {/* Add more details as needed */}
                </div>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={handleCloseActivateModal}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleActivateSubmit}>
                Activate
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </>
  );
};

export default PaymentList;

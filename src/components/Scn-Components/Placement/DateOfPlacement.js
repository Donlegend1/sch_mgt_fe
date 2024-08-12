import React, { useState, useEffect } from "react";
import { Card, Row, Col, Table, Modal, Button } from "react-bootstrap";
import Loader from "../../../data/Loader/loader";
import { Link } from "react-router-dom";
import endpoint from "../../../context/endpoint";
import { Context } from "../../../context/Context";
import moment from "moment";
import { ErrorAlert, SuccessAlert } from "../../../data/Toast/toast";

const DateOfPlacementList = () => {
  const [isLoading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState({});
  const [detailsModalShow, setDetailsModalShow] = useState(false);
  const [data, setData] = useState([]);

  const [details, setDetails] = useState({
    date: "",
    status: "",
  });

  useEffect(() => {
    getDateOfPlacement();
  }, []);

  const handleViewDetails = (item) => {
    setSelectedItem(item);
    setDetails({
      date: item.date,
      status: item.status.toString(), // Convert status to string for consistency
    });
    setDetailsModalShow(true);
  };

  const handleCloseDetailsModal = () => {
    setDetailsModalShow(false);
  };

  const handleUpdate = async () => {
    try {
      const res = await endpoint.put(`/placement/${selectedItem.id}`, details);
      SuccessAlert(res.data.message);
      setDetailsModalShow(false);
      getDateOfPlacement();
    } catch (err) {
      console.log(err);
    }
  };

  const getDateOfPlacement = async () => {
    try {
      const res = await endpoint.get(`/placement/all`);
      setData(res.data.data || []);
      setLoading(false);
    } catch (err) {
      console.log(err);
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
                        <th>Date</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{moment(item.date).format("YYYY-MM-DD")}</td>
                          <td>{item.status === 1 ? "Active" : "Inactive"}</td>
                          <td>
                            <Button
                              variant="link"
                              onClick={() => handleViewDetails(item)}>
                              Update
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
          <Modal
            show={detailsModalShow}
            onHide={handleCloseDetailsModal}
            centered>
            <Modal.Header closeButton>
              <Modal.Title>Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <label htmlFor="date">Date</label>
              <input
                type="date"
                className="form-control"
                name="date"
                value={details.date}
                onChange={(e) =>
                  setDetails({ ...details, date: e.target.value })
                }
              />
              <label htmlFor="status">Status</label>
              <select
                className="form-control"
                name="status"
                value={details.status}
                onChange={(e) =>
                  setDetails({ ...details, status: e.target.value })
                }>
                <option value="">-- Select --</option>
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={handleCloseDetailsModal}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={handleUpdate}>
                Update
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </>
  );
};

export default DateOfPlacementList;

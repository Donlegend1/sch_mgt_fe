import React from "react";
import { useState, useContext, useEffect, useRef } from "react";
import { Card, Row, Col, Modal, Button } from "react-bootstrap"
import DataTable from "react-data-table-component";
import endpoint from "../../context/endpoint";
import { Context } from "../../context/Context";
import moment from 'moment';
import { ErrorAlert, SuccessAlert } from "../Toast/toast";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Loader from "../Loader/loader";
import './assign.css';  

export const CreateAmount = () => {
  const { user } = useContext(Context);
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  
  const handlePageChange = page => {
    setPage(page);
  }

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [idToDelete, setIdToDelete] = useState('')

  const handlePerRowsChange = async (newPerPage, page) => {
    setPerPage(newPerPage);
  }

  // const [status, setStatus] = useState(1); // 1 for true, 0 for false
  const [amount, setAmount] = useState({
    figure: '',
  });

  const [newAmount, setNewAmount] = useState({
    amount_id:'', figure:''
  })


  const [newToggle, setNewToggle] = useState({
    toggle_id: ''
  });

 
  useEffect(() => {
    getAllData();
  }, []);


  const getAllData = async () => {
    await endpoint.get(`/amount/get-all-amounts`)
      .then((res) => {
        console.log("all payment amount", res.data.data)
        setData(res.data.data)
      })
      .catch((err) => console.log(err))
  } 
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("amount", amount);

   
    await endpoint.post(`/amount/create-amount`, amount).then(res => {
      console.log(res);
      setAmount({ figure: '', status: true }); // Reset status to default
      getAllData();
      SuccessAlert(res.data.message);
      setLoading(false);
    }).catch((err) => {
      setLoading(false);
      ErrorAlert(err.response.data.message);
      console.log(err);
    });
  };


  const onEdit = (row) => {
    console.log("amount to edit", row.id)
    setNewAmount({...newAmount, amount_id:row.id, figure:row.figure})
    setOpen(true);
    console.log("amount to update", newAmount)
  }
 
  const handleEdit = async () => {
    setLoading(true);
    await endpoint.put(`/amount/update-amount/${newAmount.amount_id}`, newAmount)
      .then((res) => {
        console.log(res.data);
        getAllData();
        setLoading(false);
        setOpen(false);
        SuccessAlert(res.data.message);
      })
      .catch((err) => {
        setLoading(false);
        ErrorAlert(err.response.data.message);
        console.log(err);
      });
  };
  
  const onToggle = async (row) => {
    const newStatus = row.status ? 0 : 1; // Toggle status between 0 and 1
    await endpoint.put(`/amount/select-amount/${row.id}`, { status: newStatus })
        .then((res) => {
            console.log("update status", res.data);
            getAllData();
            setLoading(false);
            setOpen(false);
            SuccessAlert(res.data.message);
        })
        .catch((err) => {
            setLoading(false);
            ErrorAlert(err.response.data.message);
            console.log(err);
        });
};

const getStatusColor = (status) => {
    return status ? "green" : "red"; // Return green for status 1, red for status 0
};


  const onDelete = (row) => {
    console.log("amount to delete", row.id)
    setOpen(false);
    setIdToDelete(row.id);
    setDeleteOpen(true);
  }
  

  const handleDelete = async (e) => {
    console.log("amount to delete", idToDelete)
    e.preventDefault()
    await endpoint.delete(`/amount/delete-amount/${idToDelete}`).then((res) => {
      console.log(res.data)
      SuccessAlert(res.data.message)
      getAllData()
      setLoading(false)
      setDeleteOpen(false);
    }).catch((err) => {
      setLoading(false)
      ErrorAlert(err.response.data.message)
      console.log(err)
    })
  }

//   const getSliderPosition = (status) => {
//     return status ? "translateX(16px)" : "translateX(0px)"; // Move right for status 1, left for status 0
// };

  const reset = () => {
    setId("")
    setAmount("")
  }

  const onClose = () => {
    reset();
    setOpen(false);
    setDeleteOpen(false);
  }

  const columns = [
    {
      name: "#",
      cell: (row, index) => (index + 1) + ((page - 1) * perPage),
      width: "10%"
    },
    {
      name: "Amount",
      selector: (row) => [row.figure],
      sortable: true,
      width: "20%",
      cell: (row) => (
        <h6 className="fs-12 fw-semibold">{row.figure}</h6>
      ),
    },
    {
      name: "Status",
      selector: (row) => [row.status],
      sortable: true,
      width: "20%",
      cell: (row) => (
        <h6 className="fs-12 fw-semibold">
          {row.status ? "Active" : "Inactive"}
        </h6>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <Row>
          <Col xs={4} style={{ paddingRight: "0px", paddingLeft: "0px" }}>
            <label className="switch">
              <input
                type="checkbox"
                checked={row.status === 1}
                onClick={() => {
                  onToggle(row);
                }}
              />
              <span className={`slider round ${row.status ? 'active' : ''}`} style={{ backgroundColor: getStatusColor(row.status) }}></span>
            </label>
          </Col>
          <Col xs={4} style={{ paddingRight: "0px", paddingLeft: "0px" }}>
            <button 
              className="btn btn-sm btn-secondary" 
              onClick={(e) => { onEdit(row) }} 
              variant="secondary" title="Action" size="sm">
              Edit
            </button>
          </Col>
          <Col xs={4}>
            <Button
              className="btn btn-sm btn-danger"
              onClick={(e) => { onDelete(row) }}
              variant="danger"
              title="Action"
              size="sm"
            >
              Delete
            </Button>
          </Col>
        </Row>
      ),
    },
  ];
  
  
  

  return (
    <>
      {isLoading ?

        <Loader /> :

        <div>
          <div id="page-wrapper" className="box box-default">
            <div className="container-fluid">
              <div className="col-md-12 text-success">
              </div>
              <br />
              <hr />
              <Row className="row">
                <Col xs={2} md={2}></Col>
                <Col xs={8} md={8} > <br />

                  <Card >
                  <Card.Body>
                    <form onSubmit={handleSubmit}>
                      {/* Amount Input */}
                      <div className="form-group">
                        <label className="col-md-6 cecontrol-label">Amount</label>
                        <div className="col-md-12">
                          <input
                            type="text"
                            className="form-control"
                            name="figure"
                            placeholder="Enter Amount"
                            value={amount.figure}
                            onChange={(e) => {
                              setAmount({ ...amount, figure: e.target.value });
                            }}
                            required
                          />
                        </div>
                      </div>

                      {/* Submit Button */}
                      <div className="form-group">
                        <div className="col-sm-offset-2 text-center col-sm-9">
                          <button type="submit" className="btn btn-success pull-right">
                            Add Amount
                          </button>
                        </div>
                      </div>
                    </form>
                  </Card.Body>
                  </Card>
                </Col>
                <Col xs={3} md={4}></Col>
              </Row>
            </div>
          </div>
          <Card >
            <Card.Body >
              <h3 className="text-center">AMOUNT</h3>
              <Row className="row">
                <Col md={12} className="col-md-12">
                  <DataTable
                    columns={columns}
                    // selectableRows
                    data={data}
                    defaultSortField="id"
                    defaultSortAsc={false}
                    striped={true}
                    center={true}
                    pagination
                    onChangePage={handlePageChange}
                    onChangeRowsPerPage={handlePerRowsChange}
                    paginationRowsPerPageOptions={[10, 15, 20, 25, 30, 50, 100]}

                    paginationPerPage={perPage}
                    highlightOnHover
                  />

                  <Modal show={open} >

                    <Modal.Body className="text-center p-4">
                      <DialogTitle>Edit Amount
                        <Button
                          onClick={onClose}
                          className="btn-close"
                          variant=""
                          disabled={isLoading}
                        >
                          x
                        </Button>
                      </DialogTitle>
                      <DialogContent>

                        <Row className="row">

                          <Col  > <br />

                            <Card >

                              <Card.Body>
                                <form className="form-horizontal">
                                  <div className="form-group">
                                    <label className="col-md-6  cecontrol-label">Amount</label>
                                    <div className="col-md-12">
                                      <input id="figure" type="text" className="form-control" 
                                      defaultValue={newAmount.figure} 
                                      onChange={(e) => setNewAmount({...newAmount, figure: e.target.value })} 
                                      required />
                                    </div>
                                  </div>
                                </form>
                              </Card.Body>

                            </Card>
                          </Col>
                          <Row>
                            <Col style={{ display: 'flex', justifyContent: 'center', marginLeft: "60px" }}>
                              <Button onClick={onClose} disabled={isLoading} variant="danger" className="me-1">Cancel</Button>
                            </Col>
                            <Col style={{ display: 'flex', justifyContent: 'center', marginLeft: "60px" }}>
                              <Button 
                              onClick={handleEdit} 
                              disabled={isLoading} variant="success" className={isLoading ? "me-1  btn-loading" : "me-1"}> {isLoading ? "Save" : "Save"}</Button>
                            </Col>
                          </Row>
                        </Row>

                      </DialogContent>
                      <DialogActions>

                      </DialogActions>
                      {/* </Dialog> */}
                    </Modal.Body>

                  </Modal>
                  <Modal show={deleteOpen}>
                    <Modal.Body className="text-center p-4">
                      <DialogTitle>Delete Amount
                        <Button
                          onClick={onClose}
                          className="btn-close"
                          variant=""
                          disabled={isLoading}
                        >
                          x
                        </Button>
                      </DialogTitle>
                      <DialogContent>
                        <div>
                          <div className="modal-body">
                            <p>Do you really want to delete <span className="fw-bold">
                              </span> amount? <br /> This process cannot be undone.</p>
                          </div>
                          <Row>
                            <Col xs={5} md={5} align="right">
                              <button type="button" className="btn btn-sm btn-secondary" disabled={isLoading} onClick={onClose}>Cancel</button>
                            </Col>
                            <Col xs={1} md={1}  ></Col>
                            <Col xs={5} md={5} align="left">
                              <button 
                                onClick={handleDelete} 
                                disabled={isLoading} className="btn btn-sm btn-danger">Yes, Delete </button>
                            </Col>
                          </Row>
                        </div>
                      </DialogContent>
                    </Modal.Body>
                  </Modal>
                </Col>
              </Row>
              {/* <!-- /.col -->  */}

            </Card.Body>
          </Card>

        </div>
      }
    </>
  )
  
}
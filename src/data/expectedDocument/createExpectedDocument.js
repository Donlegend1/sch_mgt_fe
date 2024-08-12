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
import { log } from "nvd3";
import { useForm } from "react-hook-form";

export const CreateExpectedDocument = () => {
  const { user } = useContext(Context);
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const {
		register,
		formState: { errors },
	} = useForm();

  
  const [expdoc, setExpDoc] = useState({
    name: '', rank: ''
  });

  const [newExpDoc, setNewExpDoc] = useState({
    expdoc_id:'', name:'', rank: ''
  })

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [idToDelete, setIdToDelete] = useState('')


  const rankLevel = [
    {label:"1"},{label:"2"},{label:"3"},{label:"4"},{label:"5"},
    {label:"6"},{label:"7"},{label:"8"},{label:"9"},{label:"10"}
    ,{label:"12"},{label:"13"},{label:"14"},{label:"15"}
    ,{label:"16"},{label:"17"}
  ]



  useEffect(() => {
    getAllData();
  }, []);


  const getAllData = async () => {
    await endpoint.get(`/enrollmentdocument/list-expected-enrollment-document`)
      .then((res) => {
        console.log("all titles", res.data.data)
        setData(res.data.data)
      })
      .catch((err) => console.log(err))
  } 

  const handlePageChange = page => {
    setPage(page);
  }

  const handlePerRowsChange = async (newPerPage, page) => {
    setPerPage(newPerPage);

  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
   await endpoint.post(`/enrollmentdocument/create-expected-enrollment-document`, expdoc).then(res => {
        console.log(res)
        setExpDoc({ ...expdoc, name:"", rank: ""})
        getAllData()
        SuccessAlert(res.data.message);
        setLoading(false);

    }).catch((err) => {
        setLoading(false);
        ErrorAlert(err.response.data.message)
        console.log(err)
    });
}


  const onEdit = (row) => {
    // console.log("title to edit", row.id)
    setNewExpDoc({...newExpDoc, expdoc_id:row.id, name:row.name, rank:row.rank})
    setOpen(true);
    // console.log("title to update", newTitle)
  }

  const handleEdit = async () => {
    // console.log("title id to update", newTitle.title_id)
    setLoading(true)
    // console.log("my updating data", newTitle)
    await endpoint.put(`/enrollmentdocument/edit-expected-enrollment-document/${newExpDoc.expdoc_id}`, newExpDoc).then((res) => {
      console.log(res.data);
      getAllData()
      setLoading(false)
      setOpen(false);
      SuccessAlert(res.data.message)

    }).catch((err) => {
      setLoading(false)
      ErrorAlert(err.response.data.message)
      console.log(err)
    })
  }


  const onDelete = (row) => {
    // console.log("title to delete", row.id)
    setOpen(false);
    setIdToDelete(row.id);
    setDeleteOpen(true);
  }

  const handleDelete = async (e) => {
    // console.log("title2 to delete", idToDelete)
    e.preventDefault()
    await endpoint.delete(`/enrollmentdocument/delete-expected-enrollment-document/${idToDelete}`).then((res) => {
          console.log(res.data)
          SuccessAlert(res.data.message)
          getAllData()
          setLoading(false)
          setDeleteOpen(false);
    }).catch((err) => {
      ErrorAlert(err.response.data.message)
      console.log(err)
    })
  }

  const reset = () => {
    // setTitle("");
    setId("")
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
      name: "Document Name",
      selector: (row) => [row.name],
      sortable: true,
      width: "30%",
      cell: (row) => (
        <h6 className="fs-12 fw-semibold">{row.name}</h6>
      ),
    },
    {
      name: "Rank",
      selector: (row) => [row.rank],
      sortable: true,
      width: "30%",
      cell: (row) => (
        <h6 className="fs-12 fw-semibold">{row.rank}</h6>
      ),
    },
    {
      name: "Action",
      cell: (row) => (<Row > <Col xs={4} style={{ paddingRight: "0px", paddingLeft: "0px" }}><button className="btn btn-sm btn-secondary" 
      onClick={(e) => { onEdit(row) }} 
      variant="secondary" title="Action" size="sm">Edit</button>

      </Col><Col xs={4}>
        <button className="btn btn-sm btn-danger" 
            onClick={(e) => { onDelete(row) }} 
            variant="danger" title="Action" size="sm"
          >Delete
        </button>
      </Col>
      </Row>)
    },

  ];

  return (
    <>
      {load ?

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
                        <div className="form-group">
                          <label className="col-md-6">Name</label>
                          <div className="col-md-12">
                            <input type="text" className="form-control"
                            value={expdoc.name}
                            onChange={(e) => {
                              setExpDoc({...expdoc, name: e.target.value})
                            }} 
                            required />
                          </div>
                        </div>
                        
                        <div className="col">
                          <label>Rank</label>
                          <select
                            className="form-select"
                            style={{ width: "100%", marginTop: "0px" }}
                            {...register("rank")}
                                onChange={(e) =>
                                  setExpDoc({ ...expdoc, rank: e.target.value })
                            }
                            value={expdoc.rank}
                          >
                           <option value=""> ---Select--- </option>
                              {rankLevel.map(rak => (<option value={rak.label}>{rak.label}</option>))}
                          </select>
                        </div>

                        <div className="form-group">
                          <div className="col-sm-offset-2 text-center col-sm-9">
                            <button className={isLoading ? "btn btn-success pull-right btn-loading" : "btn btn-success pull-right"} disabled={isLoading} 
                            onClick={handleSubmit}
                            >Add</button>
                          </div>
                        </div>
                    </Card.Body>

                  </Card>
                  
                </Col>
                <Col xs={3} md={4}></Col>
              </Row>
            </div>
          </div>
          <Card >
            <Card.Body >
              <h3 className="text-center">ALL EXPECTED DOCUMENTS</h3>
              <Row className="row">
                <Col md={12} className="col-md-12">
                  <DataTable
                    //  fixedHeader
                    columns={columns}
                    // selectableRows
                    data={data}
                    // customStyles={customStyles}
                    // persistTableHead
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
                      <DialogTitle>Edit Expected Document
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
                          <Col> <br />

                            <Card>

                              <Card.Body>
                                <form className="form-horizontal">
                                  <div className="form-group">
                                    <label className="col-md-6  cecontrol-label">Name</label>
                                    <div className="col-md-12">
                                      <input type="text" className="form-control" 
                                      defaultValue={newExpDoc.name} 
                                      onChange={(e) => setNewExpDoc({...newExpDoc, name: e.target.value })} 
                                      required />
                                    </div>
                                  </div>
                                  <div className="col">
                                    <label>Rank</label>
                                    <select
                                      className="form-select"
                                      style={{ width: "100%", marginTop: "0px" }}
                                      onChange={(e) => { 
                                        setNewExpDoc({ ...newExpDoc, rank: e.target.value }) }
                                        }
                                        defaultValue={newExpDoc.rank}
                                    >
                                    <option value=""> ---Select--- </option>
                                        {rankLevel.map(rank => (<option value={rank.label}>{rank.label}</option>))}
                                    </select>
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
                               disabled={isLoading} variant="success" className={isLoading ? "me-1  btn-loading" : "me-1"}> {isLoading ? "Update" : "Update"}</Button>
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
                      <DialogTitle>Delete Title
                        <Button
                          onClick={onClose}
                          className="btn-close"
                          variant=""
                        >
                          x
                        </Button>
                      </DialogTitle>
                      <DialogContent>
                        <div>

                          <div className="modal-body">
                            <p>Do you really want to delete <span className="fw-bold"></span> expected document? <br /> This process cannot be undone.</p>
                          </div>

                          <Row>
                            <Col xs={5} md={5} align="right">
                              <button type="button" className="btn btn-sm btn-secondary" 
                              onClick={onClose}
                              >Cancel</button>
                            </Col>
                            <Col xs={1} md={1}  ></Col>
                            <Col xs={5} md={5} align="left">
                              <button 
                              onClick={handleDelete}
                               className="btn btn-sm btn-danger">Yes, Delete </button>
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
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

export const CreateTitle = () => {
  const { user } = useContext(Context);
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);


  const [title, setTitle] = useState({
    name: '',
  });

  const [newTitle, setNewTitle] = useState({
    title_id:'', name:''
  })

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [idToDelete, setIdToDelete] = useState('')

  useEffect(() => {
    getAllData();
  }, []);


  const getAllData = async () => {
    await endpoint.get(`/title/list`)
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
   await endpoint.post(`/title/create`, title).then(res => {
        console.log(res)
        setTitle({ ...title, name:" "})
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
    setNewTitle({...newTitle, title_id:row.id, name:row.name})
    setOpen(true);
    // console.log("title to update", newTitle)
  }

  const handleEdit = async () => {
    // console.log("title id to update", newTitle.title_id)
    setLoading(true)
    // console.log("my updating data", newTitle)
    await endpoint.put(`title/edit/${newTitle.title_id}`, newTitle).then((res) => {
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
    await endpoint.delete(`/title/delete/${idToDelete}`).then((res) => {
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
      name: "Title Name",
      selector: (row) => [row.name],
      sortable: true,
      width: "30%",
      cell: (row) => (
        <h6 className="fs-12 fw-semibold">{row.name}</h6>
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
                      <div className="form-horizontal">
                        <div className="form-group">
                          <label className="col-md-6  cecontrol-label">Title Name</label>
                          <div className="col-md-12">
                            <input type="text" className="form-control"
                            value={title.name}
                            onChange={(e) => {
                              setTitle({...title, name: e.target.value})
                            }} 
                            required />
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="col-sm-offset-2 text-center col-sm-9">
                            <button className={isLoading ? "btn btn-success pull-right btn-loading" : "btn btn-success pull-right"} disabled={isLoading} 
                            onClick={handleSubmit}
                            >Add Title</button>
                          </div>
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
              <h3 className="text-center">ALL TITLE</h3>
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
                      <DialogTitle>Edit Title
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
                                    <label className="col-md-6  cecontrol-label">Title Name</label>
                                    <div className="col-md-12">
                                      <input id="name" type="text" className="form-control" 
                                      defaultValue={newTitle.name} 
                                      onChange={(e) => setNewTitle({...newTitle, name: e.target.value })} 
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
                            <p>Do you really want to delete <span className="fw-bold"></span> title? <br /> This process cannot be undone.</p>
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
import React, { useState, useContext, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import "react-data-table-component-extensions/dist/index.css";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { OverlayTrigger, Tooltip, Badge } from "react-bootstrap";
import endpoint from "../../context/endpoint";
import { Context } from "../../context/Context";
import moment from "moment";
import Loader from "../Loader/loader";
import { Modal, FormGroup, Form } from "react-bootstrap";
import { ErrorAlert, SuccessAlert } from "../../data/Toast/toast";
import { useForm } from "react-hook-form";
import {
  CForm,
  CCol,
  CFormLabel,
  CFormFeedback,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CButton,
  CFormCheck,
} from "@coreui/react";


import {
  DropdownButton,
  ButtonGroup,
  Card,
  Button,
  Row,
  Col,
  InputGroup,
  Dropdown,
} from "react-bootstrap";


export const Users = () => {
     const {
       handleSubmit,
       register,
       formState: { errors },
       reset,
     } = useForm();
  const [data, setUsersList] = useState([]);
  const [roles, setUsersRoles] = useState([]);

  const [isLoading, setLoading] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
  const [value, setValue] = useState({
    fullname: "",
    email: "",
    password: "",
    role_id: ""
  });

  useEffect(() => {
   
    getUsersList();
    getUsersroles();
  }, []);

  //get users
     const getUsersList = async () => {
       setLoading(true);
       await endpoint
         .get("/user/list")
         .then((res) => {
           setUsersList(res.data.data);
           setLoading(false);
         })
         .catch((err) => {
           setLoading(false);
           // console.log(err)
         });
  };
   const getUsersroles = async () => {
     setLoading(true);
     await endpoint
       .get("/role/getroles")
       .then((res) => {
         setUsersRoles(res.data.data);
         setLoading(false);
       })
       .catch((err) => {
         setLoading(false);
         // console.log(err)
       });
   };
  
  const modifyUser = async (data) => {
    await endpoint
      .put(`/user/edit/${value.id}`, value)
      .then((res) => {
        setLoading(false);
        SuccessAlert(res.data.message);
        getUsersList();
        setShowEditModal(false);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          ErrorAlert(error.response.data.description);
        }
      });
    };
      const handleShowEditModal = (row) => {
        setValue(row);
        setShowEditModal(true);
        // console.log("user:",row);
        reset();
      };

  const columns = [
    {
      name: "S/N.",
      cell: (row, index) => index + 1,
      width: "65px",
    },

    {
      name: "NAME",
      selector: (row) => [row.fullname],

      style: { textAlign: "right" },
      sortable: true,

      width: "300px",
      cell: (row) => (
        <div className="fs-12 fw-bold ">
          {row.fullname !== null ? row.fullname.toUpperCase() : ""}{" "}
        </div>
      ),
    },
    {
      name: "Email",
      selector: (row) => [row.email],

      style: { textAlign: "right" },
      sortable: true,

      width: "130px",
      cell: (row) => (
        <div className="fs-12 fw-bold ">
          {row.email !== null ? row.email : ""}
        </div>
      ),
    },
    // {
    //   name: "PHONE",
    //   selector: (row) => [row.phone],

    //   style: { textAlign: "right" },
    //   sortable: true,

    //   width: "200px",
    //   cell: (row) => (
    //     <div className="fs-12 fw-bold ">
    //       {row.phone !== null ? row.phone : ""}
    //     </div>
    //   ),
    // },

    {
      name: "Action",
      style: { textAlign: "right" },
      // width: "120px",
      cell: (row) => (
        <div className="fs-12 fw-bold ">
          <button
            className="btn btn-warning btn-sm my-1"
            variant="warning"
            onClick={() => handleShowEditModal(row)}>
            <span className="fe fe-edit"> </span>
          </button>
        </div>
      ),
    },
  ];

  const tableDatas = {
    columns,
    data,
  };

  return (
    <>
      {
        <DataTableExtensions {...tableDatas}>
          {isLoading ? (
            <Loader />
          ) : (
            <DataTable
              fixedHeader
              columns={columns}
              // selectableRows
              data={data}
              // customStyles={customStyles}
              persistTableHead
              defaultSortField="id"
              defaultSortAsc={false}
              striped={true}
              center={true}
              pagination
              // paginationServer
              // paginationTotalRows={totalRows}
              // onChangePage={handlePageChange}
              // onChangeRowsPerPage={handlePerRowsChange}
              paginationRowsPerPageOptions={[10, 15, 20, 25, 30, 50, 100]}
              // onChangeRowsPerPage(currentRowsPerPage, currentPage)
              // paginationPerPage={perPage}
              highlightOnHover
            />
          )}
        </DataTableExtensions>
      }
      <Modal show={showEditModal}>
        <Modal.Header>
          <Button
            onClick={() => setShowEditModal(false)}
            className="btn-close"
            variant="">
            x
          </Button>
        </Modal.Header>
        <CForm
          onSubmit={handleSubmit(modifyUser)}
          className="row g-3 needs-validation">
          <Modal.Body>
            <div>
              <Card>
                <Card.Header>
                  <Card.Title as="h3">Update User Password</Card.Title>
                </Card.Header>
                <Card.Body>
                  <h5>
                    pls input new passord for <span> {value.fullname} </span> to
                    change password
                  </h5>
                  <Col
                    lg={12}
                    md={12}>
                    <FormGroup>
                      <label htmlFor="exampleInputname">Full Name</label>
                      <Form.Control
                        type="text"
                        name="fullname"
                        defaultValue={value.fullname}
                        onChange={(e) => {
                          setValue({ ...value, fullname: e.target.value });
                        }}
                        className="form-control"
                      />
                    </FormGroup>
                  </Col>
                  <Col
                    lg={12}
                    md={12}>
                    <FormGroup>
                      <label htmlFor="exampleInputname">Email</label>
                      <Form.Control
                        defaultValue={value.email}
                        type="text"
                        name="email"
                        onChange={(e) => {
                          setValue({ ...value, email: e.target.value });
                        }}
                        className="form-control"
                      />
                    </FormGroup>
                  </Col>
                  <Col
                    lg={12}
                    md={12}>
                    <FormGroup>
                      <label htmlFor="exampleInputname"> Password</label>
                      <Form.Control
                        type="text"
                        name="password"
                        className="form-control"
                        onChange={(e) => {
                          setValue({ ...value, password: e.target.value });
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col
                    lg={12}
                    md={12}>
                    <FormGroup>
                      <label htmlFor="exampleInputname">Role</label>
                      <select
                        defaultValue={value.role_id}
                        className="form-control"
                        name="role_id"
                        id=""
                        onChange={(e) => {
                          setValue({ ...value, role_id: e.target.value });
                        }}>
                        <option value="">--select--</option>
                        {roles &&
                          roles.map((role) => (
                            <option value={role.id}>{role.role_name}</option>
                          ))}
                      </select>
                    </FormGroup>
                  </Col>
                </Card.Body>
              </Card>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="warning"
              className="me-1"
              onClick={() => setShowEditModal(false)}>
              Close
            </Button>
            <Button
              variant="primary"
              type="submit"
              className="me-1">
              <span className="fe fe-arrow-right"></span> Save
            </Button>
          </Modal.Footer>
        </CForm>
      </Modal>
    </>
  );
};

import React, { useState, useContext, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import "react-data-table-component-extensions/dist/index.css";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { OverlayTrigger, Tooltip, Badge } from "react-bootstrap";
import endpoint from "../../context/endpoint";
import { Context } from "../../context/Context";
import moment from 'moment';
import Loader from "../Loader/loader";

export const RecordOfService = () => {

  const [data, setUsersList] = useState('')
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const getUsersList = async () => {
      setLoading(true);
      await endpoint.get('/user/profiles/documented/all/show')
        .then((res) => {
          console.log("users list response", res.data.data)
          setUsersList(res.data.data)
          setLoading(false)
        })
        .catch((err) => {
          setLoading(false)
          console.log(err)
        })
    }
    getUsersList()
  }, [])


  const columns = [
    {
      name: "#",
      cell: (row, index) => (index + 1),
      width: "65px",
    },
    {
      name: "First Name",
      selector: (row) => [row.first_name],

      style: { textAlign: 'right' },
      sortable: true,

      width: "180px",
      cell: (row) =>
        <div className="fs-12 fw-bold ">{row.first_name !== null ? (row.first_name).toUpperCase() : ""}</div>
      ,
    },
    {
      name: "Last Name",
      selector: (row) => [row.last_name],

      style: { textAlign: 'right' },
      sortable: true,

      width: "180px",
      cell: (row) =>
        <div className="fs-12 fw-bold ">{row.last_name !== null ? (row.last_name).toUpperCase() : ""}</div>
      ,
    },
    {
      name: "Other Name",
      selector: (row) => [row.other_name],

      style: { textAlign: 'right' },
      sortable: true,

      width: "180px",
      cell: (row) =>
        <div className="fs-12 fw-bold ">{row.other_name !== null ? (row.other_name).toUpperCase() : ""}</div>
      ,
    },
    {
      name: "Email",
      selector: (row) => [row.User.email],

      style: { textAlign: 'right' },
      sortable: true,

      width: "300px",
      cell: (row) =>
        <div className="fs-12 fw-bold ">{row.User.email !== null ? (row.User.email) : ""}</div>
      ,
    },
    // {
    //   name: "Status",
    //   selector: (row) => [row.Status.name],

    //   style: { textAlign: 'right' },
    //   sortable: true,

    //   width: "200px",
    //   cell: (row) =>
    //     <div className="fs-12 fw-bold ">
    //       <Badge bg={row.Status.color} className="badge bg-warning me-1 mb-1 mt-1">
    //         {(row.Status.name)}
    //       </Badge>
    //     </div>
    //   ,
    // },
    {
      name: "Actions",
      selector: (row) => [row.id],

      style: { textAlign: 'right' },
      sortable: true,

      // width: "120px",
      cell: (row) =>
        <div className="fs-12 fw-bold ">
          <Link to={`/record-of-service/${row.id}`} target="_blank" className="btn btn-primary btn-sm"> <span className="fe fe-edit"> Record of Service </span></Link>
        </div>
    }

  ]

  const tableDatas = {
    columns,
    data,
  };

  return (
    <>
      {
        <DataTableExtensions {...tableDatas}>
          {isLoading ? <Loader />
            : <DataTable
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
              paginationServer
              // paginationTotalRows={totalRows}
              // onChangePage={handlePageChange}
              // onChangeRowsPerPage={handlePerRowsChange}
              paginationRowsPerPageOptions={[10, 15, 20, 25, 30, 50, 100]}
              // onChangeRowsPerPage(currentRowsPerPage, currentPage)
              // paginationPerPage={perPage}
              highlightOnHover
            />
          }

        </DataTableExtensions>
      }
    </>
  )

};

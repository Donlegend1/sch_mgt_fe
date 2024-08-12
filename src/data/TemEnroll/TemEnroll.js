import React from "react";
import { useState, useContext, useEffect, useRef } from "react";
import { Card, Row, Col, Modal, Button, Form, Badge } from "react-bootstrap"
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import endpoint from "../../context/endpoint";
import { ErrorAlert, SuccessAlert } from "../Toast/toast";
import Loader from "../Loader/loader";
import { Link } from "react-router-dom";

export const TemEnrollData = ({ data }) => {

    const [isLoading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    // const formatDate = (dateString) => {
    //     const date = new Date(dateString);
    //     const options = { day: 'numeric', month: 'long', year: 'numeric' };
    //     const formattedDate = date.toLocaleDateString('en-US', options);
      
    //     // Convert day to include the appropriate suffix (e.g., 1st, 2nd, 3rd, 4th, etc.)
    //     const day = date.getDate();
    //     const suffix = getDaySuffix(day);
    //     return formattedDate.replace(/\b\d{1,2}\b/, `${day}${suffix}`);
    //   };
      
    //   const getDaySuffix = (day) => {
    //     if (day >= 11 && day <= 13) {
    //       return 'th';
    //     }
    //     switch (day % 10) {
    //       case 1:
    //         return 'st';
    //       case 2:
    //         return 'nd';
    //       case 3:
    //         return 'rd';
    //       default:
    //         return 'th';
    //     }
    //   };
    function formatDate(dateString) {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
      const year = date.getFullYear();
      
      return `${day}-${month}-${year}`;
    }

    const columns = [
        {
          name: "S/N",
          cell: (row, index) => (index + 1) ,
          width: "70px",
        },
     
        {
          name: "Application Date",
          selector: (row) => [row.updatedAt],
          sortable: true,
          width: "200px",
          cell: (row) => (
            <h6 className="fs-12 fw-bold"> {formatDate(row.updatedAt)}</h6>
          ),
        },
        {
          name: "Status",
          selector: (row) => [row.Status.name],
          sortable: true,
          width: "200px",
          cell: (row) => (
            <h6
            className="fs-12 fw-bold"
            style={{ color: row.Status.color }}
          >
            {row.Status.name.toUpperCase()}
          </h6>
          ),
        },
        {
          name: "Action",
          selector: (row) => [],
          sortable: true,
          width: "250px",
          cell: (row) => (
            <Link className="btn btn-primary" to={`/change-of-details-list/${row.id}`}>
              <span className="fa fa-eye"></span>
            </Link>
          ),
        },
      ];
    const tableDatas = {
        columns,
        data,
    };

    return (
        <>
            {isLoading ?
                <Loader /> :

                <div>

                    <Card>
                        <Card.Body>

                            <Row className="row">
                                <Col md={12} className="col-md-12">
                                {/* const actionsMemo = React.useMemo(() => <Export onExport={() => downloadCSV(data)} /> */}
                                    <DataTableExtensions {...tableDatas}>
                                        <DataTable
                                            //  fixedHeader
                                            columns={columns}
                                            data={data}
                                            // customStyles={customStyles}
                                           
                                            persistTableHead
                                            defaultSortField="id"
                                            defaultSortAsc={false}
                                            striped={true}
                                            center={true}
                                            pagination
                                            // onChangePage={handlePageChange}
                                            // onChangeRowsPerPage={handlePerRowsChange}
                                            paginationRowsPerPageOptions={[10, 15, 20, 25, 30, 50, 100]}
                                            // paginationPerPage={perPage}
                                            highlightOnHover
                                        />
                                    </DataTableExtensions>

                                </Col>
                            </Row>

                        </Card.Body>
                    </Card>
                </div>
            }
        </>
    )
}
import React from "react";
import { useState, useContext, useEffect, useRef } from "react";
import { Card, Row, Col, Modal, Button, Form, Badge } from "react-bootstrap"
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import endpoint from "../../context/endpoint";
import { ErrorAlert, SuccessAlert } from "../Toast/toast";
import Loader from "../Loader/loader";
import { Link } from "react-router-dom";

export const EnrollmentReportByVolumeData = ({ data }) => {

    const [isLoading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const handlePageChange = page => {
        setPage(page);
    }

    const handlePerRowsChange = async (newPerPage, page) => {
        setPerPage(newPerPage);

    }

    function convertArrayOfObjectsToCSV(array) {
        let result;

        const columnDelimiter = ',';
        const lineDelimiter = '\n';
        const keys = Object.keys(data[0]);

        result = '';
        result += keys.join(columnDelimiter);
        result += lineDelimiter;

        array.forEach(item => {
            let ctr = 0;
            keys.forEach(key => {
                if (ctr > 0) result += columnDelimiter;

                result += item[key];

                ctr++;
            });
            result += lineDelimiter;
        });

        return result;
    }
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
      
    function downloadCSV(array) {
        const link = document.createElement('a');
        let csv = convertArrayOfObjectsToCSV(array);
        if (csv == null) return;

        const filename = 'export.csv';

        if (!csv.match(/^data:text\/csv/i)) {
            csv = `data:text/csv;charset=utf-8,${csv}`;
        }

        link.setAttribute('href', encodeURI(csv));
        link.setAttribute('download', filename);
        link.click();
    }

    const Export = ({ onExport }) => <Button onClick={e => onExport(e.target.value)}>Export</Button>;


    const columns = [
        {
            name: "S/N",

            cell: (row, index) => (index + 1) + ((page - 1) * perPage),
            width: "70px"
        },
        {
            name: "Full Name",
            selector: (row) => [row.surname],
            sortable: true,
            width: "300px",
            cell: (row) => (
                <h6 className="fs-12 fw-bold"> {(row.surname).toUpperCase() + ' ' + (row.first_name).toUpperCase() + " " + (row.middle_name).toUpperCase()}</h6>
            ),
        },
        
        {
            name: "Email",
            selector: (row) => [row.email],
            sortable: true,
            width: "200px",
            cell: (row) => (
                <h6 className="fs-12 fw-bold"> {row.email}</h6>
            ),
        },
        {
            name: "Phone No.",
            selector: (row) => [row.phone],
            sortable: true,
            width: "130px",
            cell: (row) => (
                <h6 className="fs-12 fw-bold"> {row.phone}</h6>
            ),
        },
        {
            name: "Enrolment No.",
            selector: (row) => [row.enrollment_number],
            sortable: true,
            width: "150px",
            cell: (row) => (
                <h6 className="fs-12 fw-bold"> {(row.enrollment_number).toUpperCase()}</h6>
            ),
        },
        {
            name: "Enrolment Date.",
            selector: (row) => [row.enrollment_date],
            sortable: true,
            width: "160px",
            cell: (row) => (
                <h6 className="fs-12 fw-bold"> {formatDate(row.enrollment_date)}</h6>
            ),
        },
        {
            name: "Address",
            selector: (row) => [row.contact_address],
            sortable: true,
            width: "250px",
            cell: (row) => (
                <h6 className="fs-12 fw-bold"> {row.contact_address}</h6>
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
                                            actions={<Export onExport={() => downloadCSV(data)} />}
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
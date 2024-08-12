import React from "react";
import { useState, useContext, useEffect, useRef } from "react";
import { Card, Row, Col, Modal, Button, Form, Badge } from "react-bootstrap"
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
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
import { Link } from "react-router-dom";

export const PublicEnrolledListData = () => {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [idToDelete, setIdToDelete] = useState('')
  const [yearOfGraduation, setYearOfGraduation] = useState([]);
  const [volumes, setVolumes] = useState([]);

  const [details, setDetails] = useState({
    volume_no:""
  })
  const [searched, setSearched] = useState(false);
  const [no, setNo] = useState('');


 

 //set search details
 const handleBatchChange = (event) => {
  setDetails({ ...details, year_of_graduation: event.target.value });
};
const handleVolumeChange = (event) => {
  setDetails({ ...details, volume_no: event.target.value });
  setNo('')
};

  useEffect(() => {
    getAllData();
    getYearOfGraduation();
    getAllProfileVolumes();
  }, []);

  //get year of graduation
  const getYearOfGraduation = async () => {
    try {
      const res = await endpoint.get('/graduand/year-of-graduation');
      setYearOfGraduation(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllProfileVolumes = async () => {
    try {
      const res = await endpoint.get('/profile/volumes');
      setVolumes(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllData = async () => {
    setLoad(true);
    await endpoint.get(`/profile/list-enrolled-lawyer`)
      .then((res) => {
        setData(res.data.data)
        setLoad(false);
      })
      .catch((err) => console.log(err))
  }

	const handleSubmitQuery = async (event) => {
		event.preventDefault();
		await endpoint.post(`/profile/enrolled/search/`, details)
			.then((res) => {
				setLoading(false)
        setData(res.data.data);
        setNo(res.data.data[0].volume_no)
				SuccessAlert(res.data.message)
        setSearched(true);
				
			}).catch((err) => {
				setLoading(false)
				  ErrorAlert(err.response.data.message)
          setSearched(true);
				console.log(err)
			})

	};

  const onClose = () => {
    setOpen(false);
    setDeleteOpen(false);
  }

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
      cell: (row, index) => (index + 1) + ((page - 1) * perPage),
      width: "70px"
    },
    {
      name: "Enrollment Number",
      selector: (row) => [row.enrollment_number],
      sortable: true,
      width: "180px",
      cell: (row) => (
        <h6 className="fs-12 fw-bold">{(row.enrollment_number)}</h6>
      ),
    },
    {
      name: "Full Name",
      selector: (row) => [row.surname],
      sortable: true,
      width: "240px",
      cell: (row) => (
        <h6 className="fs-12 fw-bold">{(row.surname).toUpperCase() + ' ' + (row.first_name).toUpperCase() + " " + (row.middle_name).toUpperCase()}</h6>
      ),
    },
      {
        name: "Email",
        selector: (row) => [row.email],
        sortable: true,
        width: "200px",
        cell: (row) => (
          <h6 className="fs-12 fw-bold">{(row.email)}</h6>
        ),
      },
      {
        name: "Phone",
        selector: (row) => [row.phone],
        sortable: true,
        width: "150px",
        cell: (row) => (
          <h6 className="fs-12 fw-bold">{(row.phone)}</h6>
        ),
      },
    {
      name: "Gender",
      selector: (row) => [row.gender],
      sortable: true,
      width: "100px",
      cell: (row) => (
        <h6 className="fs-12 fw-bold">{(row.gender).toUpperCase()}</h6>
      ),
    },
    // {
    //   name: "Year of Call to Bar",
    //   selector: (row) => [row.year_of_call_to_bar],
    //   sortable: true,
    //   width: "200px",
    //   cell: (row) => (
    //     <h6 className="fs-12 fw-bold">{formatDate(row.year_of_call_to_bar)}</h6>
    //   ),
    // },
    {
      name: <div>Date of Placement</div>,
      selector: (row) => [row.date_of_placement],
      sortable: true,
      width: "120px",
      cell: (row) => (
        <h6 className="fs-12 fw-bold">{row.date_of_placement && formatDate(row.date_of_placement)}</h6>
      ),
    },
    {
      name: <div>Permanent Home Address</div>,
      selector: (row) => [row.permanent_home_address],
      sortable: true,
      width: "200px",
      cell: (row) => (
        <h6 className="fs-12 fw-bold">{(row.permanent_home_address)}</h6>
      ),
    },
    // {
    //   name: "Action",
    //   width: "150px",
    //   cell: (row) => (
    //     <Row>
    //       <Col xs={4} style={{ paddingRight: "0px", paddingLeft: "0px" }}>
    //         <Link to={`/enrollment-status/${row.id}`}>
    //           <button className="btn btn-sm btn-primary" variant="secondary" title="Action" size="sm">
    //             View
    //           </button>
    //         </Link>
    //       </Col>
    //     </Row>
    //   )
    // },
  ];

  function convertArrayOfObjectsToCSV(array) {
    let result;

    const columnDelimiter = ',';
    const lineDelimiter = '\n';
    // const keys = Object.keys(data[0]);
    const keys = ['enrollment_number', 'surname', 'first_name', 'middle_name', 'email', 'phone', 'gender', 'date_of_placement', 'permanent_home_address'];

    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach(item => {
        let ctr = 0;
        keys.forEach(key => {
            if (ctr > 0) result += columnDelimiter;

            if (key === 'first_name' || key === 'permanent_home_address') {
              result += `"${item[key].replace(/"/g, '""')}"`;
            }else if (key === 'date_of_placement') {
            // Format the date as YYYY-MM-DD
            const formattedDate = item[key] ? formatDate(item[key]) : '';
            result += formattedDate;
            } else {
              result += item[key];
            }

            ctr++;
        });
        result += lineDelimiter;
    });

    return result;
  }
  
  function downloadCSV(array) {
    const link = document.createElement('a');
    let csv = convertArrayOfObjectsToCSV(array);
    if (csv == null) return;

    const filename = no ? `${no}.csv` : 'enrolled.csv';
    // const filename = `${no}.csv`;

    if (!csv.match(/^data:text\/csv/i)) {
        csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', filename);
    link.click();
  }

const Export = ({ onExport }) => <Button onClick={e => onExport(data)}>Export {no ? no : ''}</Button>;

  const tableDatas = {
    columns,
    data,
  };

  return (
    <>
      {load ?
        <Loader /> :

        <div>

          <Card>
            <Card.Body>
              <div className="row mb-3">
                <div className="col-md-3 d-flex align-items-center">
                  <Form.Group className="mb-0">
                    <Form.Label>Volumes</Form.Label>
                    <Form.Select className="form-select-lg" value={details.volume_no} onChange={handleVolumeChange}>
                      <option value="">Select Volume...</option>
                      {volumes.map((volume, index) =>
                        <option key={index + 1} value={volume.volume_no}>{volume.volume_no}</option>
                      )}

                    </Form.Select>
                  </Form.Group>
                  
                </div>

                <div className="col-md-4 d-flex align-items-center mt-4">
                  <Button variant="primary" onClick={handleSubmitQuery}>Search</Button>
                </div>
              </div>

              <h3 className="text-center">ENROLLED LAWYERS</h3>
              <Row className="row">
                <Col md={12} className="col-md-12">
                  <DataTableExtensions {...tableDatas}>
                    <DataTable
                      //  fixedHeader
                      columns={columns}
                    //   selectableRows
                    //   onSelectedRowsChange={handleRowSelection}
                      data={data}
                      actions={<Export onExport={() => downloadCSV(data)} />}
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
          {/* {searched && data.length > 0 && (
          <Row className="mt-3">
            <Col className="text-center">
              <Link to={`/enrolled-users/reports/${encodeURIComponent(no)}`}>
                <button className="btn btn-primary" variant="secondary">
                  Print
                </button>
              </Link>
            </Col>
          </Row>
        )} */}
        </div>
        
      }
    </>
  )
}
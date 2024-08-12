import React from "react";
import { useState, useContext, useEffect, useRef } from "react";
import { Card, Row, Col, Modal, Button, Form, Badge } from "react-bootstrap";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import endpoint from "../../context/endpoint";
import { Context } from "../../context/Context";
import moment from "moment";
import { ErrorAlert, SuccessAlert } from "../Toast/toast";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Loader from "../Loader/loader";
import { Link } from "react-router-dom";
import avatarImg from "../../components/Scn-Components/avatarNoImg3.jpg";
import PassportCard from "../../components/Scn-Components/PassportCard";

export const GraduandListData = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [yearOfGraduation, setYearOfGraduation] = useState([]);
  const [details, setDetails] = useState({
    year_of_graduation: "",
  });
  const [uploadStaff, setUploadStaff] = useState({
    fullname: "",
    userId: "",
    passport_photo: "",
  });
  const [batches, setBatches] = useState([]);
  const [batchSearch, setBatchSearch] = useState({
    batch_number: "",
  });
  const [resultByBatch, setResultByBatch] = useState("");
  const [selectedCount, setSelectedCount] = useState("");
  const [openTrash, setTrashBatch] = useState(false);
  const [rmvGraduand, setRmvGraduand] = useState(false);
  const [submitBatchModal, setSubmitBatchModal] = useState(false);
  const [editGraduandModal, setEditGraduandModal] = useState(false);
  const [toEdit, setToEdit] = useState({
    id: "",
    surname: "",
    first_name: "",
    middle_name: "",
    email: "",
    phone: "",
    examination_no: "",
    year_of_graduation: "",
    date_of_birth: "",
    gender: "",
    contact_address: "",
    permanent_home_address: "",
    university_attended: "",
    law_sch_camp_attended: "",
  });
  const [graduandToRmv, setGraduandToRmv] = useState({
    id: "",
    fullname: "",
  });

  //set search details
  const handleBatchChange = (event) => {
    setDetails({ ...details, year_of_graduation: event.target.value });
  };

  useEffect(() => {
    getAllData();
    getYearOfGraduation();
    getBatch();
  }, []);

  //get year of graduation
  const getYearOfGraduation = async () => {
    try {
      const res = await endpoint.get("/graduand/year-of-graduation");
      setYearOfGraduation(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  //get batches
  const getBatch = async () => {
    try {
      const res = await endpoint.get("/import/users/list/batch-number");
      setBatches(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRowSelection = ({ selectedRows }) => {
    setSelectedCount(selectedRows.length);
  };

  const getAllData = async () => {
    await endpoint
      .get(`/payment/paid`)
      .then((res) => {
        console.log("all graduand data", res.data.data);
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setPerPage(newPerPage);
  };

  const gender = [
    { id: 1, value: "Male", label: "Male" },
    { id: 2, value: "Female", label: "Female" },
  ];

  const onClose = () => {
    setOpen(false);
    setUploadStaff({
      fullname: "",
      userId: "",
      passport_photo: "",
    });
    setPreviewImage(null);
  };

  const [previewImage, setPreviewImage] = useState(null);
  const getPreview = (targetFile) => {
    if (targetFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(targetFile);
    } else {
      setPreviewImage(null);
    }
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }
  const columns = [
    {
      name: "S/N",

      cell: (row, index) => index + 1 + (page - 1) * perPage,
      width: "70px",
    },
    {
      name: "Batch",
      selector: (row) => [row.batch_number],
      sortable: true,
      // width: "100px",
      cell: (row) => <h6 className="fs-12 fw-bold">{row.batch_number}</h6>,
    },
    {
      name: "Photo",
      selector: (row) => [row.passport_url],
      sortable: true,
      width: "100px",
      cell: (row) => (
        <div className="">
          {row.passport_url !== null && (
            <>
              <img
                className="avatar avatar-sm brround cover-image mb-1 ms-0"
                crossOrigin="anonymous"
                src={process.env.REACT_APP_UPLOAD_URL + row.passport_url}
                alt=""
                style={{ height: `60px`, width: `60px` }}
                onClick={() => {
                  setOpen(!open);
                  setUploadStaff({
                    ...uploadStaff,
                    userId: row.id,
                    fullname:
                      row.surname.toUpperCase() +
                      " " +
                      row.first_name.toUpperCase() +
                      " " +
                      row.middle_name.toUpperCase(),
                    passport_photo: row.passport_url,
                  });
                }}
              />
              <br></br>
              <div
                className="text-center"
                onClick={() => {
                  setOpen(!open);
                  setUploadStaff({
                    ...uploadStaff,
                    userId: row.id,
                    fullname:
                      row.surname.toUpperCase() +
                      " " +
                      row.first_name.toUpperCase() +
                      " " +
                      row.middle_name.toUpperCase(),
                    passport_photo: row.passport_url,
                  });
                }}>
                <span className="fa fa-camera"></span>
              </div>
            </>
          )}
          {row.passport_url == null && (
            <>
              <img
                className="avatar avatar-sm brround cover-image mb-1 ms-0"
                crossOrigin="anonymous"
                src={avatarImg}
                alt=""
                style={{ height: `60px`, width: `60px` }}
                onClick={() => {
                  setOpen(!open);
                  setUploadStaff({
                    ...uploadStaff,
                    userId: row.id,
                    fullname:
                      row.surname.toUpperCase() +
                      " " +
                      row.first_name.toUpperCase() +
                      " " +
                      row.middle_name.toUpperCase(),
                    passport_photo: row.passport_url,
                  });
                }}
              />
              <br></br>
              <div
                className="text-center"
                onClick={() => {
                  setOpen(!open);
                  setUploadStaff({
                    ...uploadStaff,
                    userId: row.id,
                    fullname:
                      row.surname.toUpperCase() +
                      " " +
                      row.first_name.toUpperCase() +
                      " " +
                      row.middle_name.toUpperCase(),
                    passport_photo: row.passport_url,
                  });
                }}>
                <span className="fa fa-camera"></span>
              </div>
            </>
          )}
        </div>
      ),
    },
    {
      name: "Full Name",
      selector: (row) => [row.surname],
      sortable: true,
      width: "230px",
      cell: (row) => (
        <h6 className="fs-12 fw-bold">
          {" "}
          {row.surname.toUpperCase() +
            " " +
            row.first_name.toUpperCase() +
            " " +
            row.middle_name.toUpperCase()}
        </h6>
      ),
    },
    {
      name: "Gender",
      selector: (row) => [row.gender],
      sortable: true,
      // width: "100px",
      cell: (row) => <h6 className="fs-12 fw-bold">{row.gender}</h6>,
    },
    {
      name: "Email",
      selector: (row) => [row.email],
      sortable: true,
      width: "250px",
      cell: (row) => <h6 className="fs-12 fw-bold">{row.email}</h6>,
    },
    {
      name: "Phone No.",
      selector: (row) => [row.phone],
      sortable: true,
      width: "150px",
      cell: (row) => <h6 className="fs-12 fw-bold">{row.phone}</h6>,
    },
    {
      name: "Date of Birth",
      selector: (row) => [row.date_of_birth],
      sortable: true,
      width: "150px",
      cell: (row) => (
        <h6 className="fs-12 fw-bold">{formatDate(row.date_of_birth)}</h6>
      ),
    },
    {
      name: <div>Exam No.</div>,
      selector: (row) => [row.examination_no],
      sortable: true,
      width: "110px",
      cell: (row) => (
        <h6 className="fs-12 fw-bold">{row.examination_no.toUpperCase()}</h6>
      ),
    },
    {
      name: <div>Year of Graduation</div>,
      selector: (row) => [row.year_of_graduation],
      sortable: true,
      width: "130px",
      cell: (row) => (
        <h6 className="fs-12 fw-bold">
          {row.year_of_graduation.toUpperCase()}
        </h6>
      ),
    },
    {
      name: <div>Law School Campus</div>,
      selector: (row) => [row.law_sch_camp_attended],
      sortable: true,
      width: "130px",
      cell: (row) => (
        <h6 className="fs-12 fw-bold">
          {row.law_sch_camp_attended.toUpperCase()}
        </h6>
      ),
    },
    {
      name: <div>University Attended</div>,
      selector: (row) => [row.university_attended],
      sortable: true,
      width: "130px",
      cell: (row) => (
        <h6 className="fs-12 fw-bold">
          {row.university_attended.toUpperCase()}
        </h6>
      ),
    },
    {
      name: <div>Payment Url</div>,
      selector: (row) => [row.payment_url],
      sortable: true,
      width: "130px",
      cell: (row) => <h6 className="fs-12 fw-bold">{row.payment_url}</h6>,
    },
    {
      name: <div>Contact Address</div>,
      selector: (row) => [row.contact_address],
      sortable: true,
      width: "130px",
      cell: (row) => (
        <h6 className="fs-12 fw-bold">{row.contact_address.toUpperCase()}</h6>
      ),
    },
    // {
    //   name: <div>Status</div>,
    //   selector: (row) => [row.payment_status],
    //   sortable: true,
    //   width: "120px",
    //   cell: (row) => (
    //     <h6 className="fs-12 fw-bold">{(row.payment_status == 0 || row.payment_status == null) ? `Not Paid` : `Paid`}</h6>
    //   ),
    // },
    {
      name: <div>Payment Status</div>,
      selector: (row) => [row.payment_status],
      sortable: true,
      // width: "120px",
      cell: (row) => (
        <h6 className="fs-12 fw-bold">
          {row.payment_status == 0 || row.payment_status == null
            ? `Not Paid`
            : `Paid`}
        </h6>
      ),
    },
    // {
    //   name: "Action",
    //   width: "140px",
    //   cell: (row) => (
    //     <div className="fs-12 fw-bold mx-1 ">
    //       <td>
    //         <button
    //           className="btn btn-sm btn-primary m-1"
    //           variant="secondary"
    //           title="Action"
    //           size="sm"
    //           onClick={() => {
    //             resendMail(row);
    //           }}>
    //           <span className="fa fa-email"></span> Resend Mail
    //         </button>
    //         {
    //           // row.submit_status == 1 ||
    //           row.Enrollment?.status_id < 3 ||
    //             (!row.Enrollment && (
    //               <>
    //                 <button
    //                   className="btn btn-sm btn-warning m-1"
    //                   variant="warning"
    //                   title="Edit"
    //                   size="sm"
    //                   onClick={() => {
    //                     setToEdit(row);
    //                     setEditGraduandModal(!editGraduandModal);
    //                   }}>
    //                   <span className="fa fa-edit"></span>
    //                 </button>

    //                 <button
    //                   className="btn btn-sm btn-danger m-1"
    //                   variant="danger"
    //                   title="Delete"
    //                   size="sm"
    //                   onClick={() => {
    //                     setRmvGraduand(!rmvGraduand);
    //                     setGraduandToRmv({
    //                       ...graduandToRmv,
    //                       id: row.id,
    //                       fullname: row.surname + " " + row.first_name,
    //                     });
    //                   }}>
    //                   <span className="fa fa-trash"></span>
    //                 </button>
    //               </>
    //             ))
    //         }
    //       </td>
    //     </div>
    //   ),
    // },
  ];

  const tableDatas = {
    columns,
    data,
  };

  const handleSearch = async () => {
    setLoading(true);
    setBatchSearch({ ...batchSearch, batch_number: "" });
    setResultByBatch("");
    await endpoint
      .post(`/graduand/searchPaid-graduand-by-year-of-graduation`, details)
      .then(({ data }) => {
        setLoading(false);
        setData(data.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log("bad");
        console.log(err);
      });
  };

  const handleSearchByBatch = async () => {
    setLoading(true);
    setDetails({ ...details, year_of_graduation: "" });
    await endpoint
      .post(`/import/users-paid/search/batch-number`, batchSearch)
      .then(({ data }) => {
        setLoading(false);
        setData(data.data);
        if (
          data.data[0].submit_status == 0 ||
          data.data[0].submit_status == null
        ) {
          setResultByBatch(data.data[0].batch_number);
        } else {
          setResultByBatch("");
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("bad");
        console.log(err);
      });
  };

  const savePassport = async (e) => {
    e.preventDefault();
    setLoading(true);
    const myData = new FormData();
    myData.append("userId", uploadStaff.userId);
    myData.append("passport_photo", uploadStaff.passport_photo);
    await endpoint
      .post(`/import/users/upload/photo/${uploadStaff.userId}`, myData)
      .then((res) => {
        setLoading(false);
        setOpen(!open);
        const updatedData = data.map((graduand) => {
          if (graduand.id == res.data.data.id) {
            const updated = {
              ...graduand,
              passport_url: res.data.data.image,
            };
            return updated;
          }
          return graduand;
        });
        setData(updatedData);
        setUploadStaff({
          fullname: "",
          userId: "",
          passport_photo: "",
        });
        setPreviewImage(null);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        setOpen(!open);
        setUploadStaff({
          fullname: "",
          userId: "",
          passport_photo: "",
        });
        setPreviewImage(null);
      });
  };

  const deleteTrash = async (e) => {
    e.preventDefault();
    setLoading(true);
    await endpoint
      .delete(`/import/users/batch/delete/${resultByBatch}`)
      .then((res) => {
        console.log(res);
        setBatchSearch({ ...batchSearch, batch_number: "" });
        setData(
          data.filter((graduand) => graduand.batch_number !== resultByBatch)
        );
        setTrashBatch(!openTrash);
        setResultByBatch("");
        getBatch();
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const deleteGraduand = async (e) => {
    e.preventDefault();
    setLoading(true);
    await endpoint
      .delete(`/import/users/delete/${graduandToRmv.id}`)
      .then((res) => {
        console.log("res del", res);
        setData(data.filter((graduand) => graduand.id != res.data.data.id));
        setRmvGraduand(!rmvGraduand);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const updateGraduand = async (e) => {
    e.preventDefault();
    setLoading(true);
    await endpoint
      .put(`/graduand/edit/${toEdit.id}`, toEdit)
      .then((res) => {
        getAllData();
        setLoading(false);
        SuccessAlert(res.data.message);
        setEditGraduandModal(!editGraduandModal);
        setToEdit("");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        ErrorAlert(err.response.data.message);
        setEditGraduandModal(!editGraduandModal);
        setToEdit("");
      });
  };

  const submitBatch = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("batch to submit", resultByBatch);
    await endpoint
      .put(`/graduand/submit/${resultByBatch}`)
      .then((res) => {
        setLoading(false);
        setSubmitBatchModal(!submitBatchModal);
        SuccessAlert(res.data.message);
        setResultByBatch("");
        getAllData();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setResultByBatch("");
        setSubmitBatchModal(!submitBatchModal);
        ErrorAlert(err.response.data.message);
      });
  };


    function convertArrayOfObjectsToCSV(array) {
      let result;

      const columnDelimiter = ",";
      const lineDelimiter = "\n";
      // const keys = Object.keys(data[0]);
      const keys = [
        "surname",
        "first_name",
        "middle_name",
        "email",
        "phone",
        "gender"
      ];

      result = "";
      result += keys.join(columnDelimiter);
      result += lineDelimiter;

      array.forEach((item) => {
        let ctr = 0;
        keys.forEach((key) => {
          if (ctr > 0) result += columnDelimiter;

          if (key === "first_name" || key === "permanent_home_address") {
            result += `"${item[key].replace(/"/g, '""')}"`;
          } else if (key === "date_of_placement") {
            // Format the date as YYYY-MM-DD
            const formattedDate = item[key] ? formatDate(item[key]) : "";
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
    const link = document.createElement("a");
    let csv = convertArrayOfObjectsToCSV(array);
    if (csv == null) return;

    const filename = "PaidGraduand.csv";
    // const filename = `${no}.csv`;

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", filename);
    link.click();
  }

  const Export = ({ onExport }) => (
    <Button onClick={(e) => onExport(data)}>Export </Button>
  );

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Card>
            <Card.Body>
              <div className="row mb-3">
                <div className="col-md-5 d-flex align-items-center">
                  <Form.Group className="mb-0">
                    <Form.Label>Year of Graduation</Form.Label>
                    <Form.Select
                      className="form-select-lg"
                      value={details.year_of_graduation}
                      onChange={handleBatchChange}>
                      <option value="">Select Session...</option>
                      {yearOfGraduation.map((year, index) => (
                        <option
                          key={index + 1}
                          value={year.year_of_graduation}>
                          {year.year_of_graduation}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Button
                    variant="success"
                    onClick={handleSearch}
                    className="m-3 mt-5">
                    {" "}
                    <span className="fa fa-search"></span> Search
                  </Button>
                </div>

                <div className="col-md-2 mt-5">
                  {" "}
                  <h4>OR</h4>{" "}
                </div>

                <div className="col-md-5 d-flex align-items-center">
                  <Form.Group className="mb-0">
                    <Form.Label>Batch</Form.Label>
                    <Form.Select
                      className="form-select-lg"
                      value={batchSearch.batch_number}
                      onChange={(e) =>
                        setBatchSearch({
                          ...batchSearch,
                          batch_number: e.target.value,
                        })
                      }>
                      <option value="">Select Batch...</option>
                      {batches.map((batch, index) => (
                        <option
                          key={index + 1}
                          value={batch.batch_number}>
                          {batch.batch_number}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Button
                    variant="success"
                    onClick={handleSearchByBatch}
                    className="m-3 mt-5">
                    {" "}
                    <span className="fa fa-search"></span> Search
                  </Button>
                </div>
              </div>

              <h3 className="text-center mt-5">
                Graduands {resultByBatch && resultByBatch}{" "}
              </h3>
              {/* <Link
                to={`/graduants-upload`}
                className="btn btn-primary btn-outline m-1">
                {" "}
                <span className="fa fa-plus"></span> Upload new batch
              </Link> */}
              {/* {resultByBatch && (
                <button
                  className="btn btn-danger pd-x-25 m-1"
                  onClick={() => setTrashBatch(!openTrash)}>
                  <span className="fa fa-trash"></span> Trash Batch{" "}
                  {resultByBatch}
                </button>
              )}
              {resultByBatch && (
                <button
                  className="btn btn-success pd-x-25 m-1"
                  onClick={() => setSubmitBatchModal(!submitBatchModal)}>
                  <span className="fa fa-save"></span> Submit Batch{" "}
                  {resultByBatch}
                </button>
              )} */}
              <Row className="row">
                <Col
                  md={12}
                  className="col-md-12">
                  <DataTableExtensions {...tableDatas}>
                    <DataTable
                      //  fixedHeader
                      columns={columns}
                      data={data}
                      actions={<Export onExport={() => downloadCSV(data)} />}
                      // selectableRows={resultByBatch}
                      // selectableRows
                      // onSelectedRowsChange={handleRowSelection}
                      // customStyles={customStyles}
                      persistTableHead
                      defaultSortField="id"
                      defaultSortAsc={false}
                      striped={true}
                      center={true}
                      pagination
                      // onChangePage={handlePageChange}
                      // onChangeRowsPerPage={handlePerRowsChange}
                      paginationRowsPerPageOptions={[
                        10, 15, 20, 25, 30, 50, 100,
                      ]}
                      // paginationPerPage={perPage}
                      highlightOnHover
                    />
                  </DataTableExtensions>

                  {/* {resultByBatch && (
                    <button
                      className="btn btn-danger pd-x-25 m-1"
                      onClick={() => setTrashBatch(!openTrash)}>
                      <span className="fa fa-trash"></span> Trash Batch{" "}
                      {resultByBatch}
                    </button>
                  )}

                  {resultByBatch && (
                    <button
                      className="btn btn-success pd-x-25 m-1"
                      onClick={() => setSubmitBatchModal(!submitBatchModal)}>
                      <span className="fa fa-save"></span> Submit Batch{" "}
                      {resultByBatch}
                    </button>
                  )} */}

                  <Modal show={open}>
                    <Modal.Body className="text-center p-4">
                      <Button
                        onClick={onClose}
                        className="btn-close"
                        variant="">
                        x
                      </Button>
                      {/* <i className="fe fe-check-circle fs-100 text-success lh-1 mb-4 d-inline-block"></i>
                      <h4 className="text-success mb-4">Alert!</h4> */}
                      <p className="mb-4 mx-4 mt-4">
                        Upload Passport Photo for <br></br>{" "}
                        <span className="text-success">
                          {uploadStaff.fullname}
                        </span>
                      </p>
                      <p>
                        <div className="mt-2">
                          <label>Select Photo.</label>
                          <input
                            type="file"
                            name="passport_url"
                            className="form-control"
                            onChange={(e) => {
                              getPreview(e.target.files[0]);
                              setUploadStaff({
                                ...uploadStaff,
                                passport_photo: e.target.files[0],
                              });
                            }}
                          />
                        </div>
                        <div className="mt-2">
                          {previewImage ? (
                            <PassportCard image={previewImage} />
                          ) : uploadStaff.passport_photo !== null ? (
                            <PassportCard
                              image={
                                process.env.REACT_APP_UPLOAD_URL +
                                "/" +
                                uploadStaff.passport_photo
                              }
                            />
                          ) : (
                            " "
                          )}
                        </div>
                      </p>
                      <button
                        className="btn btn-danger pd-x-25 m-1"
                        onClick={onClose}>
                        Cancel
                      </button>
                      <button
                        className="btn btn-success pd-x-25"
                        onClick={(e) => savePassport(e)}>
                        Save
                      </button>
                    </Modal.Body>
                  </Modal>

                  {/* Edit graduand */}
                  <Modal show={editGraduandModal}>
                    <Modal.Body className="p-4">
                      <Button
                        onClick={() => setEditGraduandModal(!editGraduandModal)}
                        className="btn-close"
                        variant="">
                        x
                      </Button>
                      <p className="text-center mb-4 mx-4 mt-4">
                        Edit Graduand data
                      </p>
                      {toEdit && (
                        <>
                          <p>
                            <label>Surname</label>
                            <input
                              type="text"
                              className="form-control"
                              value={toEdit.surname}
                              onChange={(e) =>
                                setToEdit({
                                  ...toEdit,
                                  surname: e.target.value,
                                })
                              }
                            />
                          </p>
                          <p>
                            <label>First Name</label>
                            <input
                              type="text"
                              className="form-control"
                              value={toEdit.first_name}
                              onChange={(e) =>
                                setToEdit({
                                  ...toEdit,
                                  first_name: e.target.value,
                                })
                              }
                            />
                          </p>
                          <p>
                            <label>Middle Name</label>
                            <input
                              type="text"
                              className="form-control"
                              value={toEdit.middle_name}
                              onChange={(e) =>
                                setToEdit({
                                  ...toEdit,
                                  middle_name: e.target.value,
                                })
                              }
                            />
                          </p>
                          <p>
                            <label>Email</label>
                            <input
                              type="text"
                              className="form-control"
                              value={toEdit.email}
                              onChange={(e) =>
                                setToEdit({ ...toEdit, email: e.target.value })
                              }
                            />
                          </p>
                          <p>
                            <label>Gender</label>
                            <select
                              className="form-select"
                              onChange={(e) => {
                                setToEdit({
                                  ...toEdit,
                                  gender: e.target.value,
                                });
                              }}
                              value={toEdit.gender}>
                              <option value="">Select Gender...</option>
                              {gender.map((list) => (
                                <option
                                  key={list.id}
                                  value={list.value}>
                                  {list.label}
                                </option>
                              ))}
                            </select>
                          </p>
                          <p>
                            <label>Phone Number</label>
                            <input
                              type="text"
                              className="form-control"
                              value={toEdit.phone}
                              onChange={(e) =>
                                setToEdit({ ...toEdit, phone: e.target.value })
                              }
                            />
                          </p>
                          <p>
                            <label>Exam No</label>
                            <input
                              type="text"
                              className="form-control"
                              value={toEdit.examination_no}
                              onChange={(e) =>
                                setToEdit({
                                  ...toEdit,
                                  examination_no: e.target.value,
                                })
                              }
                            />
                          </p>
                          <p>
                            <label>Date of Birth</label>
                            <input
                              type="text"
                              className="form-control"
                              value={toEdit.date_of_birth}
                              onChange={(e) =>
                                setToEdit({
                                  ...toEdit,
                                  date_of_birth: e.target.value,
                                })
                              }
                            />
                          </p>
                          <p>
                            <label>Year of Graduation</label>
                            <input
                              type="text"
                              className="form-control"
                              value={toEdit.year_of_graduation}
                              onChange={(e) =>
                                setToEdit({
                                  ...toEdit,
                                  year_of_graduation: e.target.value,
                                })
                              }
                            />
                          </p>
                          <p>
                            <label>Contact Address</label>
                            <input
                              type="text"
                              className="form-control"
                              value={toEdit.contact_address}
                              onChange={(e) =>
                                setToEdit({
                                  ...toEdit,
                                  contact_address: e.target.value,
                                })
                              }
                            />
                          </p>
                          <p>
                            <label>Permanent Address</label>
                            <input
                              type="text"
                              className="form-control"
                              value={toEdit.permanent_home_address}
                              onChange={(e) =>
                                setToEdit({
                                  ...toEdit,
                                  permanent_home_address: e.target.value,
                                })
                              }
                            />
                          </p>
                          <p>
                            <label>University Attended</label>
                            <input
                              type="text"
                              className="form-control"
                              value={toEdit.university_attended}
                              onChange={(e) =>
                                setToEdit({
                                  ...toEdit,
                                  university_attended: e.target.value,
                                })
                              }
                            />
                          </p>
                          <p>
                            <label>Law School Campus</label>
                            <input
                              type="text"
                              className="form-control"
                              value={toEdit.law_sch_camp_attended}
                              onChange={(e) =>
                                setToEdit({
                                  ...toEdit,
                                  law_sch_camp_attended: e.target.value,
                                })
                              }
                            />
                          </p>
                        </>
                      )}
                      <button
                        className="btn btn-danger pd-x-25 m-1"
                        onClick={() =>
                          setEditGraduandModal(!editGraduandModal)
                        }>
                        Cancel
                      </button>
                      <button
                        className="btn btn-success pd-x-25"
                        onClick={(e) => updateGraduand(e)}>
                        Update
                      </button>
                    </Modal.Body>
                  </Modal>
                  {/* End Edit graduand */}

                  {/* remove batch modal */}
                  <Modal show={openTrash}>
                    <Modal.Body className="text-center p-4">
                      <Button
                        onClick={onClose}
                        className="btn-close"
                        variant="">
                        x
                      </Button>
                      <h4 className="text-danger mb-4">Alert!</h4>
                      <p className="mb-4 mx-4 mt-4">
                        Confirm You want to trash batch <br></br>{" "}
                        <span className="text-success">{resultByBatch}</span>
                      </p>

                      <button
                        className="btn btn-danger pd-x-25 m-1"
                        onClick={() => setTrashBatch(!openTrash)}>
                        Cancel
                      </button>
                      <button
                        className="btn btn-success pd-x-25"
                        onClick={(e) => deleteTrash(e)}>
                        Continue
                      </button>
                    </Modal.Body>
                  </Modal>
                  {/* End remove batch modal */}

                  {/* submit batch modal */}
                  <Modal show={submitBatchModal}>
                    <Modal.Body className="text-center p-4">
                      <Button
                        onClick={onClose}
                        className="btn-close"
                        variant="">
                        x
                      </Button>
                      <h4 className="text-success mb-4">Alert!</h4>
                      <p className="mb-4 mx-4 mt-4">
                        Confirm You want to submit batch <br></br>{" "}
                        <span className="text-success">{resultByBatch}</span>
                      </p>

                      <button
                        className="btn btn-danger pd-x-25 m-1"
                        onClick={() => setSubmitBatchModal(!submitBatchModal)}>
                        Cancel
                      </button>
                      <button
                        className="btn btn-success pd-x-25"
                        onClick={(e) => submitBatch(e)}>
                        Continue
                      </button>
                    </Modal.Body>
                  </Modal>
                  {/* End submit batch modal */}

                  {/* remove single graduand modal */}
                  <Modal show={rmvGraduand}>
                    <Modal.Body className="text-center p-4">
                      <Button
                        onClick={onClose}
                        className="btn-close"
                        variant="">
                        x
                      </Button>
                      <h4 className="text-danger mb-4">Alert!</h4>
                      <p className="mb-4 mx-4 mt-4">
                        Confirm You want to remove <br></br>{" "}
                        <span className="text-success">
                          {graduandToRmv.fullname}
                        </span>
                      </p>

                      <button
                        className="btn btn-danger pd-x-25 m-1"
                        onClick={() => setRmvGraduand(!rmvGraduand)}>
                        Cancel
                      </button>
                      <button
                        className="btn btn-success pd-x-25"
                        onClick={(e) => deleteGraduand(e)}>
                        Continue
                      </button>
                    </Modal.Body>
                  </Modal>
                  {/*End remove single graduand modal */}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </div>
      )}
    </>
  );
};

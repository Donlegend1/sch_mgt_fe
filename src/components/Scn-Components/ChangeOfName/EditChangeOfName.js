import React from "react";
import { useState, useContext, useEffect, useRef } from "react";
import endpoint from "../../../context/endpoint";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Card, Modal, Button } from "react-bootstrap";
import { ErrorAlert, SuccessAlert } from "../../../data/Toast/toast";

const EditChangeOfName = () => {
  const [isLoading, setLoading] = useState(false);
  const [titleList, setTitle] = useState([]);
  const [countryList, setCountry] = useState([]);
  const [statesList, setState] = useState([]);
  const [lgasList, setLga] = useState([]);
  const navigate = useNavigate();
  const params = useParams();
  // const [buttonsVisible, setButtonsVisible] = useState(true);
  // const [user, setUser] = useState({});
  const [user, setUser] = useState({});
  // const [user, setUser] = useState({ status_id: 1 });
  const [showModal, setShowModal] = useState(false);
  const [remarksData, setRemarksData] = useState([]);
  const [showAddRemarkModal, setShowAddRemarkModal] = useState(false);

  const handleViewRemarks = (e) => {
    // Set up logic to fetch the remarks data
    // For now, I'll just use the user.Remarks data
    e.preventDefault()
    setRemarksData(user.Remarks);
    setShowModal(true);
  };

  const handleCloseAddRemarkModal = (e) => {
    e.preventDefault()
    // incrementStatusId();
    setShowAddRemarkModal(!showAddRemarkModal);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setRemarksData([]);
  };

  // const incrementStatusId = () => {
  //   setUser((prevUser) => ({ ...prevUser, status_id: prevUser.status_id + 1 }));
  // };

  const [rejectModal, setRejectModal] = useState({
    remark: "",
  });

  const [newRemark, setNewRemark] = useState({
    remark: "",
  });

  const [oldsurname, setOldSurname] = useState("");
  const [oldfirst_name, setOldFirstname] = useState("");
  const [oldmiddle_name, setOldMiddlename] = useState("");
  const [oldgender, setOldgender] = useState("");
  const [oldcountry, setOldCountry] = useState("");
  const [oldstate, setOldState] = useState("");
  const [oldlga, setOldLga] = useState("");
  const [olddate_of_birth, setOldDateofbirth] = useState("");
  const [oldpermanent_home_address, setOldPermanentHomeAddress] = useState("");
  const [oldcontact_address, setOldContactAddress] = useState("");
  const [olduniversity_attended, setOldUniversityAttended] = useState("");
  const [oldlaw_sch_camp_attended, setOldLawSchoolCampAttended] = useState("");
  const [oldyear_of_admission_law_sch, setOldYearOfAdmission] = useState("");
  const [oldyear_of_call_to_bar, setOldYearOfCallToBar] = useState("");
  const [oldemail, setOldEmail] = useState("");
  const [oldphone, setOldPhone] = useState("");

  const gender = [
    { id: 1, value: "Male", label: "Male" },
    { id: 2, value: "Female", label: "Female" },
  ];


  // Define a function to format the date
function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
  const year = date.getFullYear();
  
  return `${day}-${month}-${year}`;
}



  useEffect(() => {
    getCountries();
    getTitles();
    allStates();
    getUser();
  }, []);

  const getUser = async () => {
    await endpoint
      .get(`/profile/list-temp-profile/${params.id}`)
      .then((res) => {
        console.log("temp-profile documents", res.data.data);
        setUser(res.data.data);
        //  surname =res.data.data.surname;
        setOldSurname(res.data.data.Profile.surname);
        setOldFirstname(res.data.data.Profile.first_name);
        setOldMiddlename(res.data.data.Profile.middle_name);
        setOldgender(res.data.data.Profile.gender);
        setOldCountry(res.data.data.Profile.country_id);
        setOldState(res.data.data.Profile.state_id);
        setOldLga(res.data.data.Profile.lga_id);
        setOldDateofbirth(res.data.data.Profile.date_of_birth);
        setOldPermanentHomeAddress(
          res.data.data.Profile.permanent_home_address
        );
        setOldContactAddress(res.data.data.Profile.contact_address)
        setOldUniversityAttended(res.data.data.Profile.university_attended);
        setOldLawSchoolCampAttended(
          res.data.data.Profile.law_sch_camp_attended
        );
        setOldYearOfAdmission(res.data.data.Profile.year_of_admission_law_sch);
        setOldYearOfCallToBar(res.data.data.Profile.year_of_call_to_bar);
        setOldEmail(res.data.data.Profile.email);
        setOldPhone(res.data.data.Profile.phone);
        //  console.log('surname', oldsurname, surname)
        handleChange(res.data.data.state_id);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const getCountries = async () => {
    await endpoint
      .get(`/country/list`)
      .then((res) => {
        console.log("country list data", res.data.data);
        setCountry(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const getTitles = async () => {
    await endpoint
      .get(`/title/list`)
      .then((res) => {
        setTitle(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const handleChange = async (id) => {
    await endpoint
      .get(`/state/show/${id}`)
      .then((res) => {
        console.log(res.data.data.Lgas);
        setLga(res.data.data.Lgas);
      })
      .catch((err) => console.log(err));
  };

  const allStates = async () => {
    await endpoint
      .get(`/state/list`)
      .then((res) => {
        console.log("state list data", res.data.data);
        setState(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const approveChangeOfName = async (e, id) => {
    e.preventDefault();
    // setButtonsVisible(false);
    // incrementStatusId();
    setLoading(true);
    // console.log("document uploaded", profile.doc_url);
    const data = new FormData();
    data.append("remark", newRemark.remark);
    await endpoint
      .put(`/profile/approve/temp-profile/${params.id}`, data)
      .then((res) => {
        console.log("updated profile response", res.data.data);
        setLoading(false);
        SuccessAlert(res.data.message);
        navigate(`${process.env.PUBLIC_URL}/change-of-name-request`);
      })
      .catch((err) => {
        // setButtonsVisible(true);
        setLoading(false);
        ErrorAlert(err.response.data.message);
        console.log(err);
      });
  };

  const remarkAndReject = () => {
    console.log("remark", rejectModal)
    rejectChangeOfName()
    setShowAddRemarkModal(!showAddRemarkModal)

  }

  const rejectChangeOfName = async () => {
    // setButtonsVisible(false);
    setLoading(true);
    await endpoint
      .put(`/profile/reject/temp-profile/${params.id}`, rejectModal)
      .then((res) => {
        console.log("updated profile response", res.data.data);
        SuccessAlert(res.data.message);
        navigate(`${process.env.PUBLIC_URL}/change-of-name-request`);
      })
      .catch((err) => {
        // setButtonsVisible(true);
        setLoading(false);
        ErrorAlert(err.response.data.message);
        console.log(err);
      });
  };

  const handleSaveRemark = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("remark", newRemark.remark);
    await endpoint
      .put(`/temp/profile-admin-remark/${params.id}`, newRemark)
      .then((res) => {
        console.log("Saved remark", res.data.data);
        setShowAddRemarkModal(false);
        setNewRemark({ ...newRemark, remark: "" });
        SuccessAlert(res.data.message);

        getCountries();
        getTitles();
        allStates();
        getUser();
      })
      .catch((err) => {
        setLoading(false);
        ErrorAlert(err.response.data.message);
        console.log(err);
      });
  };

  return (
    <>
      <div className="container-fluid">
        <div className="container">
          <div
            className="text-center mx-auto wow fadeInUp"
            data-wow-delay="0.1s"
            style={{
              maxWidth: "500px",
              visibility: "visible",
              animationDelay: "0.1s",
              animationName: "fadeInUp",
            }}
          >
            <h6 className="display-5 mb-5">Change of Name Form</h6>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <form
                className="form-horizontal"
                onSubmit=""
                encType="multipart/form-data"
              >
                <div
                  className="bg-light rounded p-4 p-sm-5 wow fadeInUp"
                  data-wow-delay="0.1s"
                  style={{
                    visibility: "visible",
                    animationDdelay: "0.1s",
                    animationName: "fadeInUp",
                  }}
                >
                  <div className="row">
                    <div className="col">
                      <label>Old Surname</label>
                      <input
                        type="text"
                        className="form-control"
                        readOnly
                        value={user.surname ? user.Profile.surname : ""}
                      />
                    </div>
                    <div className="col">
                      <label>New Surname</label>
                      <input
                        type="text"
                        className={user.surname !== oldsurname ? "form-control is-invalid" : "form-control"}
                        value={user.surname}
                        // onChange={(e) => setProfile({ ...profile, surname: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <div className="row">
                    <div className="col">
                      <label>Old First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        readOnly
                        value={user.first_name ? user.Profile.first_name : ""}
                      />
                    </div>
                    <div className="col">
                      <label>New First Name</label>
                      <input
                        type="text"
                        className={user.first_name !== oldfirst_name ? "form-control is-invalid" : "form-control"}
                        value={user.first_name}
                      />
                    </div>
                  </div>
                  
                  <div className="row">
                    <div className="col">
                      <label>Old Middle Name</label>
                      <input
                        type="text"
                        className="form-control"
                        readOnly
                        value={user.middle_name ? user.Profile.middle_name : ""}
                      />
                    </div>
                    <div className="col">
                      <label>New Middle Name</label>
                      <input
                        type="text"
                        className={user.middle_name !== oldmiddle_name ? "form-control is-invalid" : "form-control"}
                        value={user.middle_name}
                        // onChange={(e) => setProfile({ ...profile, middle_name: e.target.value })}
                      />
                    </div>

                  </div>

                  <div className="row">
                    <div className="col">
                      <label>Old Gender</label>
                      <select
                        className="form-select"
                        style={{ width: "100%", marginTop: "0px" }}
                        value={user.gender ? user.Profile.gender : ""}
                        disabled
                      >
                        <option value="">---Select Gender--- </option>
                        {gender.map((gend) => (
                          <option key={gend.id} value={gend.value}>
                            {gend.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col">
                      <label>New Gender</label>
                      <select
                        className={user.gender !== oldgender ? "form-select is-invalid" : "form-select"}
                        onChange={(e) => {
                          // setProfile({ ...profile, gender: e.target.value })
                        }}
                        value={user.gender}
                      >
                        <option value="">---Select Gender--- </option>
                        {gender.map((gend) => (
                          <option key={gend.id} value={gend.value}>
                            {gend.label}
                          </option>
                        ))}
                      </select>
                    </div>

                  </div>

                  <div className="row">
                    <div className="col">
                      <label>Old Country</label>
                      <select
                        className="form-select"
                        style={{ width: "100%", marginTop: "0px" }}
                        value={user.country_id ? user.Profile.country_id : ""}
                        disabled
                      >
                        <option value="">---Select Country---</option>
                        {countryList.map((country) => (
                          <option key={country.id} value={country.id}>
                            {country.country}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col">
                      <label>New Country</label>
                      <select
                        className={user.country_id !== oldcountry ? "form-select is-invalid" : "form-select"}
                        onChange={(e) => {
                          // setProfile({ ...profile, country_id: e.target.value })
                        }}
                        value={user.country_id}
                      >
                        <option value="">---Select Country---</option>
                        {countryList.map((country) => (
                          <option key={country.id} value={country.id}>
                            {country.country}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col">
                      <label>Old State</label>
                      <select
                        className="form-select"
                        style={{ width: "100%", marginTop: "0px" }}
                        value={user.state_id ? user.Profile.state_id : ""}
                        disabled
                      >
                        <option value="">---Select State--</option>
                        {statesList.map((state) => (
                          <option key={state.id} value={state.id} selected={user.state_id === state.id}>
                            {state.state}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col">
                      <label>New State</label>
                      <select
                        className={user.state_id !== oldstate ? "form-select is-invalid" : "form-select"}
                        // onChange={(e) => {
                        //   handleChange(e.target.value)
                        //   setProfile({ ...profile, state_id: e.target.value })
                        // }}
                        value={user.state_id}
                      >
                        <option value="">---Select State--</option>
                        {statesList.map((state) => (
                          <option key={state.id} value={state.id} selected={user.state_id === state.id}>
                            {state.state}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col">
                      <label>Old LGA</label>
                      <select
                        className="form-select"
                        style={{ width: "100%", marginTop: "0px" }}
                        value={user.lga_id ? user.Profile.lga_id : ""}
                        disabled
                      >
                        <option value="">---Select Lga---</option>
                        {lgasList.length > 0 ? lgasList.map((lga) => (
                          <option key={lga.id} value={lga.id} selected={user.lga_id === lga.id}>
                            {lga.lga}
                          </option>)): ""
                        }
                      </select>
                    </div>

                    <div className="col">
                      <label>New LGA</label>
                      <select
                        className={user.lga_id !== oldlga ? "form-select is-invalid" : "form-select"}
                        //  onChange={(e) => {setProfile({ ...profile, lga_id: e.target.value })}}
                        value={user.lga_id}
                      >
                        <option value="">---Select Lga---</option>
                        {lgasList.length > 0 ? lgasList.map((lga) => (
                          <option key={lga.id} value={lga.id} selected={user.lga_id === lga.id}>
                            {lga.lga}
                          </option>)) : ""
                        }
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <label>Old Date of Birth</label>
                      <input
                        type="date"
                        className="form-control"
                        readOnly
                        value={user.date_of_birth ? user.Profile.date_of_birth : ""}
                      />
                    </div>

                    <div className="col">
                      <label>New Date of Birth</label>
                      <input
                        type="date"
                        className={user.date_of_birth !== olddate_of_birth ? "form-control is-invalid" : "form-control"}
                        value={user.date_of_birth}
                        // onChange={(e) => setProfile({ ...profile, date_of_birth: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col">
                      <label>Old Contact Address</label>
                      <input
                        type="text"
                        className="form-control"
                        readOnly
                        value={user.contact_address ? user.Profile.contact_address : ""}
                      />
                    </div>

                    <div className="col">
                      <label>New Contact Address</label>
                      <input
                        type="text"
                        className={user.contact_address !== oldcontact_address ?"form-control is-invalid" : "form-control"}
                        value={user.contact_address}
                        // onChange={(e) => setProfile({ ...profile, contact_address: e.target.value })}
                      />
                    </div>

                  </div>

                  <div className="row">
                    <div className="col">
                      <label>Old Permanent Home Address</label>
                      <input
                        type="text"
                        className="form-control"
                        readOnly
                        value={user.permanent_home_address ? user.Profile.permanent_home_address : ""}
                      />
                    </div>

                    <div className="col">
                      <label>New Permanent Home Address</label>
                      <input
                        type="text"
                        className={user.permanent_home_address !== oldpermanent_home_address ?"form-control is-invalid" : "form-control"}
                        value={user.permanent_home_address}
                        // onChange={(e) => setProfile({ ...profile, contact_address: e.target.value })}
                      />
                    </div>

                  </div>



                  {/* <div className="row">
                    <div className="col">
                      <label>Old University Attended</label>
                      <input
                        type="text"
                        className="form-control"
                        readOnly
                        value={user.university_attended ? user.Profile.university_attended : ""}
                      />
                    </div>

                    <div className="col">
                      <label>New University Attended</label>
                      <input
                        type="text"
                        className={user.university_attended !== olduniversity_attended ? "form-control is-invalid" :"form-control"}
                        value={user.university_attended}
                        // onChange={(e) => setProfile({ ...profile, university_attended: e.target.value })}
                      />
                    </div>
                  </div> */}

                  {/* <div className="row">
                    <div className="col">
                      <label>Old Law School Campus Attended</label>
                      <input
                        type="text"
                        className="form-control"
                        readOnly
                        value={user.law_sch_camp_attended ? user.Profile.law_sch_camp_attended : ""}
                      />
                    </div>

                    <div className="col">
                      <label>New Law School Campus Attended</label>
                      <input
                        type="text"
                        className={user.law_sch_camp_attended !== oldlaw_sch_camp_attended ? "form-control is-invalid" : "form-control"}
                        value={user.law_sch_camp_attended}
                        // onChange={(e) => setProfile({ ...profile, law_sch_camp_attended: e.target.value })}
                      />
                    </div>

                  </div> */}

                  <div className="row">
                    <div className="col">
                      <label>Old Year of Call to Bar</label>
                      <input
                        type="date"
                        className="form-control"
                        readOnly
                        value={user.year_of_call_to_bar ? user.Profile.year_of_call_to_bar : ""}
                      />
                    </div>

                    <div className="col">
                      <label>New Year of Call to Bar</label>
                      <input
                        type="date"
                        className={user.year_of_call_to_bar !== oldyear_of_call_to_bar ? "form-control is-invalid" : "form-control"}
                        value={user.year_of_call_to_bar}
                        // onChange={(e) => setProfile({ ...profile, year_of_call_to_bar: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col">
                      <label>Old Email</label>
                      <input
                        type="email"
                        className="form-control"
                        readOnly
                        value={user.email ? user.Profile.email : ""}
                      />
                    </div>

                    <div className="col">
                      <label>New Email</label>
                      <input
                        type="email"
                        className={ user.email !== oldemail ? "form-control is-invalid" : "form-control"}
                        value={user.email}
                        // onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col">
                      <label>Old Phone No.</label>
                      <input
                        type="phone"
                        className="form-control"
                        readOnly
                        value={user.phone ? user.Profile.phone : ""}
                      />
                    </div>

                    <div className="col">
                      <label>New Phone No.</label>
                      <input
                        type="phone"
                        className={ user.phone !== oldphone ? "form-control is-invalid" : "form-control" }
                        value={user.phone}
                        // onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col"></div>
                  </div>

                  <div className="row mt-3">
                    <div className="col text-right">
                      <h5 className="text-center">Uploaded Document(s)</h5>
                      <table class="table">
                        <thead>
                          <tr>
                            <th>Document Name</th>
                            <th>File</th>
                          </tr>
                        </thead>

                        <tbody>
                          {user.Documents &&
                            user.Documents.map((doc) => (
                              <tr>
                                <td>{doc.doc_name}</td>
                                <td>
                                  <a href={`${process.env.REACT_APP_UPLOAD_URL+doc.doc_url}`} target="_blank">
                                    Download File
                                  </a>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="row">
                    {/* Render the "Add Remark" field and button */}
                      <div className="col-md-8">
                          <label>
                            Add Remark
                            <br />
                            <div style={{ fontSize: "11px" }}>
                              (Enter Remark where necessary)
                            </div>
                          </label>
                          <textarea
                            className="form-control"
                            // required
                            value={newRemark.remark ? newRemark.remark : ""}
                            onChange={(e) =>
                              setNewRemark({
                                ...newRemark,
                                remark: e.target.value,
                              })
                            }
                          />
                      </div>
                      <div className="col-md-4 mt-8">
                        <button className="btn btn-primary py-1 px-1 m-1"
                          onClick={(e) => handleSaveRemark(e)}
                        >
                          <span className="fa fa-save"></span> Save
                        </button>
                        <button className="btn btn-warning py-1 px-1 m-1"
                          onClick={(e) => handleViewRemarks(e)}
                        >
                          <span className="fa fa-eye"></span> All Remarks
                        </button>
                      </div>
                  </div>

                  {/* Modal to display Remarks */}
                  <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                      <Modal.Title>Remarks</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      {remarksData.map((rem, index) => (
                        <Card key={index} className="mb-2">
                          <Card.Body>
                            <Card.Text>{index + 1}. {rem.remark.charAt(0).toUpperCase() + rem.remark.slice(1)}</Card.Text>
                            <Card.Text>Created on: {rem.createdAt && formatDate(rem.createdAt)}</Card.Text>
                            <Card.Text>By: {rem.User && rem.User.fullname} </Card.Text>
                          </Card.Body>
                        </Card>
                      ))}
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                  {/*End modal */}

                  {/* Modal to reject */}
                  <Modal show={showAddRemarkModal} onHide={handleCloseAddRemarkModal}>
                    <Modal.Header closeButton>
                      <Modal.Title>Reject change of name request</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <label>
                        Enter Remark
                        <br />
                        <div style={{ fontSize: '11px' }}>
                        <i className="text-danger text-center">Are you sure you want to reject change of name request? remark is required ***</i>
                        </div>
                      </label>
                      <textarea
                        className="form-control"
                        required
                        value={rejectModal.remark}
                        onChange={(e) => setRejectModal({...rejectModal, remark:e.target.value})}
                      />
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleCloseAddRemarkModal}>
                        Cancel
                      </Button>
                      <Button variant="primary" onClick={(e) => {remarkAndReject(e)}}>
                        Continue
                      </Button>
                    </Modal.Footer>
                  </Modal>
                  {/* End Modal to reject */}

                  <div className="row mt-5">
                      <div className="col-12 text-center pt-2"> 
                          {(user.status_id === 1 && (
                            <button
                              className="btn btn-primary py-1 px-1 m-1"
                              onClick={(e) => approveChangeOfName(e, user.id)}
                            >
                              {" "}
                              <span className="fa fa-check-circle"></span> Approve
                            </button>
                          ))}
      
                         {/* Check if user status is 0 or 1 */}
                        {user.status_id === 1 && (
                          <button
                            className="btn btn-danger py-1 px-1 m-1"
                            onClick={(e) => handleCloseAddRemarkModal(e)} 
                          >
                            <span className="fa fa-remove"></span> Reject
                          </button>
                        )}

                        <Link to={`/change-of-name-request`} className="btn btn-warning py-1 px-1 m-1">
                          {" "}
                          <span className="fa fa-backward"></span> Back
                        </Link>
                      </div>
                    
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditChangeOfName;

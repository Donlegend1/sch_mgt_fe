import React from "react";
import { useState, useContext, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import endpoint from "../../../context/endpoint";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ErrorAlert, SuccessAlert } from "../../../data/Toast/toast";
import PassportCard from "../PassportCard";
import SignatureCanvas from "react-signature-canvas"
import Loader from "../../../data/Loader/loader";

const Enrollment = () => {
  const [isLoading, setLoading] = useState(false);
  const [titleList, setTitle] = useState([]);
  const [countryList, setCountry] = useState([]);
  const [statesList, setState] = useState([]);
  const [lgasList, setLga] = useState([]);
  const [sign, setSign] = useState()
  const [url, setUrl] = useState()
  const params = useParams();
  const navigate = useNavigate();

  const [enroll, setEnroll] = useState({
    title_id: "",
    graduand_id: "",
    surname: "",
    first_name: "",
    middle_name: "",
    passport_url: null,
    gender: "",
    country_id: "",
    state_id: "",
    lga_id: "",
    date_of_birth: "",
    permanent_home_address: "",
    contact_address: "",
    year_of_call_to_bar: "",
    law_sch_camp_attended: "",
    year_of_admission_law_sch: "",
    specimen_signature: null,
    email: "",
    phone_number: "",
    alternative_name: "",
  });

  const gender = [
    { id: 1, value: "Male", label: "Male" },
    { id: 2, value: "Female", label: "Female" },
  ];

  useEffect(() => {
    getCountries();
    getTitles();
    allStates();
    getUser()
  }, []);


  const getUser = async () => {
    await endpoint.get(`/enrollment/show/${params.id}`)
      .then((res) => {
        console.log("user info", res.data.data)
        setEnroll(res.data.data)
        handleChange(res.data.data.state_id)
        setLoading(false)
      })
      .catch((err) => console.log(err))
  }

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
        console.log("title list data", res.data.data);
        setTitle(res.data.data);
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

  const [previewImage, setPreviewImage] = useState(null);
  const getPreview = (targetFile) => {
    if (targetFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(targetFile);
    } else {
      setPreviewImage(null)
    }

  }

  const handleClear = (e) => {
    e.preventDefault()
    sign.clear()
  }

  const handleChange = async (id) => {
    await endpoint
      .get(`/state/show/${id}`)
      .then((res) => {
        console.log(res.data.data.Lgas);
        setLga(res.data.data.Lgas);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const data = new FormData();
    data.append('title_id', enroll.title_id);
    data.append('graduand_id', enroll.graduand_id);
    data.append('surname', enroll.surname);
    data.append('first_name', enroll.first_name);
    data.append('middle_name', enroll.middle_name);
    data.append('passport_url', enroll.passport_url);
    data.append('gender', enroll.gender);
    data.append('country_id', enroll.country_id);
    data.append('state_id', enroll.state_id);
    data.append('lga_id', enroll.lga_id ? enroll.lga_id : "");
    data.append('date_of_birth', enroll.date_of_birth);
    data.append('permanent_home_address', enroll.permanent_home_address);
    data.append('contact_address', enroll.contact_address);
    data.append('university_attended', enroll.university_attended);
    data.append('year_of_call_to_bar', enroll.year_of_call_to_bar);
    data.append('law_sch_camp_attended', enroll.law_sch_camp_attended);
    data.append('year_of_admission_law_sch', enroll.year_of_admission_law_sch);
    data.append('specimen_signature', url);
    data.append('email', enroll.email);
    data.append('phone', enroll.phone);
    data.append('alternative_name', enroll.alternative_name);

    await endpoint.put(`enrollment/update/${params.id}`, data)
      .then((res) => {
        console.log(res.data);
        setLoading(false)
        SuccessAlert(res.data.message)
        getUser()
        // navigate(`${process.env.PUBLIC_URL}/enrolled-user/${params.id}`)
        // navigate(`/to-enroll`);
      }).catch((err) => {
        setLoading(false)
        //  ErrorAlert(err.response.data.message)
        console.log(err)
      })

  }

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
            <p className="fs-5 fw-bold text-primary"></p>
            <h3 className="mb-5">Edit | Confirm Enrollment</h3>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-12">
              {isLoading && <Loader />}
              {!isLoading &&
                <form className="form-horizontal" onSubmit={handleSubmit} encType="multipart/form-data">
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
                        <label>Upload Passport</label>
                        <input type="file" name="passport_url" className="form-control"
                          onChange={(e) => {
                            getPreview(e.target.files[0])
                            setEnroll({ ...enroll, passport_url: e.target.files[0] })
                          }}
                        />
                      </div>
                      <div className="col text-right">
                        {previewImage ? (<PassportCard image={previewImage} />) : (enroll.passport_url !== null) ? (<PassportCard image={process.env.REACT_APP_UPLOAD_URL + enroll.passport_url} />) : ''}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <label>Title</label>
                        <select className="form-select" style={{ width: '100%', marginTop: '0px' }}
                          onChange={(e) => {
                            setEnroll({ ...enroll, title_id: e.target.value })
                          }
                          }
                          value={enroll.title_id ?? ""}
                        >
                          <option value="">---Select Title---</option>
                          {titleList.map(title => (<option key={title.id} value={title.id}>{title.name}</option>))}
                        </select>
                      </div>
                      <div className="col">
                        <label>surname</label>
                        <input type="text" className="form-control"
                          value={enroll.surname ? enroll.surname : ""}
                          onChange={(e) => setEnroll({ ...enroll, surname: e.target.value })}
                        />
                      </div>

                    </div>
                    <div className="row">
                      <div className="col">
                        <label>First Name</label>
                        <input type="text" className="form-control"
                          value={enroll.first_name ?? ''}
                          onChange={(e) => setEnroll({ ...enroll, first_name: e.target.value })}
                        />
                      </div>
                      <div className="col">
                        <label>Middle Name</label>
                        <input type="text" className="form-control"
                          value={enroll.middle_name ?? ""}
                          onChange={(e) => setEnroll({ ...enroll, middle_name: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="row">

                      <div className="col">
                        <label>Gender</label>
                        <select className="form-select" style={{ width: '100%', marginTop: '0px' }}
                          value={enroll.gender}
                          onChange={(e) => setEnroll({ ...enroll, gender: e.target.value })}
                        >
                          <option value="">Select Gender... </option>
                          {gender.map((gend) => (<option key={gend.id} value={gend.value}>{gend.label}</option>))}
                        </select>

                      </div>
                      <div className="col">
                        <label>Country</label>
                        <select className="form-select" style={{ width: '100%', marginTop: '0px' }}
                          onChange={(e) => {
                            setEnroll({ ...enroll, country_id: e.target.value })
                          }
                          }
                          value={enroll.country_id ?? ''}
                        >
                          <option value="">---Select Country---</option>
                          {countryList.map(country => (<option key={country.id} value={country.id}>{country.country}</option>))}
                        </select>
                      </div>

                    </div>
                    <div className="row">

                      <div className="col">
                        <label>State</label>
                        <select className="form-select" style={{ width: '100%', marginTop: '0px' }}
                          onChange={(e) => {
                            handleChange(e.target.value)
                            setEnroll({ ...enroll, state_id: e.target.value })
                          }}
                          value={enroll.state_id ?? ''}
                        >
                          <option value="">---Select State--</option>
                          {statesList.map(state => (<option key={state.id} value={state.id} selected={enroll.state_id === state.id}>{state.state}</option>))}
                        </select>
                      </div>
                      <div className="col">
                        <label>LGA</label>
                        <select className="form-select" style={{ width: '100%', marginTop: '0px' }}
                          onChange={(e) => {
                            setEnroll({ ...enroll, lga_id: e.target.value })
                          }
                          }
                          value={enroll.lga_id ?? ''}
                        >
                          <option value="">---Select Lga---</option>
                          {lgasList.length > 0 ? lgasList.map(lga => (<option key={lga.id} value={lga.id} selected={enroll.lga_id == lga.id}>{lga.lga}</option>)) : ""}
                        </select>
                      </div>

                    </div>
                    <div className="row">

                      <div className="col">
                        <label>Date of Birth</label>
                        <input type="date" className="form-control"
                          value={enroll.date_of_birth ?? ''}
                          onChange={(e) => setEnroll({ ...enroll, date_of_birth: e.target.value })}
                        />
                      </div>
                      <div className="col">
                        <label>Permanent Home Address</label>
                        <input type="text" className="form-control"
                          value={enroll.permanent_home_address ?? ''}
                          onChange={(e) => setEnroll({ ...enroll, permanent_home_address: e.target.value })}
                        />

                      </div>

                    </div>
                    <div className="row">
                      <div className="col">
                        <label>Contact Address</label>
                        <input type="text" className="form-control"
                          value={enroll.contact_address ?? ''}
                          onChange={(e) => setEnroll({ ...enroll, contact_address: e.target.value })}
                        />

                      </div>

                      <div className="col">
                        <label>University Attended</label>
                        <input type="text" className="form-control"
                          value={enroll.university_attended ?? ""}
                          onChange={(e) => setEnroll({ ...enroll, university_attended: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col">
                        <label>Law School Campus Attended</label>
                        <input type="text" className="form-control"
                          value={enroll.law_sch_camp_attended ?? ""}
                          onChange={(e) => setEnroll({ ...enroll, law_sch_camp_attended: e.target.value })}
                        />
                      </div>

                      {/* <div className="col">
                        <label>Year of admission into Law School</label>
                        <input
                          type="date"
                          defaultValue={enroll.year_of_admission_law_sch ? enroll.year_of_admission_law_sch : ""}
                          className="form-control"
                          onChange={(e) => setEnroll({ ...enroll, year_of_admission_law_sch: e.target.value })}
                        />
                      </div> */}
                      <div className="col">
                        <label>Year of Call to Bar</label>
                        <div className="form-control">{enroll.year_of_call_to_bar ? enroll.year_of_call_to_bar : ""}</div>
                      </div>
                    </div>

                    <div className="row">
                      {/* <div className="col">
                        <label>Year of Call to Bar</label>
                        <input type="date" className="form-control"
                          value={enroll.year_of_call_to_bar ?? ''}
                          onChange={(e) => setEnroll({ ...enroll, year_of_call_to_bar: e.target.value })}
                        />
                      </div> */}

                      <div className="col">
                        <label>Email</label>
                        <input type="email" className="form-control"
                          value={enroll.email ?? ''}
                          onChange={(e) => setEnroll({ ...enroll, email: e.target.value })}
                        />
                      </div>

                      <div className="col">
                        <label>Phone Number</label>
                        <input type="text" className="form-control"
                          value={enroll.phone ?? ''}
                          onChange={(e) => setEnroll({ ...enroll, phone: e.target.value })}

                        />
                      </div>

                    </div>
                    <div className="row">

                    </div>
                    <div className="row">
                      <div className="col m-2">
                        <label>Signature</label><br></br>

                        <SignatureCanvas
                          ref={data => setSign(data)}
                          onEnd={() => setUrl(sign.getTrimmedCanvas().toDataURL('image/png'))}
                          canvasProps={{ width: 500, height: 70, className: 'sigCanvas' }}
                        />
                        <button className="btn btn-sm btn-warning" onClick={(e) => handleClear(e)}>Clear Signature field</button>

                      </div>
                    </div>
                    {/* <div className="row">
                      <div className="col">
                        <label>Alternative Name
                          <br />
                          <div style={{ fontSize: '11px' }}>
                            (State new Name if different from Name on Certificate) -- (Proof of Change of Name if any)
                          </div>
                        </label>
                        <input type="text" className="form-control"
                          value={enroll.alternative_name ?? ''}
                          onChange={(e) => setEnroll({ ...enroll, alternative_name: e.target.value })}
                        />
                      </div>

                    </div> */}


                    <div className="row">
                      <div className="mt-2 text-right">
                        <label>Signed...</label><br />
                        {enroll.specimen_signature ?
                          <img src={process.env.REACT_APP_UPLOAD_URL + enroll.specimen_signature} crossOrigin="anonymous" alt="Authorized Signatory..." />
                          : ``}
                      </div>
                      <div className="mt-1">
                        {enroll && enroll.surname + ' ' + enroll.first_name}
                      </div>
                    </div>

                    <div className="row">

                      <div className="col-12 text-center pt-2">
                        <button className="btn btn-primary py-2 px-2 m-1" type="submit"> <span className="fa fa-edit"></span> Update</button>
                        <Link to={`/enrollment-confirmation/${enroll.id}`} className="btn btn-warning py-2 px-2 m-1"> <span className="fa fa-backward"></span> Back</Link>
                      </div>

                    </div>
                  </div>
                </form>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Enrollment;

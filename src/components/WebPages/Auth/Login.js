import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import * as custompagesswitcherdata from "../../../data/Switcher/Custompagesswitcherdata"
import { Context } from "../../../context/Context";
import endpoint from '../../../context/endpoint'
import { toast } from 'react-toastify';
import BreadCrumb from "../../Scn-WebComponents/Components/BreadCrumb";

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { dispatch, isFetching } = useContext(Context)
  const [loading, setLoading] = useState(false)

  const errorAlert = (message) => {
    toast.error(message, {
      position: "top-center",
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,

    });
  }

  const handleSbmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    setLoading(true)
    try {
      const res = await endpoint.post("/auth/login", {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      })

      const modules = await endpoint.get(`/assignsubmodule/list/permission/user/${res.data.data.user.id}`)
      console.log(modules.data.data)
      localStorage.setItem("modules", JSON.stringify(modules.data.data))

      delete res.data.data.user.password
      console.log("login response", res.data.data)
      res.data.data && setLoading(false);
      res.data.data && dispatch({ type: "LOGIN_SUCCESS", payload: res.data.data });
      res.data.data && window.location.replace('/')

    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE" });
      setLoading(false)
      console.log(error.response.data)
      errorAlert(error.response.data.message)

    }
  }

  return (
    <>
      {/* <BreadCrumb /> */}
      <hr />
      {/* <div className="">
        <div
          className="container-login100"
          style={{ opacity: `0.99` }}>
          <div className="wrap-login100 p-0">
            <Card.Body>
              <div className="col col-login mx-auto">
                <div className="text-center">
                  <Link to={`${process.env.PUBLIC_URL}/home`}>
                    <img
                      src={"/web2/img/eazischhool1.png"}
                      className="header-brand-img-2"
                      alt=""
                    />
                  </Link>
                </div>
              </div>
              <form
                className="login100-form validate-form"
                onSubmit={handleSbmit}>
                <div className="row-2"></div>
                <span className="login100-form-title">Login</span>
               
                <div className="wrap-input100 validate-input">
                  <input
                    className="input100"
                    type="text"
                    placeholder="Email"
                    ref={emailRef}
                  />
                  <span className="focus-input100"></span>
                  <span className="symbol-input100">
                    <i
                      className="zmdi zmdi-email"
                      aria-hidden="true"></i>
                  </span>
                </div>
                <div className="wrap-input100 validate-input">
                  <input
                    className="input100"
                    type="password"
                    placeholder="Password"
                    ref={passwordRef}
                  />
                  <span className="focus-input100"></span>
                  <span className="symbol-input100">
                    <i
                      className="zmdi zmdi-lock"
                      aria-hidden="true"></i>
                  </span>
                </div>

                <div className="container-login100-form-btn">
                  <button
                    className={
                      loading
                        ? "login100-form-btn btn-primary btn-loading"
                        : "login100-form-btn btn-primary"
                    }
                    disabled={isFetching}
                    style={{ border: "0", outline: "none" }}>
                    {loading ? "" : "Login"}
                  </button>
                </div>
                
                <div className="text-center pt-1">
                  <p className="mb-0">
                    <Link
                      to={`${process.env.PUBLIC_URL}/forgotPassword/`}
                      className="text-primary ms-1">
                      Forgot Password?
                    </Link>
                  </p>
                </div>
              </form>
            </Card.Body>
          </div>
        </div>
      </div> */}

      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="text-center mb-5">
            <h5
              className="text-primary text-uppercase mb-3"
              style={{ "letter-spacing": "5px" }}>
              Fill in your login credentials to continue
            </h5>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="contact-form bg-secondary rounded p-5">
                <div id="success" />
                <div className="text-center">
                  <h1>Login</h1>
                </div>
                <div className="col col-login mx-auto ">
                  <div className="text-center mb-100">
                    <Link to={`${process.env.PUBLIC_URL}/home`}>
                      <img
                        src={"/web2/img/eazischool3.png"}
                        className="header-brand-img-2"
                        alt=""
                      />
                    </Link>
                  </div>
                </div>
                <form
                  onSubmit={handleSbmit}
                  className="mt-5"
                  name="sentMessage"
                  id="contactForm"
                  noValidate="novalidate">
                  <div className="wrap-input100 validate-input">
                    <input
                      className="input100"
                      type="text"
                      placeholder="Email"
                      ref={emailRef}
                    />
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                      <i
                        className="zmdi zmdi-email"
                        aria-hidden="true"></i>
                    </span>
                  </div>
                  <div className="wrap-input100 validate-input">
                    <input
                      className="input100"
                      type="password"
                      placeholder="Password"
                      ref={passwordRef}
                    />
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                      <i
                        className="zmdi zmdi-lock"
                        aria-hidden="true"></i>
                    </span>
                  </div>
                  <div className="text-center pt-1 my-5">
                    <p className="mb-0">
                      <Link
                        to={`${process.env.PUBLIC_URL}/forgotPassword/`}
                        className="text-primary ms-1">
                        Forgot Password?
                      </Link>
                    </p>
                  </div>

                  <div className="control-group"></div>
                  <div className="control-group"></div>
                  <div className="text-center">
                    <button
                      className={
                        loading
                          ? "login100-form-btn btn-primary btn-loading"
                          : "login100-form-btn btn-primary"
                      }
                      disabled={isFetching}
                      style={{ border: "0", outline: "none" }}>
                      {loading ? "" : "Login"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

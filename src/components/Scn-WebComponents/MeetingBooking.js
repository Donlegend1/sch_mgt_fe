import React from "react";

const MeetingBooking = () => {
  return (
    <div
      className="container-fluid bg-registration py-5"
      style={{ margin: "90px 0" }}>
      <div className="container py-5">
        <div className="row align-items-center">
          <div className="col-lg-7 mb-5 mb-lg-0">
            <div className="mb-4">
              <h5
                className="text-primary text-uppercase mb-3"
                style={{ letterSpacing: "5px" }}>
                Schedule a Meeting
              </h5>
              <h1 className="text-white">Book a Meeting with Us</h1>
            </div>
            <p className="text-white">
              Whether you have questions about our application, need support, or
              just want to discuss potential partnerships, we're here to help.
              Schedule a meeting at your convenience.
            </p>
            <ul className="list-inline text-white m-0">
              <li className="py-2">
                <i className="fa fa-check text-primary mr-3" />
                Choose a convenient time that works for you.
              </li>
              <li className="py-2">
                <i className="fa fa-check text-primary mr-3" />
                Discuss your specific needs and get personalized support.
              </li>
              <li className="py-2">
                <i className="fa fa-check text-primary mr-3" />
                Get insights and advice from our expert team.
              </li>
            </ul>
          </div>
          <div className="col-lg-5">
            <div className="card border-0">
              <div className="card-header bg-light text-center p-4">
                <h1 className="m-0">Book a Meeting</h1>
              </div>
              <div className="card-body rounded-bottom bg-primary p-5">
                <form>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control border-0 p-4"
                      placeholder="Your name"
                      required="required"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control border-0 p-4"
                      placeholder="Your email"
                      required="required"
                    />
                  </div>
                  <div className="form-group">
                    <select
                      className="custom-select border-0 px-4"
                      style={{ height: "47px" }}>
                      <option selected>Select a meeting type</option>
                      <option value={1}>Consultation</option>
                      <option value={2}>Support</option>
                      <option value={3}>Partnership Discussion</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <input
                      type="date"
                      className="form-control border-0 p-4"
                      required="required"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="time"
                      className="form-control border-0 p-4"
                      required="required"
                    />
                  </div>
                  <div>
                    <button
                      className="btn btn-dark btn-block border-0 py-3"
                      type="submit">
                      Book Now
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingBooking;

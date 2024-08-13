import React from "react";

const Features = () => {
  return (
    <div className="container-fluid py-5">
      <div className="container pt-5 pb-3">
        <div className="text-center mb-5">
          <h5
            className="text-primary text-uppercase mb-3"
            style={{ letterSpacing: "5px" }}>
            Features
          </h5>
          <h1>Explore Our Application Features</h1>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-6 mb-4 d-flex align-items-stretch">
            <div className="card border-0 shadow h-100">
              <img
                className="card-img-top"
                src="/web2/img/register.jpg"
                alt="Student Registration"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h4 className="card-title text-black font-weight-medium">
                  Student Registration
                </h4>
                <p className="card-text text-primary">
                  Seamlessly register students and manage their profiles
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-4 d-flex align-items-stretch">
            <div className="card border-0 shadow h-100">
              <img
                className="card-img-top"
                src="/web2/img/staff.jpg"
                alt="Staff Assignment"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h4 className="card-title text-black font-weight-medium">
                  Staff Management
                </h4>
                <p className="card-text text-primary">
                  Assign staff to classes and manage teaching roles
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-4 d-flex align-items-stretch">
            <div className="card border-0 shadow h-100">
              <img
                className="card-img-top"
                src="/web2/img/result.jpg"
                alt="Result Calculation"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h4 className="card-title text-black font-weight-medium">
                  Result Calculation
                </h4>
                <p className="card-text text-primary">
                  Automatically calculate and manage student results
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-4 d-flex align-items-stretch">
            <div className="card border-0 shadow h-100">
              <img
                className="card-img-top"
                src="/web2/img/performance.jpg"
                alt="Parental Access"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h4 className="card-title text-black font-weight-medium">
                  Parental Access
                </h4>
                <p className="card-text text-primary">
                  Enable parents to monitor their children's performance from
                  home
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-4 d-flex align-items-stretch">
            <div className="card border-0 shadow h-100">
              <img
                className="card-img-top"
                src="/web2/img/finance.jpg"
                alt="Parental Access"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h4 className="card-title text-black font-weight-medium">
                  Fund Management
                </h4>
                <p className="card-text text-primary">
                 Control how funds are managed in your school by preparing payslip..
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-4 d-flex align-items-stretch">
            <div className="card border-0 shadow h-100">
              <img
                className="card-img-top"
                src="/web2/img/bus-tracking.jpg"
                alt="Bus Tracking"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h4 className="card-title text-black font-weight-medium">
                  Bus Tracking
                </h4>
                <p className="card-text text-primary">
                  Track the location of school buses in real-time
                </p>
              </div>
            </div>
          </div>
          {/* Add more features as needed */}
        </div>
      </div>
    </div>
  );
};

export default Features;

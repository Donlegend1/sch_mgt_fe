import React from "react";

const About = () => {
  return (
    <div className="container-fluid py-5">
      <div className="container py-5">
        <div className="row align-items-center">
          <div className="col-lg-5">
            <img
              className="img-fluid rounded mb-4 mb-lg-0"
              src="/web2/img/about.jpg"
              alt="About Us"
            />
          </div>
          <div className="col-lg-7">
            <div className="text-left mb-4">
              <h5
                className="text-primary text-uppercase mb-3"
                style={{ letterSpacing: "5px" }}>
                About Us
              </h5>
              <h1>Comprehensive School Management Made Simple</h1>
            </div>
            <p>
              Welcome to our School Management Application, a powerful and
              intuitive solution designed to streamline and manage every aspect
              of school administration. Whether it’s registering students and
              staff, assigning teachers to classes, calculating student results,
              or enabling parents to monitor their children’s academic
              performance from home, our platform covers it all.
            </p>
            <p>
              Our application offers a seamless experience for administrators,
              educators, and parents alike. With features such as real-time
              school bus tracking, automated result processing, and easy access
              to student information, we make it easier to manage and oversee
              the day-to-day operations of your school.
            </p>
            <p>
              We believe in leveraging technology to enhance the educational
              experience, ensuring that schools operate efficiently and
              effectively. Join us in transforming the way schools are managed,
              making education more accessible and transparent for everyone
              involved.
            </p>
            <a
              href="/about"
              className="btn btn-primary py-md-2 px-md-4 font-weight-semi-bold mt-2">
              Learn More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

import React from 'react';

const Testimonial = () => {
    return (
      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="text-center mb-5">
            <h5
              className="text-primary text-uppercase mb-3"
              style={{ "letter-spacing": "5px" }}>
              Testimonial
            </h5>
            <h1>What Say Our Students</h1>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="owl-carousel testimonial-carousel">
                <div className="text-center">
                  <i className="fa fa-3x fa-quote-left text-primary mb-4" />
                  <h4 className="font-weight-normal mb-4">
                    Dolor eirmod diam stet kasd sed. Aliqu rebum est eos. Rebum
                    elitr dolore et eos labore, stet justo sed est sed. Diam sed
                    sed dolor stet amet eirmod eos labore diam
                  </h4>
                  <img
                    className="img-fluid mx-auto mb-3"
                    src="/web2/img/testimonial-1.jpg"
                    alt
                  />
                  <h5 className="m-0">Client Name</h5>
                  <span>Profession</span>
                </div>
                <div className="text-center">
                  <i className="fa fa-3x fa-quote-left text-primary mb-4" />
                  <h4 className="font-weight-normal mb-4">
                    Dolor eirmod diam stet kasd sed. Aliqu rebum est eos. Rebum
                    elitr dolore et eos labore, stet justo sed est sed. Diam sed
                    sed dolor stet amet eirmod eos labore diam
                  </h4>
                  <img
                    className="img-fluid mx-auto mb-3"
                    src="/web2/img/testimonial-2.jpg"
                    alt
                  />
                  <h5 className="m-0">Client Name</h5>
                  <span>Profession</span>
                </div>
                <div className="text-center">
                  <i className="fa fa-3x fa-quote-left text-primary mb-4" />
                  <h4 className="font-weight-normal mb-4">
                    Dolor eirmod diam stet kasd sed. Aliqu rebum est eos. Rebum
                    elitr dolore et eos labore, stet justo sed est sed. Diam sed
                    sed dolor stet amet eirmod eos labore diam
                  </h4>
                  <img
                    className="img-fluid mx-auto mb-3"
                    src="/web2/img/testimonial-3.jpg"
                    alt
                  />
                  <h5 className="m-0">Client Name</h5>
                  <span>Profession</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Testimonial;

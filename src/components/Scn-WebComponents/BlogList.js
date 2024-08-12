import React from 'react';

const BlogList = () => {
    return (
      <div className="container-fluid py-5">
        <div className="container pt-5 pb-3">
          <div className="text-center mb-5">
            <h5
              className="text-primary text-uppercase mb-3"
              style={{ "letter-spacing": "5px" }}>
              Our Blog
            </h5>
            <h1>Latest From Our Blog</h1>
          </div>
          <div className="row pb-3">
            <div className="col-lg-4 mb-4">
              <div className="blog-item position-relative overflow-hidden rounded mb-2">
                <img
                  className="img-fluid"
                  src="/web2/img/blog-1.jpg"
                  alt
                />
                <a
                  className="blog-overlay text-decoration-none"
                  href>
                  <h5 className="text-white mb-3">
                    Lorem elitr magna stet eirmod labore amet labore clita at ut
                    clita
                  </h5>
                  <p className="text-primary m-0">Jan 01, 2050</p>
                </a>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="blog-item position-relative overflow-hidden rounded mb-2">
                <img
                  className="img-fluid"
                  src="/web2/img/blog-2.jpg"
                  alt
                />
                <a
                  className="blog-overlay text-decoration-none"
                  href>
                  <h5 className="text-white mb-3">
                    Lorem elitr magna stet eirmod labore amet labore clita at ut
                    clita
                  </h5>
                  <p className="text-primary m-0">Jan 01, 2050</p>
                </a>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="blog-item position-relative overflow-hidden rounded mb-2">
                <img
                  className="img-fluid"
                  src="/web2/img/blog-3.jpg"
                  alt
                />
                <a
                  className="blog-overlay text-decoration-none"
                  href>
                  <h5 className="text-white mb-3">
                    Lorem elitr magna stet eirmod labore amet labore clita at ut
                    clita
                  </h5>
                  <p className="text-primary m-0">Jan 01, 2050</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default BlogList;

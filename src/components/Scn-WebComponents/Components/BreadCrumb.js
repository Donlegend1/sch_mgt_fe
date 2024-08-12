import React from 'react';

const BreadCrumb = () => {
    return (
      <div
        className="container-fluid page-header"
        style={{ "margin-bottom": "90px" }}>
        <div className="container">
          <div
            className="d-flex flex-column justify-content-center"
            style={{ "min-height": "300px" }}>
            <h3 className="display-4 text-white text-uppercase">Contact</h3>
            <div className="d-inline-flex text-white">
              <p className="m-0 text-uppercase">
                <a
                  className="text-white"
                  href>
                  Home
                </a>
              </p>
              <i className="fa fa-angle-double-right pt-1 px-3" />
              <p className="m-0 text-uppercase">Contact</p>
            </div>
          </div>
        </div>
      </div>
    );
}

export default BreadCrumb;

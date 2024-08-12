import React from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col, Breadcrumb } from "react-bootstrap";
export default function AvatarRounded() {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Avatar-Rounded</h1>
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item"href="#">
              Elements
            </Breadcrumb.Item>
            <Breadcrumb.Item className="breadcrumb-item active breadcrumds" aria-current="page">
              Avatar-Rounded
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="ms-auto pageheader-btn">
          <Link to="#" className="btn btn-primary btn-icon text-white me-3">
            <span >
              <i className="fe fe-plus"></i>&nbsp;
            </span>
            Add Account
          </Link>
          <Link to="#" className="btn btn-success btn-icon text-white">
            <span>
              <i className="fe fe-log-in"></i>&nbsp;
            </span>
            Export
          </Link>
        </div>
      </div>

      <Row>
        <Col lg={6} md={12}>
          <Card>
            <Card.Header>
              <h3 className="card-title">Simple Round avatar</h3>
            </Card.Header>
            <Card.Body>
              <div className="text-wrap">
                <div className="example">
                  <div className="avatar-list">
                    
                    <img
                      className="avatar brround cover-image"
                     
                      src={
                        require("../../../assets/images/users/12.jpg")
                      }alt=""
                    />

                    
                    <img
                      className="avatar  brround cover-image"
                     
                      src={
                        require("../../../assets/images/users/13.jpg")
                      }alt=""
                    />

                    <img
                      className="avatar  brround cover-image"
                     
                      src={
                        require("../../../assets/images/users/11.jpg")
                      }alt=""
                    />

                    
                    <img
                      className="avatar  brround cover-image"
                     
                      src={
                        require("../../../assets/images/users/12.jpg")
                      }alt=""
                    />
                   
                    <img
                      className="avatar  brround cover-image"
                     
                      src={
                        require("../../../assets/images/users/14.jpg")
                      }alt=""
                    />
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6} md={12}>
          <Card>
            <Card.Header>
              <h3 className="card-title">RoundAvatars list</h3>
            </Card.Header>
            <Card.Body>
              <div className="text-wrap">
                <div className="example">
                  <div className="avatar-list avatar-list-stacked">
                   
                    <img
                      className="avatar brround cover-image"
                     
                      src={
                        require("../../../assets/images/users/12.jpg")
                      }alt=""
                    />
                   
                    <img
                      className="avatar brround cover-image"
                     
                      src={
                        require("../../../assets/images/users/1.jpg")
                      }alt=""
                    />
                    
                    <img
                      className="avatar brround cover-image"
                     
                      src={
                        require("../../../assets/images/users/19.jpg")
                      }alt=""
                    />
                    
                    <img
                      className="avatar brround cover-image"
                     
                      src={
                        require("../../../assets/images/users/2.jpg")
                      }alt=""
                    />
                    
                    <img
                      className="avatar brround cover-image"
                     
                      src={
                        require("../../../assets/images/users/14.jpg")
                      }alt=""
                    />
                    <span className="avatar brround cover-image bg-primary">
                      +8
                    </span>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col lg={6} md={12}>
          <Card>
            <Card.Header>
              <h3 className="card-title">RoundAvatar size</h3>
            </Card.Header>
            <Card.Body>
              <div className="text-wrap">
                <div className="example">
                  <div className="avatar-list">
                   
                    <img
                      className="avatar avatar-sm brround cover-image"
                     
                      src={
                        require("../../../assets/images/users/15.jpg")
                      }alt=""
                    />
                   x
                    <img
                      className="avatar brround cover-image"
                     
                      src={
                        require("../../../assets/images/users/13.jpg")
                      }alt=""
                    />
                   
                    <img
                      className="avatar avatar-md brround cover-image"
                     
                      src={
                        require("../../../assets/images/users/16.jpg")
                      }alt=""
                    />
                    
                    <img
                      className="avatar avatar-lg brround cover-image"
                     
                      src={
                        require("../../../assets/images/users/17.jpg")
                      }alt=""
                    />
                   
                    <img
                      className="avatar avatar-xl brround cover-image"
                     
                      src={
                        require("../../../assets/images/users/14.jpg")
                      }alt=""
                    />
                   
                    <img
                      className="avatar avatar-xxl brround cover-image"
                     
                      src={
                        require("../../../assets/images/users/18.jpg")
                      }alt=""
                    />
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6} md={12}>
          <Card>
            <Card.Header>
              <h3 className="card-title">RoundAvatar status</h3>
            </Card.Header>
            <Card.Body>
              <div className="text-wrap">
                <div className="example">
                  <div className="avatar-list">
                    <span className="avatar brround cover-image">
                      <img
                        className="avatar brround cover-image"
                       
                        src={
                          require("../../../assets/images/users/19.jpg")
                        }alt=""
                      />
                    </span>
                    <span className="avatar brround cover-image">
                     
                      <img
                        className="avatar brround cover-image"
                       
                        src={
                          require("../../../assets/images/users/15.jpg")
                        }alt=""
                      />
                      <span className="avatar-status bg-secondary"></span>
                    </span>
                    <span className="avatar brround cover-image">
                     
                      <img
                        className="avatar brround cover-image"
                       
                        src={
                          require("../../../assets/images/users/20.jpg")
                        }alt=""
                      />
                      <span className="avatar-status bg-red"></span>
                    </span>
                    <span className="avatar brround cover-image">
                     
                      <img
                        className="avatar brround cover-image"
                       
                        src={
                          require("../../../assets/images/users/11.jpg")
                        }alt=""
                      />
                      <span className="avatar-status bg-green"></span>
                    </span>
                    <span className="avatar brround cover-image">
                     
                      <img
                        className="avatar brround cover-image"
                       
                        src={
                          require("../../../assets/images/users/17.jpg")
                        }alt=""
                      />
                      <span className="avatar-status bg-yellow"></span>
                    </span>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

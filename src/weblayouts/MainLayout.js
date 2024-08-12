import React, { Fragment } from "react";
import Header from "../weblayouts/Header";
import Footer from "../weblayouts/Footer";
import { Outlet } from "react-router-dom";
import "./assets/css/bootstrap-grid.css";
import "./assets/css/bootstrap-grid.min.css";
import "./assets/css/bootstrap-reboot.css";
import "./assets/css/bootstrap-reboot.min.css";
import "./assets/css/bootstrap.css";
import "./assets/css/bootstrap.min.css";
import "./assets/css/style.css";
import "./assets/css/style.min.css";

const MainLayout = () => {
  return (
    <Fragment>
      <Header />
      <Outlet />
      <Footer />
    </Fragment>
  );
};

export default MainLayout;

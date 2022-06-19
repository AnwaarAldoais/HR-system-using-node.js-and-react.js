import React from "react";
import SideMenu from "../side-menu";
import Activities from "../Activities";
import MainContent from "../MainContent";
import { Scrollbar } from "react-scrollbars-custom";
import Logout from "../logout";

function WideLayout({ children, title }) {
  return (
    <>
      <div className="main-div">
        <div className="main-container">
          <div className="inner-bg">
            <div className="side-content">
              <SideMenu />
            </div>
            <div className="main-content">
              <Logout />
              <h1 className="attendance-title">{title}</h1>

              <div className="outer-container">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WideLayout;

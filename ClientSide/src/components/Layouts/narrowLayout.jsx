import React from "react";
import SideMenu from "../side-menu";
import Activities from "../Activities";
import MainContent from "../MainContent";
import Logout from "../logout";

function NarrowLayout() {
  return (
    <>
      <div className="main-div">
        <div className="main-container">
          <div className="inner-bg">
            <div className="side-content">
              <SideMenu />
            </div>
            <div className="activites">
              <Activities />
            </div>
            <div className="main-infos">
              <MainContent />
              <Logout />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NarrowLayout;

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

function Activities() {
  return (
    <React.Fragment>
      <h2 className="act-header">My last Activities</h2>
      <div className="act-date">
        <p>16 Apr 2021</p>
        <hr></hr>
      </div>
      <div className="activity">
        <h1 className="act-title">Learn new language</h1>
        <p className="act-txt">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam,
          temporibus
        </p>
        <a href="#">
          {" "}
          see details{" "}
          <FontAwesomeIcon
            className="icon"
            icon={faEye}
            size="xs"
          ></FontAwesomeIcon>
        </a>
      </div>

      <div className="activity">
        <h1 className="act-title">Learn new language</h1>
        <p className="act-txt">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam,
          temporibus
        </p>
        <a href="#">
          see details
          <FontAwesomeIcon
            className="icon"
            icon={faEye}
            size="xs"
          ></FontAwesomeIcon>
        </a>
      </div>
    </React.Fragment>
  );
}

export default Activities;

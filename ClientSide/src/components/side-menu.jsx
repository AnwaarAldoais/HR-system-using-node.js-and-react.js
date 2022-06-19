import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCheck } from "@fortawesome/free-solid-svg-icons";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { faChartBar } from "@fortawesome/free-solid-svg-icons";
import { faFingerprint } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";
import moment from "moment";

function SideMenu() {
  const [auth, setAuth] = useState(true);
  const [roles, setRoles] = useState([]);
  const [userRoles, setUsertRoles] = useState([]);
  const [attendData, setAttendData] = useState([]);
  const [disables, setDisables] = useState("");
  const [time, setTime] = useState("");

  const userId = localStorage.getItem("user");
  const user = localStorage.getItem("user");
  const attend = () => {
    var today = new Date(),
      curTime =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    Axios.post("http://localhost:3001/attend/" + user, {
      ctime: curTime,
    }).then((response) => {
      setAttendData(response.data);
      setDisables(!false);
    });
    setTime(curTime);
  };
  var tDay = moment().format("MMMM D, YYYY");

  const isAttend = () => {
    Axios.get("http://localhost:3001/isAttend/" + userId, {
      curdate: moment().format("MMMM D, YYYY"),
    }).then((response) => {
      if (response.length > 0) {
        console.log(response.data);
      }
    });
  };

  return (
    auth && (
      <React.Fragment>
        <div className="side-menu-top">
          <a href="/home" className="side-menu-item">
            <FontAwesomeIcon
              className=""
              icon={faHome}
              size="xs"
            ></FontAwesomeIcon>
            <p className="side-menu-txt">Home</p>
          </a>
          {/* <a className="side-menu-item">
            <FontAwesomeIcon
              className=""
              icon={faUser}
              size="xs"
            ></FontAwesomeIcon>
            <p className="side-menu-txt">My profile</p>
          </a> */}
          <a href="/MyReport" className="side-menu-item">
            <FontAwesomeIcon
              className=""
              icon={faChartBar}
              size="xs"
            ></FontAwesomeIcon>
            <p className="side-menu-txt">My Report</p>
          </a>
        </div>
        <button
          disabled={disables}
          value={disables}
          className="attend-btn"
          onClick={attend}
        >
          <FontAwesomeIcon
            className="homeIcon"
            icon={faFingerprint}
            size="xs"
          ></FontAwesomeIcon>
          <p className="attend-txt">Sign</p>
        </button>

        <div className="side-menu-bottom">
          <a href="/HrDashboard" className="side-menu-item">
            <FontAwesomeIcon
              className=""
              icon={faUserCheck}
              size="xs"
            ></FontAwesomeIcon>
            <p className="side-menu-txt">HR Page</p>
          </a>

          <a className="side-menu-item" href="/Initialization">
            <FontAwesomeIcon
              className=""
              icon={faCog}
              size="xs"
            ></FontAwesomeIcon>
            <p className="side-menu-txt">Data Initialization</p>
          </a>
        </div>
      </React.Fragment>
    )
  );
}

export default SideMenu;

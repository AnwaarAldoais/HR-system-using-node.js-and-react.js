import React from "react";
import WideLayout from "./Layouts/wideLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faCertificate } from "@fortawesome/free-solid-svg-icons";
import { faSuitcase } from "@fortawesome/free-solid-svg-icons";
import { faBusinessTime } from "@fortawesome/free-solid-svg-icons";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import { faCodeBranch } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { faChartPie } from "@fortawesome/free-solid-svg-icons";
import { faShieldAlt } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
function Initialization() {
  return (
    <React.Fragment>
      <WideLayout title="Initialzation Dashboard">
        <div className="collections">
          <h1 className="collection-title">Organizational structure</h1>
          <div className="collection-box">
            <a href="http://" className="collection-link">
              <FontAwesomeIcon
                className="collection-icon"
                icon={faBuilding}
                size="xs"
              ></FontAwesomeIcon>
              <p className="icon-box-txt">Company info.</p>
            </a>
            <a href="http://" className="collection-link">
              <FontAwesomeIcon
                className="collection-icon"
                icon={faCodeBranch}
                size="xs"
              ></FontAwesomeIcon>
              <p className="icon-box-txt">Branches</p>
            </a>
            <a href="/Initialization/departements" className="collection-link">
              <FontAwesomeIcon
                className="collection-icon"
                icon={faCircle}
                size="xs"
              ></FontAwesomeIcon>
              <p className="icon-box-txt">Departements</p>
            </a>
            <a href="/Initialization/Sections" className="collection-link">
              <FontAwesomeIcon
                className="collection-icon"
                icon={faChartPie}
                size="xs"
              ></FontAwesomeIcon>
              <p className="icon-box-txt">Sections</p>
            </a>
          </div>
        </div>
        <div className="collections">
          <h1 className="collection-title">Users and Roles Section</h1>
          <div className="collection-box">
            <a href="/Initialization/Users" className="collection-link">
              <FontAwesomeIcon
                className="collection-icon"
                icon={faUsers}
                size="xs"
              ></FontAwesomeIcon>
              <p className="icon-box-txt">Users</p>
            </a>
            <a href="http://" className="collection-link">
              <FontAwesomeIcon
                className="collection-icon"
                icon={faShieldAlt}
                size="xs"
              ></FontAwesomeIcon>
              <p className="icon-box-txt">Roles</p>
            </a>
          </div>
        </div>
        <div className="collections">
          <h1 className="collection-title">Attendance Section</h1>
          <div className="collection-box">
            <a href="/Initialization/Shifts" className="collection-link">
              <FontAwesomeIcon
                className="collection-icon"
                icon={faBusinessTime}
                size="xs"
              ></FontAwesomeIcon>
              <p className="icon-box-txt">Shifts</p>
            </a>
            {/* <a href="http://" className="collection-link">
              <FontAwesomeIcon
                className="collection-icon"
                icon={faClock}
                size="xs"
              ></FontAwesomeIcon>
              <p className="icon-box-txt">Time</p>
            </a> */}
            <a
              href="/Initialization/officialHolidays"
              className="collection-link"
            >
              <FontAwesomeIcon
                className="collection-icon"
                icon={faSuitcase}
                size="xs"
              ></FontAwesomeIcon>
              <p className="icon-box-txt">Official Holidays</p>
            </a>
            <a
              href="/Initialization/generalHolidays"
              className="collection-link"
            >
              <FontAwesomeIcon
                className="collection-icon"
                icon={faSuitcase}
                size="xs"
              ></FontAwesomeIcon>
              <p className="icon-box-txt">Holidays</p>
            </a>
            <a href="/Initialization/holidayRequest" className="collection-link">
              <FontAwesomeIcon
                className="collection-icon"
                icon={faSuitcase}
                size="xs"
              ></FontAwesomeIcon>
              <p className="icon-box-txt">Holiday Request</p>
            </a>
            <a href="/Initialization/holidaysStocks" className="collection-link">
              <FontAwesomeIcon
                className="collection-icon"
                icon={faBoxOpen}
                size="xs"
              ></FontAwesomeIcon>
              <p className="icon-box-txt">Stocks</p>
            </a>
          </div>
        </div>
        <div className="collections">
          <h1 className="collection-title">Employees Section</h1>
          <div className="collection-box">
            <a href="/Initialization/Groups" className="collection-link">
              <FontAwesomeIcon
                className="collection-icon"
                icon={faUsers}
                size="xs"
              ></FontAwesomeIcon>
              <p className="icon-box-txt">Groups</p>
            </a>
            <a href="/Initialization/Jobs" className="collection-link">
              <FontAwesomeIcon
                className="collection-icon"
                icon={faCertificate}
                size="xs"
              ></FontAwesomeIcon>
              <p className="icon-box-txt">Jobs</p>
            </a>

            {/* <a href="/Initialization/Employees" className="collection-link">
              <FontAwesomeIcon
                className="collection-icon"
                icon={faUser}
                size="xs"
              ></FontAwesomeIcon>
              <p className="icon-box-txt">Employee State</p>
            </a> */}
            <a href="/Initialization/Employees" className="collection-link">
              <FontAwesomeIcon
                className="collection-icon"
                icon={faUserPlus}
                size="xs"
              ></FontAwesomeIcon>
              <p className="icon-box-txt">Employee</p>
            </a>
            <a href="http://" className="collection-link">
              <FontAwesomeIcon
                className="collection-icon"
                icon={faBoxOpen}
                size="xs"
              ></FontAwesomeIcon>
              <p className="icon-box-txt">Stocks</p>
            </a>
          </div>
        </div>
      </WideLayout>
    </React.Fragment>
  );
}

export default Initialization;

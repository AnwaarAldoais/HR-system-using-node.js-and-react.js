import React from "react";
import WideLayout from "./Layouts/wideLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardCheck } from "@fortawesome/free-solid-svg-icons";
import { faUserCheck } from "@fortawesome/free-solid-svg-icons";

function HR() {
  return (
    <React.Fragment>
      <WideLayout title={"HR Dashboard"}>
        <a href="/employeesAttendance" className="box">
          <div className="icon-box">
            <FontAwesomeIcon
              className="box-icon"
              icon={faUserCheck}
              size="xs"
            ></FontAwesomeIcon>
            <p className="icon-box-txt">Attendance</p>
          </div>
        </a>
        <a href="/HrWeeklyReports" className="box">
          <div className="icon-box">
            <FontAwesomeIcon
              className="box-icon"
              icon={faClipboardCheck}
              size="xs"
            ></FontAwesomeIcon>
            <p className="icon-box-txt">Weekly Report</p>
          </div>
        </a>
        <a href="/HrMonthlyReports" className="box">
          <div className="icon-box">
            <FontAwesomeIcon
              className="box-icon"
              icon={faClipboardCheck}
              size="xs"
            ></FontAwesomeIcon>
            <p className="icon-box-txt">Monthly Report</p>
          </div>
        </a>
      </WideLayout>
    </React.Fragment>
  );
}

export default HR;

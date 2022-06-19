
import React, { useState, useEffect } from "react";
import WideLayout from "./Layouts/wideLayout";
import { Table } from "react-bootstrap";
import { Form } from "react-bootstrap";
import TotlaStocks from "./totalStocks";
import moment from "moment";
import Forms from "./Form";
import Axios from "axios";
import { Scrollbar } from "react-scrollbars-custom";

function HrWeeklyReports() {
  const userId = localStorage.getItem("user");
  const year = new Date().getFullYear();
  const [monthNum, setMonthNum] = useState("");
  const [allemps, setAllEmps] = useState([]);
  const [empNum, setEmpNum] = useState("");
  const [attend, setAttend] = useState("");
  const [filterdArray, setFilterdArray] = useState([]);
  const [takenHol, setTakenHol] = useState([]);
  const [delay, setTakenDelay] = useState([]);
  const [monthArray, setMonthArray] = useState([]);
  const [attendDays, setAttendDays] = useState([]);
  const [takenExcuses, setTakenExcuses] = useState([]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const listItems = months.map((month, key) => (
    <option value={key + 1}>{month}</option>
  ));

  const getAttenedRport = () => {
    Axios.post("http://localhost:3001/attendanceReport", {
      emp: empNum,
      month: monthNum,
      year: year,
    }).then((response) => {
      if (response) {
        setMonthArray(response.data.monthArray);
        setAttendDays(response.data.result);
      }
    });
  };

  var curAttend = [];
  for (let i = 0; i < attendDays.length; i++) {
    curAttend.push({
      date: attendDays[i].created_at.substr(0, 10),
      attend_time: attendDays[i].attend_time,
      attend: true,
    });
  }

  var arr = [];

  for (let i = 0; i < monthArray.length; i++) {
    curAttend.forEach((element) => {
      if (element.date == monthArray[i]) monthArray.splice(i--, 1);
    });
  }
  var result = [];
  for (let i = 0; i < monthArray.length; i++) {
    result.push({ date: monthArray[i], attend_time: "00:00", attend: false });
  }

  let filtered = result.concat(curAttend);
  let sortedAttend = filtered.sort(
    (a, b) =>
      new Date(...a.date.split("/").reverse()) -
      new Date(...b.date.split("/").reverse())
  );
  useEffect(() => {
    Axios.get("http://localhost:3001/getEmps").then((response) => {
      setAllEmps(response.data);
    });
  }, []);

  const EmpItems =allemps && !!allemps && allemps.map((emp, key) => (
    <option value={emp.id}>{emp.ename}</option>
  ));

  const totalDelay = [
    {
      id: 1,
      workHour: 15,
      attendTime: 20
    },
    // {
    //   id: 1,
    //   workHour: 15,
    //   attendTime: 45
    // },
    // {
    //   id: 1,
    //   workHour: 15,
    //   attendTime: 15
    // },
    {
      id: 3,
      workHour: 15,
      attendTime: 45
    },
    {
      id: 4,
      workHour: 15,
      attendTime: 15
    },
  ];
  
  const totalTakenStocks = [
    {
      id: 1,
      Holidays: 5,
      Excuses: 2,
    },
    {
      id: 2,
      Holidays: 5,
      Excuses: 0,
    },
    {
      id: 3,
      Holidays: 5,
      Excuses: 1,
    },
  ];
  let empDelay = 0;
  const delays = totalDelay.filter((data) => {
    return (
      data.id === 1
    );
  }).map((d, key) => {
    return (
      empDelay += d.attendTime - d.workHour
    );
  });
  const absent = totalTakenStocks.filter((data) => {
    return (
      data.id === 1
    );
  }).map((d, key) => {
    return (
      d.Holidays
    );
  });
  const excuses = totalTakenStocks.filter((data) => {
    return (
      data.id === 1
    );
  }).map((d, key) => {
    return (
      d.Excuses
    );
  });
  return (
    <React.Fragment>
      <WideLayout title={`Report of attendance in ${months[monthNum - 1]}`}>
        <Forms>
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => {
              setMonthNum(e.currentTarget.value);
            }}
            onClick={getAttenedRport}
          >
            <option value="-1">Choose Month</option>
            {listItems}
          </Form.Select>
          <Form.Select
            style={{ width: "10vw", marginRight: "17px" }}
            aria-label="Default select example"
            onChange={event => setEmpNum(event.target.value)}
            name="emp"
          >
            <option value="-1">Choose Employee</option>
            {EmpItems}
          </Form.Select>
        </Forms>

        <div className="report-main-container">
          <Scrollbar style={{ width: 1550, height: 600 }}>
            <div className="report-container">
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Hours & Minutes of Delay</th>
                    <th>Absence</th>
                    <th>Excuses</th>
                  </tr>
                </thead>
                <tbody>
                  <td>No</td>
                  <td>Emp</td>
                  <td>{delays}</td>
                  <td>{absent}</td>
                  <td>{excuses}</td>
                </tbody>
              </Table>
            </div>
          </Scrollbar>
        </div>
      </WideLayout>
    </React.Fragment>
  );
}

export default HrWeeklyReports;

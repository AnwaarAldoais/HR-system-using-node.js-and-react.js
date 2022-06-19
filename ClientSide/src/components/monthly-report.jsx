import React, { useState, useEffect } from "react";
import WideLayout from "./Layouts/wideLayout";
import { Table } from "react-bootstrap";
import { Form } from "react-bootstrap";
import TotlaStocks from "./totalStocks";
import moment from "moment";
import Forms from "./Form";
import Axios from "axios";
import { Scrollbar } from "react-scrollbars-custom";

function MyReport() {
  const userId = localStorage.getItem("user");
  const year = new Date().getFullYear();
  const [monthNum, setMonthNum] = useState("");
  const [attend, setAttend] = useState("");
  const [filterdArray, setFilterdArray] = useState([]);
  const [takenHol, setTakenHol] = useState([]);
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
      emp: userId,
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

  const totalStocks = [
    {
      Holidays: 30,
      Excuses: 6,
    },
  ];
  const totalTakenStocks = [
    {
      Holidays: 5,
      Excuses: 0,
    },
  ];

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
        </Forms>

        <div className="report-main-container">
          <Scrollbar style={{ width: 1550, height: 600 }}>
            <div className="report-container">
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>State</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedAttend.map((m, key) => {
                    return (
                      <tr>
                        <td>{key + 1}</td>
                        <td>{m.date}</td>
                        <td>{m.attend_time}</td>
                        <td>{m.attend ? "attend" : "absent"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </Scrollbar>
          <div className="totals">
            <h1 className="totals-title">Total in {months[monthNum - 1]}</h1>
            <TotlaStocks
              totalStocks={totalStocks}
              totalTakenStocks={totalTakenStocks}
              takenHol={takenHol}
              takenExcuses={takenExcuses}
              totlaAttendance={attendDays.length}
              totalAbsencs={result.length}
            />
          </div>
        </div>
      </WideLayout>
    </React.Fragment>
  );
}

export default MyReport;

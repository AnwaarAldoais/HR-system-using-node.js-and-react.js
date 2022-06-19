
import React, { useState } from "react";
import WideLayout from "./Layouts/wideLayout";
import { Table } from "react-bootstrap";
import { Form } from "react-bootstrap";
import TotlaStocks from "./totalStocks";
import moment from "moment";

function MyReport() {
  const d = new Date();
  const states = ["Absent", "Attende", "Attend-online", "Holiday", "Excuse"];
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

  let [monthNum, setMonthNum] = useState("");
  const [filterdArray, setFilterdArray] = useState([]);
  const [takenHol, setTakenHol] = useState([]);
  const [takenExcuses, setTakenExcuses] = useState([]);
  const addtendanceData = [
    { id: 1, date: "12-01-2021", time: "08:30", states: 0 },
    { id: 2, date: "12-02-2021", time: "08:30", states: 0 },
    { id: 3, date: "12-03-2021", time: "08:30", states: 1 },
    { id: 4, date: "12-04-2021", time: "08:30", states: 1 },
    { id: 5, date: "12-05-2021", time: "08:30", states: 1 },
    { id: 6, date: "12-06-2021", time: "08:30", states: 2 },
    { id: 1, date: "11-01-2021", time: "08:30", states: 3 },
    { id: 2, date: "11-02-2021", time: "08:30", states: 1 },
    { id: 3, date: "11-03-2021", time: "08:30", states: 0 },
    { id: 4, date: "11-04-2021", time: "08:30", states: 2 },
    { id: 5, date: "11-05-2021", time: "08:30", states: 1 },
    { id: 6, date: "11-06-2021", time: "08:30", states: 0 },
    { id: 7, date: "12-06-2021", time: "08:30", states: 1 },
    { id: 1, date: "10-06-2021", time: "08:30", states: 1 },
    { id: 2, date: "10-01-2021", time: "08:30", states: 1 },
    { id: 2, date: "10-01-2021", time: "08:30", states: 1 },
    { id: 2, date: "05-01-2021", time: "08:30", states: 1 },
    { id: 2, date: "05-10-2021", time: "08:30", states: 3 },
    { id: 2, date: "05-12-2021", time: "08:30", states: 4 },
  ];

  const handelChange = (e) => {
    e.preventDefault();
    setMonthNum(e.currentTarget.value);
    let filtered = addtendanceData
      .filter((data) => {
        return (
          e.currentTarget.value == moment(data.date, "M/DD/YYYY").format("M")
        );
      })
      .map((filterdData) => {
        return (
          <tr>
            <td>{filterdData.id}</td>
            <td>{filterdData.date}</td>
            <td>{filterdData.time}</td>
            <td>{states[filterdData.states]}</td>
          </tr>
        );
      });
    setTakenHol(
      addtendanceData.filter(
        (obj) =>
          obj.states == 3 &&
          e.currentTarget.value == moment(obj.date, "M/DD/YYYY").format("M")
      ).length
    );

    setFilterdArray(filtered);
  };

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
      <WideLayout>
        <h1 className="attendance-title">
          Report of attendance in <span>{months[monthNum - 1]}</span>
        </h1>
        <div className="report-form">
          <Form className="d-flex" inline>
            <Form.Select
              aria-label="Default select example"
              onChange={handelChange}
            >
              <option value="-1">Choose Month</option>
              {listItems}
            </Form.Select>
          </Form>
        </div>
        <div className="outer-container">
          <div className="report-container">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>State</th>
                </tr>
              </thead>
              <tbody>{filterdArray}</tbody>
            </Table>
          </div>
          <div className="totals">
            <h1 className="totals-title">Total in {months[monthNum - 1]}</h1>
            <TotlaStocks
              totalStocks={totalStocks}
              totalTakenStocks={totalTakenStocks}
              takenHol={takenHol}
              takenExcuses={takenExcuses}
            />
          </div>
        </div>
      </WideLayout>
    </React.Fragment>
  );
}

export default MyReport;

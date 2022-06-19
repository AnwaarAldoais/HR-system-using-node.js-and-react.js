import React, { useState, useEffect } from "react";
import WideLayout from "./Layouts/wideLayout";
import { Table } from "react-bootstrap";
import { Form } from "react-bootstrap";
import TotlaStocks from "./totalStocks";
import moment from "moment";
import Forms from "./Form";
import Axios from "axios";
import { Scrollbar } from "react-scrollbars-custom";

function HrMonthlyReport() {
  const userId = localStorage.getItem("user");
  const year = new Date().getFullYear();
  const [allemps,setAllEmps]=useState([]);
  const [monthNum, setMonthNum] = useState("");
  const [empNum, setEmpNum] = useState("");
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

  useEffect(()=>{
    Axios.get("http://localhost:3001/getEmpsList").then((response)=>{
      setAllEmps(response.data);
    });
  },[]);
  
  const EmpItems = allemps && !!allemps && allemps.map((emp, key) => (
    <option value={emp.id}>{emp.ename}</option>
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
    //  var hours = Math.abs('10:55' - '09:1') / 36e5;
    //   console.log(hours);
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
          <Form.Select
              style={{ width: "10vw", marginRight: "17px" }}
              aria-label="Default select example"
              onChange={event=>setEmpNum(event.target.value)}
              name="emp"
            >
              <option value="-1">Choose Employee</option>
              {EmpItems}
            </Form.Select>
        </Forms>

        <div className="report-main-container">
          <Scrollbar style={{ width: 1550, height: 600 }}>
            <div className="report-container">
              <Table striped bordered hover responsive
              >
                <thead>
                <th>Employee Name</th>
                  {monthArray.map((m, key) => {
                    return (
                      // <tr>
                       
                      // <th>Time</th>
                      // <th>State</th>
                  
                      <th>{m}</th>
                      // </tr>
                    );
                  })}
                </thead>
                <tbody>
                  {sortedAttend.map((m, key) => {
                    return (
                      //  <tr>
                   
                      /* <td>{m.date}</td> 
                         <td>{m.attend_time}</td>
                         <td>{key + 1}</td>  */
                        //  <td>{m.name}</td>
                        <td>{m.name} {m.attend ? "attend" : "absent"}</td>
                    //  </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </Scrollbar>
        </div>
      </WideLayout>
    </React.Fragment>
  );
}

export default HrMonthlyReport;

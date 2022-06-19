import WideLayout from "./Layouts/wideLayout";
import React, { useState, useEffect, useRef } from "react";
import { Form, FormSelect } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import { FormGroup } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import Axios from "axios";

function Hr() {
  //Get date of today
  var curr = new Date();
  curr.setDate(curr.getDate());
  var date = curr.toISOString().substr(0, 10);

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [msg, setMsg] = useState("");
  const [userid, setUserId] = useState(0);
  const [usertime, setUserTime] = useState("");
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    Axios.get("http://localhost:3001/getAttendance").then((response) => {
      setUsers(response.data);
    });
  }, [status]);

  const markAttendance = (e) => {
    e.preventDefault();
    console.log(selectedUser)
    Axios.post("http://localhost:3001/addAttend", {
      _users: selectedUser,
    }).then((response) => {
      if (response.data.msg) {
        setMsg(response.data.msg);
        setStatus(!status);
      } else {
      }
    });
    setSelectedUser([]);
  };

  const EmpItems = users && !!users.length && users.map((emp) => (
    <option
      value={emp.id}
      name={emp.name}>{emp.name}

    </option>
  ));

  // useEffect(() => {
  //   setOptions(employees);
  // }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleTimeChange = (i, e) => {
    let Newuser = [...users];
    Newuser[i][e.target.name] = e.target.value;
    setUsers(Newuser);
  }
  const handleCheckChange = (e, data) => {
    const { name, checked } = e.target;
    if (checked) {
      if (name === "allSelect") {
        setSelectedUser(users);
      }
      else {
        setSelectedUser([...selectedUser, data]);
      }
    } else {
      if (name === "allSelect") {
        setSelectedUser([]);
      } else {
        let tempuser = selectedUser.filter((item) => item.id !== data.id);
        setSelectedUser(tempuser);
      }
    }
  };
  const handleClickOutside = event => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false);
    }
  }
  // const setInput = emp => {
  //   setSearch(emp);
  //   setDisplay(false);
  // }
  const attendEmp = (e) => {
    e.preventDefault();

    if (e.target.name == "userinput") {

      // setSelectedUser([]);
      let NewselectedUser = [...selectedUser];
      NewselectedUser['id'] = userid;
      NewselectedUser['attend_time'] = usertime;

      console.log(NewselectedUser)
      Axios.post("http://localhost:3001/addAttend", {
        _users: NewselectedUser,
      }).then((response) => {
        if (response.data.msg) {
          setMsg(response.data.msg);
          setStatus(!status);

        } else {
        }
      });
    }
    setSelectedUser([]);
  }
  return (
    <React.Fragment>
      <WideLayout title={`Employee Attendance ${date}`}>
        <div className="hr-container">
          <div className="attendance-container">
            <Form className="d-flex" inline
            >
              <InputGroup size="lg" >
                <Form.Select
                  style={{ width: "8vw", marginRight: "17px" }}
                  aria-label="Default select example"
                  onChange={event => setUserId(event.target.value)}
                  name="empId"
                >
                  <option >Choose Employee</option>
                  {EmpItems}
                </Form.Select>
              </InputGroup>
              <FormGroup
                controlId="formInlineName"
                style={{ marginRight: "15px" }}
              >
                <FormControl
                  type="time"
                  name="time"
                  onChange={event => setUserTime(event.target.value.toString())}
                />
              </FormGroup>
              <button className="mark-present"
                name="userinput"
                onClick={(e) => { attendEmp(e) }}
              >Attend
              </button>
            </Form>
          </div>
          <div className="marked-attendance-container">
            <label className="attendance-label">Mark Attendance</label>
            <span>
              <button className="y-btn">Check all</button>
              <button className="mark-present" onClick={markAttendance}>Mark Present</button>
            </span>
            <span>
              <Form >
                <table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="allSelect"
                          checked={selectedUser?.length === users?.length}
                          onChange={(e) => handleCheckChange(e, users)}
                        />
                      </th>
                      <th>Dept</th>
                      <th>Employee_Name</th>
                      <th>Attendance Time</th>
                      <th>Leave Time</th>
                      <th>Attend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users && !!users.length && users.map((data, index) => (
                      <tr id={index} key={index}>
                        <td>{data.id}</td>
                        <td>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            name={data.id}
                            // checked when selectedUser contains checked object/filed/row
                            checked={selectedUser.some((item) => item?.id === data.id)}
                            onChange={(e) => handleCheckChange(e, data)}
                          />
                        </td>
                        <td>{data.dname}</td>
                        <td>{data.name}</td>
                        <td>
                          <FormGroup style={{ width: "9vw" }}>
                            <FormControl
                              type="time"
                              name="attend_time"
                              Value={data.attend_time || ""}
                              onChange={e => handleTimeChange(index, e)}
                            />
                          </FormGroup>
                        </td>
                        <td>{data.leave_time}</td>
                        <td>
                          <button className="mark-present"
                            onClick={markAttendance}
                          >Attend</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Form >
            </span>
          </div>
        </div>
      </WideLayout>
    </React.Fragment>
  );
}
export default Hr;

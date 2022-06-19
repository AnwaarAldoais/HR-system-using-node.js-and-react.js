import React, { useState, useEffect } from "react";
import { InputGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Forms from "./Form";
import { FormGroup } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Table } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import WideLayout from "./Layouts/wideLayout";
import Axios from "axios";
function Employees() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [Cshow, setCShow] = useState(false);
  const ContacthandleClose = () => setShow(false);
  const ContacthandleShow = () => setShow(true);
  const [allemps, setAllEmps] = useState([]);
  const [alldepts, setAllDepts] = useState([]);
  const [alljobs, setAllJobs] = useState([]);
  const [allgroups, setAllGroups] = useState([]);
  const [alltypes, setAllTypes] = useState([]);
  const [msg, setMsg] = useState("");
  const [status, setStatus] = useState(0);
  const [eid, setEID] = useState(0);
  const [ename, setEname] = useState("");
  const [deptid, setDeptID] = useState(0);
  const [jobid, setjobID] = useState(0);
  const [groupid, setGroupID] = useState(0);
  const [emptypeid, setEmpTypeID] = useState(0);
  const [hiredate, setHireDate] = useState("");
  const [activateModal,setActiveModal]=useState("");
  
  const deptItems =alldepts && !!alldepts && alldepts.map((dept, key) => (
    <option
      value={dept.id}
      name={dept.name}>{dept.name}

    </option>
  ));
  const jobItems = alljobs && !!alljobs && alljobs.map((job, key) => (
    <option
      value={job.Id}
      name={job.name}>{job.name}

    </option>
  ));
  const groupItems =allgroups && !!allgroups && allgroups.map((grp, key) => (
    <option
      value={grp.id}
      name={grp.name}>{grp.name}

    </option>
  ));
  const TypeItems =alltypes && !!alltypes && alltypes.map((typ, key) => (
    <option
      value={typ.id}
      name={typ.name}>{typ.name}
    </option>
  ));
  useEffect(() => {
    Axios.get("http://localhost:3001/getEmps").then((response) => {
      setAllEmps(response.data);
    });
  }, [status])
  const addEmp = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/addEmp", {
      name: ename,
      dept: deptid,
      job: jobid,
      grp: groupid,
      typ: emptypeid,
      hdate: hiredate
    }).then((response) => {
      if (response.data.msg) {
        setMsg(response.data.msg);
        setStatus(!status);
      } else {
      }
    });
    setEname("");
    setDeptID(0);
    setjobID(0);
    setGroupID(0);
    setEmpTypeID(0);
    setHireDate("");
  }
  useEffect(() => {
    Axios.get("http://localhost:3001/getdepts").then((response) => {
      setAllDepts(response.data);
    });
    Axios.get("http://localhost:3001/getJobs").then((response) => {
      setAllJobs(response.data);
    });
    Axios.get("http://localhost:3001/getGroups").then((response) => {
      setAllGroups(response.data);
    });
    Axios.get("http://localhost:3001/getEmpTypes").then((response) => {
      setAllTypes(response.data);
    });
  }, [])
  return (
    <React.Fragment>
      <WideLayout title="Employees Management">
        <Forms>
         
          <a className="add-btn" onClick={handleShow} style={{textDecoration:'none',padding:'4px'}}>
            <FontAwesomeIcon
              className="collection-icon"
              icon={faPlus}
              size="xs"
            ></FontAwesomeIcon>
            Add New Employee
          </a>
        </Forms>
        <div className="report-main-container">
          <div className="report-container">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Employee Name</th>
                  <th>Depertement Name</th>
                  <th>section Name</th>
                  <th>Job Name</th>
                  <th>Employment Type</th>
                  <th> From Time</th>
                  <th> To Time</th>
                  <th>Contact Info</th>
                  <th>Financial Info</th>
                  <th>Experiance Work</th>
                </tr>
              </thead>
              <tbody>
                {allemps && !!allemps.length && allemps.map((emp) => {
                  return (
                    <tr>
                      <td>{emp.id}</td>
                      <td>{emp.ename}</td>
                      <td>{emp.dname}</td>
                      <td>{emp.gname}</td>
                      <td>{emp.jname}</td>
                      <td>{emp.tname}</td>
                      <td>{emp.fWH}</td>
                      <td>{emp.tWH}</td>
                      <td className="table-icon">
                        <a onClick={ContacthandleShow} className="modalBtn">
                          <FontAwesomeIcon
                            className="table-icon blue"
                            icon={faPlus}
                            size="xs"
                          ></FontAwesomeIcon>
                        </a>
                      </td>
                      <td className="table-icon">
                        <a onClick={ContacthandleShow} className="modalBtn">
                          <FontAwesomeIcon
                            className="table-icon blue"
                            icon={faPlus}
                            size="xs"
                          ></FontAwesomeIcon>
                        </a>
                      </td>
                      <td className="table-icon">
                        <a onkClic={ContacthandleShow} className="modalBtn">
                          <FontAwesomeIcon
                            className="table-icon blue"
                            icon={faPlus}
                            size="xs"
                          ></FontAwesomeIcon>
                        </a>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
        <Modal
         isOpen={activateModal==='addEmp'}
          show={show}
          onHide={handleClose}
          animation={true}
          aria-labelledby="contained-modal-title-vcenter"
        >
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <InputGroup size="lg">
                  <InputGroup.Text id="inputGroup-sizing-lg" className="forminput">
                    Name
                  </InputGroup.Text>
                  <FormControl
                    value={ename}
                    aria-label="Large"
                    aria-describedby="inputGroup-sizing-sm"
                    onChange={(e) => {
                      setEname(e.currentTarget.value);
                    }}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Select
                  value={deptid}
                  aria-label="Default select example"
                  onChange={event => setDeptID(event.target.value)}
                  name="month"
                >
                  <option >Choose Department</option>
                  {deptItems}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Select
                  value={jobid}
                  aria-label="Default select example"
                  onChange={event => setjobID(event.target.value)}
                  name="month"
                >
                  <option >Choose Job</option>
                  {jobItems}
                </Form.Select>

              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Select
                  value={groupid}
                  aria-label="Default select example"
                  onChange={event => setGroupID(event.target.value)}
                  name="month"
                >
                  <option >Choose Group</option>
                  {groupItems}
                </Form.Select>

              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Select
                  value={emptypeid}
                  aria-label="Default select example"
                  onChange={event => setEmpTypeID(event.target.value)}
                  name="month"
                >
                  <option >Choose Employment Type</option>
                  {TypeItems}
                </Form.Select>

              </Form.Group>
              <Form.Group className="mb-3">
                <InputGroup size="lg">
                  <InputGroup.Text id="inputGroup-sizing-lg" className="forminput">
                    Hire Date
                  </InputGroup.Text>
                  <FormControl type="date"
                    name="date"
                    value={hiredate}
                    aria-label="Large"
                    aria-describedby="inputGroup-sizing-sm"
                    onChange={event => setHireDate(event.target.value.toString())}
                  />
                </InputGroup>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={addEmp}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
       
        {/* <Modal
         isOpen={activateModal==='addContact'}
          show={show}
          onHide={handleClose}
          animation={true}
          aria-labelledby="contained-modal-title-vcenter"
        >
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <InputGroup size="lg">
                  <InputGroup.Text id="inputGroup-sizing-lg" className="forminput">
                    Name
                  </InputGroup.Text>
                  <FormControl
                    value={ename}
                    aria-label="Large"
                    aria-describedby="inputGroup-sizing-sm"
                    onChange={(e) => {
                      setEname(e.currentTarget.value);
                    }}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Select
                  value={deptid}
                  aria-label="Default select example"
                  onChange={event => setDeptID(event.target.value)}
                  name="month"
                >
                  <option >Choose Department</option>
                  {deptItems}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Select
                  value={jobid}
                  aria-label="Default select example"
                  onChange={event => setjobID(event.target.value)}
                  name="month"
                >
                  <option >Choose Job</option>
                  {jobItems}
                </Form.Select>

              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Select
                  value={groupid}
                  aria-label="Default select example"
                  onChange={event => setGroupID(event.target.value)}
                  name="month"
                >
                  <option >Choose Group</option>
                  {groupItems}
                </Form.Select>

              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Select
                  value={emptypeid}
                  aria-label="Default select example"
                  onChange={event => setEmpTypeID(event.target.value)}
                  name="month"
                >
                  <option >Choose Employment Type</option>
                  {TypeItems}
                </Form.Select>

              </Form.Group>
              <Form.Group className="mb-3">
                <InputGroup size="lg">
                  <InputGroup.Text id="inputGroup-sizing-lg" className="forminput">
                    Hire Date
                  </InputGroup.Text>
                  <FormControl type="date"
                    name="date"
                    value={hiredate}
                    aria-label="Large"
                    aria-describedby="inputGroup-sizing-sm"
                    onChange={event => setHireDate(event.target.value.toString())}
                  />
                </InputGroup>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={addEmp}>
              Save
            </Button>
          </Modal.Footer>
        </Modal> */}
       
    
      </WideLayout>
    </React.Fragment>
  );
}

export default Employees;

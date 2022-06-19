import React, { useState, useEffect } from "react";
import WideLayout from "./Layouts/wideLayout";
import Forms from "./Form";
import { InputGroup } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Table } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import Axios from "axios";

function Sections() {

  const [alldepts, setAllDepts] = useState([]);
  const [allsections, setAllSections] = useState([]);
  const [deptid, setDeptId] = useState(0);
  const [dname, setDname] = useState("");
  const [sectionid, setSectionId] = useState(0);
  const [sname, setSname] = useState("");
  const [msg, setMsg] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {
    Axios.get("http://localhost:3001/getdepts").then((response) => {
      setAllDepts(response.data);
    });
  }, []);

  const ListDepts = alldepts && !!alldepts.length && alldepts.map((dept, key) => (
    <option
      value={dept.id}
    >{dept.name}

    </option>
  ));
  useEffect(() => {
    Axios.get("http://localhost:3001/getSections").then((response) => {
      setAllSections(response.data);
    });
  }, []);

  const addNewSection = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/addSection", {
      department: deptid,
      section: sname,
    }).then((response) => {
      if (response.data.msg) {
        setMsg(response.data.msg);
      } else {
      }
    });
    setDeptId(0);
    setSname("");
    console.log(deptid,dname,sectionid,sname);
  };
  const updateSection = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/updateSection", {
      id:sectionid,
      department: deptid,
      section: sname,
    }).then((response) => {
      if (response.data.msg) {
        setMsg(response.data.msg);
      } else {
      }
    });
    // setDeptId(0);
    // setSname("");
    // setDname("");
  }
  const deleteSection = (e, id) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/deleteSection", {
      sId: id,
    }).then((response) => {
      if (response.data.msg) {
        setMsg(response.data.msg);
      } else {
      }
    });

  };
  console.log(allsections);
  return (
    <React.Fragment>
      <WideLayout title="Sections">
        <Forms>
          <InputGroup size="lg">
            <Form.Select
              style={{ width: "8vw", marginRight: "17px" }}
              aria-label="Default select example"
              onChange={event => setDeptId(event.target.value)}
              name="month"
            >
              <option >Choose Depts</option>
              {ListDepts}
            </Form.Select>
          </InputGroup>
          <InputGroup size="lg">
            <InputGroup.Text id="inputGroup-sizing-lg" className="forminput">
              Section Name
            </InputGroup.Text>
            <FormControl
              aria-label="Large"
              aria-describedby="inputGroup-sizing-sm"
              onChange={(e) => {
                setSname(e.currentTarget.value);
              }}
              value={sname}
            />
          </InputGroup>
          <button className="add-btn" onClick={addNewSection}>
            <FontAwesomeIcon
              className="collection-icon"
              icon={faPlus}
              size="xs"
            ></FontAwesomeIcon>
          </button>
        </Forms>
        <div className="report-main-container">
          <div className="report-container">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Department Name</th>
                  <th>Section Name</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {allsections && !!allsections.length && allsections.map((section) => {
                  return (
                    <tr>
                      <td>{section.id}</td>
                      <td>{section.dname}</td>
                      <td>{section.sname}</td>
                      <td className="table-icon">
                        <a onClick={handleShow}>
                          <FontAwesomeIcon
                            className="table-icon red"
                            icon={faEdit}
                            size="xs"
                            onClick={(e) => {
                              setDname(section.dname);
                              setDeptId(section.d_id);
                              setSectionId(section.id);
                              setSname(section.sname);
                            }}
                          ></FontAwesomeIcon>
                        </a>
                      </td>
                      <td className="table-icon">
                        <a onClick={(e) => deleteSection(e, section.id)}>
                          <FontAwesomeIcon
                            className="table-icon red"
                            icon={faTrash}
                            size="xs"
                            onClick={event => setSectionId(section.id)}
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
          show={show}
          onHide={handleClose}
          animation={true}
          aria-labelledby="contained-modal-title-vcenter"
        >
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <InputGroup size="lg">
                <InputGroup.Text id="inputGroup-sizing-lg" className="forminput">
                  Department Name
                </InputGroup.Text>
                <Form.Select
                  aria-label="Default select example"
                  onChange={event => setDeptId(event.target.value)}
                  value={deptid}
                >
                  <option >{dname}</option>
                  {ListDepts}
                </Form.Select>
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3">
              <InputGroup size="lg">
                <InputGroup.Text id="inputGroup-sizing-lg" className="forminput">
                  Section Name
                </InputGroup.Text>
                <FormControl
                  aria-label="Large"
                  aria-describedby="inputGroup-sizing-sm"
                  onChange={(e) => {
                    setSname(e.currentTarget.value);
                  }}
                  value={sname}
                />
              </InputGroup>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={updateSection}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </WideLayout>
    </React.Fragment>
  );
}

export default Sections;

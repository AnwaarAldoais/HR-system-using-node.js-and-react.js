import React, { useState, useEffect } from "react";
import WideLayout from "./Layouts/wideLayout";
import Forms from "./Form";
import { Form, InputGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Table } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import Axios from "axios";

function Jobs() {
  const [job, setJob] = useState("");
  const [groupId, setGroupId] = useState("");
  const [jobs, setJobs] = useState([]);
  const [groups, setGroups] = useState([]);
  const [show, setShow] = useState("");
  const [msg, setMsg] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    e.preventDefault();
    setShow(true);
  };

  const addJob = () => {
    Axios.post("http://localhost:3001/addJob", {
      groupId: groupId,
      job: job,
    }).then((response) => {
      if (response.data.msg) {
        setMsg(response.data.msg);
      } else {
      }
    });
    setJob("");
    setShow(false);
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/getJobs").then((response) => {
      setJobs(response.data);
    });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:3001/getGroups").then((response) => {
      setGroups(response.data);
    });
  }, []);
  return (
    <React.Fragment>
      <WideLayout title="Jobs">
        <Forms>
          <button className="add-btn" onClick={handleShow}>
            Add Job
            <FontAwesomeIcon
              className="add-icon"
              icon={faPlus}
              size="xs"
            ></FontAwesomeIcon>
          </button>
        </Forms>
        <div className="report-main-container">
          <div className="msg">{msg != "" ? alert : ""}</div>
          <div className="report-container">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Job</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((j) => {
                  return (
                    <tr value={j.id}>
                      <td>{j.id}</td>
                      <td>{j.name}</td>

                      <td className="table-icon">
                        <button onClick={() => handleShow()}>
                          <FontAwesomeIcon
                            className="table-icon red"
                            icon={faEdit}
                            size="xs"
                          ></FontAwesomeIcon>
                        </button>
                      </td>
                      <td className="table-icon">
                        <a href="http://">
                          <FontAwesomeIcon
                            className="table-icon red"
                            icon={faTrash}
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
          show={show}
          onHide={handleClose}
          animation={true}
          aria-labelledby="contained-modal-title-vcenter"
        >
          <Modal.Header closeButton>
            <Modal.Title>Add New Job </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group
              className="mb-12 "
              style={{ paddingBottom: "30px" }}
              controlId="formBasicEmail"
            >
              <Form.Label>Job Name</Form.Label>
              <Form.Control
                value={job}
                type="text"
                placeholder="Enter Job Name"
                onChange={(e) => {
                  setJob(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group
              className="mb-12"
              style={{ paddingBottom: "30px" }}
              controlId=""
            >
              <Form.Label>Group</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => {
                  setGroupId(e.target.value);
                }}
              >
                <option>Select Group</option>
                {groups.map((g) => {
                  return <option value={g.id}>{g.name}</option>;
                })}
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={addJob}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </WideLayout>
    </React.Fragment>
  );
}

export default Jobs;

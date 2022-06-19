import React, { useState, useEffect, useRef } from "react";
import WideLayout from "./Layouts/wideLayout";
import { Form, InputGroup } from "react-bootstrap";
import Forms from "./Form";
import { Button } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Table } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import Axios from "axios";

function EmpGroups() {
  const [group, setGroup] = useState("");
  const [groupId, setGroupId] = useState("");
  const [eGroup, setEGroup] = useState("");
  const [allGroups, setAllGroups] = useState([]);
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState("");
  const user = localStorage.getItem("id");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addNewGroup = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/addGroup", {
      group: group,
      user: user,
    }).then((response) => {
      if (response.data.msg) {
        setMsg(response.data.msg);
      } else {
      }
    });
    setGroup("");
  };

  const getGroups = () => {
    Axios.get("http://localhost:3001/getGroups").then((response) => {
      setAllGroups(response.data);
    });
  };
  useEffect(() => {
    getGroups();
  });

  const getGroup = (id) => {
    setShow(true);
    console.log(id);
    Axios.get("http://localhost:3001/getGroup/" + id, {
      id: id,
    }).then((response) => {
      setEGroup(response.data[0].name);
      setGroupId(response.data[0].id);
    });
  };
  //Edit Group
  const EditGroupName = () => {
    Axios.post("http://localhost:3001/editGroup", {
      id: groupId,
      name: eGroup,
      user: user,
    }).then((response) => {});
    setShow(false);
  };

  // Delete Group
  const handelDelete = (id) => {
    deleteGroup(id);
    console.log("jkljkljl");
  };

  const deleteGroup = (id) => {
    Axios.get("http://localhost:3001/deleteGroup/" + id, {
      user: user,
    }).then((response) => {
      console.log(user);
    });
  };
  return (
    <React.Fragment>
      <WideLayout title="Groups">
        <Forms>
          <InputGroup size="lg">
            <InputGroup.Text id="inputGroup-sizing-lg" className="forminput">
              Group Name
            </InputGroup.Text>
            <FormControl
              value={group}
              aria-label="Large"
              aria-describedby="inputGroup-sizing-sm"
              onChange={(e) => {
                setGroup(e.currentTarget.value);
              }}
            />
          </InputGroup>
          <button className="add-btn" onClick={addNewGroup}>
            <FontAwesomeIcon
              className="collection-icon"
              icon={faPlus}
              size="xs"
            ></FontAwesomeIcon>
          </button>
        </Forms>
        <div className="report-main-container">
          <div className="msg">{msg ? alert : ""}</div>
          <div className="report-container">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Group Name</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {allGroups.map((g) => {
                  return (
                    <tr>
                      <td>{g.id}</td>
                      <td>{g.name}</td>
                      <td className="table-icon">
                        <button
                          onClick={() => {
                            getGroup(g.id);
                          }}
                        >
                          <FontAwesomeIcon
                            className="table-icon red"
                            icon={faEdit}
                            size="xs"
                          ></FontAwesomeIcon>
                        </button>
                      </td>
                      <td className="table-icon">
                        <button
                          onClick={() => {
                            handelDelete(g.id);
                          }}
                        >
                          <FontAwesomeIcon
                            className="table-icon red"
                            icon={faTrash}
                            size="xs"
                          ></FontAwesomeIcon>
                        </button>
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
            <Modal.Title>Edit Group Name</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {" "}
            <Form.Group
              className="mb-12 "
              style={{ paddingBottom: "30px" }}
              controlId="formBasicEmail"
            >
              <Form.Label>Group Name</Form.Label>
              <Form.Control
                value={eGroup}
                type="text"
                placeholder="insert Group Name"
                onChange={(e) => {
                  setEGroup(e.target.value);
                }}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={EditGroupName}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </WideLayout>
    </React.Fragment>
  );
}

export default EmpGroups;

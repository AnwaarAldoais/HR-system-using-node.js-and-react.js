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
import { Alert } from "react-bootstrap";
import Axios from "axios";

function Users() {
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const allUsers =users && !!users && users.map((user) => {
    return (
      <tr>
        <td>{user.id}</td>
        <td>{user.username}</td>

        <td className="table-icon">
          <a href="http://">
            <FontAwesomeIcon
              className="table-icon red"
              icon={faEdit}
              size="xs"
            ></FontAwesomeIcon>
          </a>
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
  });

  //add user function
  const addNewUser = () => {
    Axios.post("http://localhost:3001/createUser", {
      username: usernameReg,
      password: passwordReg,
      confirmPassword: confirmPassword,
    }).then((response) => {
      if (response.data.msg) {
        setMsg(response.data.msg);
      } else {
      }
    });
    setShow(false);
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/getusers").then((response) => {
      setUsers(response.data);
    });
  }, []);

  console.log(users);

  const alert = (
    <Alert className="msg" variant="danger">
      {msg}
    </Alert>
  );

  return (
    <React.Fragment>
      <WideLayout title={"Users"}>
        <button className="ModalBtn" onClick={handleShow}>
          <FontAwesomeIcon
            className="icon"
            icon={faPlus}
            size="xs"
          ></FontAwesomeIcon>
          Add New User
        </button>

        <div className="report-main-container">
          <div className="msg">{msg ? alert : ""}</div>
          <div className="report-container">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Username</th>
                  <th>edit Password</th>
                  <th>Activate</th>
                </tr>
              </thead>
              <tbody>{allUsers}</tbody>
            </Table>
          </div>
        </div>
      </WideLayout>
      <Modal
        show={show}
        onHide={handleClose}
        animation={true}
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                onChange={(e) => {
                  setUsernameReg(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setPasswordReg(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={addNewUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}

export default Users;

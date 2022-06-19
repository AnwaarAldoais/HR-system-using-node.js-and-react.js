import React, { useState, useEffect } from "react";
import WideLayout from "./Layouts/wideLayout";
import Forms from "./Form";
import { InputGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Table } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import Axios from "axios";

function Departments() {
  const [dname, setDname] = useState("");
  const [allDepts, setAllDepts] = useState([]);
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const user = localStorage.getItem("id");

  const addNewDepartement = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/addDepartement/" + user, {
      departement: dname,
    }).then((response) => {
      if (response.data.msg) {
        setMsg(response.data.msg);
      } else {
      }
    });
    setDname("");
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/getdepts").then((response) => {
      setAllDepts(response.data);
    });
  }, []);
  return (
    <React.Fragment>
      <WideLayout title="Departements">
        <Forms>
          <InputGroup size="lg">
            <InputGroup.Text id="inputGroup-sizing-lg" className="forminput">
              Depertement Name
            </InputGroup.Text>
            <FormControl
              value={dname}
              aria-label="Large"
              aria-describedby="inputGroup-sizing-sm"
              onChange={(e) => {
                setDname(e.currentTarget.value);
              }}
            />
          </InputGroup>
          <button className="add-btn" onClick={addNewDepartement}>
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
                  <th>Depertement Name</th>
                  <th>sections</th>
                  <th>Add section</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {allDepts && !!allDepts && allDepts.map((dept) => {
                  return (
                    <tr>
                      <td>{dept.id}</td>
                      <td>{dept.name}</td>
                      <td>
                        <ul>
                          <li>Android</li>
                          <li>Web Development</li>
                          <li>Graphics</li>
                        </ul>
                      </td>
                      <td className="table-icon">
                        <a onClick={handleShow} className="modalBtn">
                          <FontAwesomeIcon
                            className="table-icon blue"
                            icon={faPlus}
                            size="xs"
                          ></FontAwesomeIcon>
                        </a>
                      </td>

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
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </WideLayout>
    </React.Fragment>
  );
}

export default Departments;

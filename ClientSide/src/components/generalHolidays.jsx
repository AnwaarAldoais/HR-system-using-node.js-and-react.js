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
import Axios from "axios";

function GeneralHolidays() {
  const [holiday, setHoliday] = useState("");
  const [holidayStock, setHolidayStock] = useState("");
  const [hoildays, setHolidays] = useState([]);
  const [editHoliday, setEditHoliday] = useState("");
  const [editHolidayStock, setEditHolidayStock] = useState("");
  const [hoildayId, setHolidayId] = useState("");
  const [editHoildays, setEditHolidays] = useState([]);
  const [show, setShow] = useState("");
  const [eShow, setEShow] = useState("");
  const [msg, setMsg] = useState("");
  const userId = localStorage.getItem("id");

  /** Add Holiday Modal */
  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    e.preventDefault();
    setShow(true);
  };
  /** Edit Holiday Modal */
  const handleEditClose = () => setEShow(false);
  const handleEditShow = (id) => {
    setEShow(true);
    Axios.get("http://localhost:3001/getGeneralHoliday/" + id).then(
      (response) => {
        setEditHolidays(response.data);
        setEditHolidayStock(response.data[0].period);
        setEditHoliday(response.data[0].name);
        setHolidayId(response.data[0].id);
      }
    );
  };

  const addGeneralHoliday = () => {
    Axios.post("http://localhost:3001/addGeneralHolidays", {
      holiday: holiday,
      stock: holidayStock,
    }).then((response) => {
      if (response.data.msg) {
        setMsg(response.data.msg);
      } else {
      }
    });
    setHoliday("");
    setHolidayStock("");
    setShow(false);
  };
  const getGeneralHolidays = () => {
    Axios.get("http://localhost:3001/getGeneralHolidays").then((response) => {
      setHolidays(response.data);
    });
  };

  useEffect(() => {
    getGeneralHolidays();
  });

  const editGeneralHoliday = (id) => {
    Axios.post("http://localhost:3001/updateGeneralHoliday/" + id, {
      name: editHoliday,
      stock: editHolidayStock,
      user: userId,
    }).then((response) => {
      if (response.data.msg) {
        setMsg(response.data.msg);
      } else {
        getGeneralHolidays();
      }
    });
    setEShow(false);
  };
  const deletHoliday = (id) => {
    Axios.get("http://localhost:3001/deleteGeneralHoliday/" + id, {
      user: userId,
    }).then((response) => {});
  };

  return (
    <React.Fragment>
      <WideLayout title="General Holidays">
        <Forms>
          <button className="add-btn" onClick={handleShow}>
            Add New Official Holiday
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
                  <th>Holiday Name</th>
                  <th>Stock</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {hoildays.map((h) => {
                  return (
                    <tr value={h.id}>
                      <td>{h.id}</td>
                      <td>{h.name}</td>
                      <td>{h.period}</td>

                      <td className="table-icon">
                        <button onClick={() => handleEditShow(h.id)}>
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
                            deletHoliday(h.id);
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
          show={eShow}
          onHide={handleEditClose}
          animation={true}
          aria-labelledby="contained-modal-title-vcenter"
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit General Hoilday </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group
              className="mb-12 "
              style={{ paddingBottom: "30px" }}
              controlId="formBasicEmail"
            >
              <Form.Label>Holiday Name</Form.Label>
              <Form.Control
                value={editHoliday}
                type="text"
                placeholder="Enter Holiday Name"
                onChange={(e) => {
                  setEditHoliday(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group
              className="mb-12"
              style={{ paddingBottom: "30px" }}
              controlId=""
            >
              <Form.Label>Holiday Stock</Form.Label>
              <Form.Control
                value={editHolidayStock}
                type="text"
                placeholder="Enter Holiday Stock"
                onChange={(e) => {
                  setEditHolidayStock(e.target.value);
                }}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleEditClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                editGeneralHoliday(hoildayId);
              }}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={show}
          onHide={handleClose}
          animation={true}
          aria-labelledby="contained-modal-title-vcenter"
        >
          <Modal.Header closeButton>
            <Modal.Title>Add General Hoilday </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group
              className="mb-12 "
              style={{ paddingBottom: "30px" }}
              controlId="formBasicEmail"
            >
              <Form.Label>Holiday Name</Form.Label>
              <Form.Control
                value={holiday}
                type="text"
                placeholder="Enter Holiday Name"
                onChange={(e) => {
                  setHoliday(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group
              className="mb-12"
              style={{ paddingBottom: "30px" }}
              controlId=""
            >
              <Form.Label>Holiday Stock</Form.Label>
              <Form.Control
                value={holidayStock}
                type="text"
                placeholder="Enter Holiday Stock"
                onChange={(e) => {
                  setHolidayStock(e.target.value);
                }}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={addGeneralHoliday}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </WideLayout>
    </React.Fragment>
  );
}

export default GeneralHolidays;

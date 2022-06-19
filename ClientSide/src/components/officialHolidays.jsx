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

function OfficialHolidays() {
  const [holidayId, setHolidayID] = useState("");
  const [holiday, setHoliday] = useState("");
  const [holidayDate, setHolidayDate] = useState("");
  const [holidayYear, setHolidayYear] = useState("");
  const [editHoliday, setEditHoliday] = useState("");
  const [editHolidayDate, setEditHolidayDate] = useState("");
  const [editHolidayYear, setEditHolidayYear] = useState("");
  const [holStatic, setHolStatic] = useState(false);
  const [hoildays, setHolidays] = useState([]);
  const [show, setShow] = useState("");
  const [updateShow, setUpdateShow] = useState("");
  const [editHolidays, setEditHolidays] = useState({});
  const [msg, setMsg] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    e.preventDefault();
    setShow(true);
  };
  const userId = localStorage.getItem("id");
  const handleUpdateClose = () => setUpdateShow(false);
  const handleUpdateShow = (id) => {
    setUpdateShow(true);
    Axios.get("http://localhost:3001/getOfficialHoliday/" + id).then(
      (response) => {
        setEditHolidays(response.data);
        setEditHolidayYear(response.data[0].year);
        setEditHolidayDate(response.data[0].date.substr(0, 10));
        setEditHoliday(response.data[0].name);
      }
    );
    setHolidayID(id);
  };

  const addOfficialHoliday = () => {
    Axios.post("http://localhost:3001/addOfficialHolidays", {
      holiday: holiday,
      holidayDate: holidayDate,
      holidayYear: holidayYear,
      isStatic: holStatic,
      userId: userId,
    }).then((response) => {
      if (response.data.msg) {
        setMsg(response.data.msg);
      } else {
      }
    });
    setHoliday("");
    setHolidayDate("");
    setHolidayYear("");
    setHolStatic("");
    setShow(false);
  };

  const updateHoliday = () => {
    Axios.post("http://localhost:3001/updateOfficialHoliday/" + userId, {
      editHoliday: editHoliday,
      editHolidayDate: editHolidayDate,
      editHolidayYear: editHolidayYear,
      isStatic: holStatic,
      id: holidayId,
    }).then((response) => {
      if (response.data.msg) {
        setMsg(response.data.msg);
      } else {
      }
    });

    setHolStatic("");
    setUpdateShow(false);
  };
  const deletHoliday = (id) => {
    Axios.get("http://localhost:3001/deleteOfficialHoliday/" + id, {
      user: userId,
    }).then((response) => {});
  };
  const getOfficialHolidays = () => {
    Axios.get("http://localhost:3001/getOfficialHolidays").then((response) => {
      setHolidays(response.data);
    });
  };
  useEffect(() => {
    getOfficialHolidays();
  });

  return (
    <React.Fragment>
      <WideLayout title="Official Holidays">
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
                  <th>Holiday Date</th>
                  <th>Year</th>
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
                      <td>{h.date.substr(0, 10)}</td>
                      <td>{h.year}</td>

                      <td className="table-icon">
                        <button onClick={() => handleUpdateShow(h.id)}>
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
          show={updateShow}
          onHide={handleUpdateClose}
          animation={true}
          aria-labelledby="contained-modal-title-vcenter"
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Official Holiday </Modal.Title>
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
                ype="text"
                placeholder="Holiday name"
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
              <Form.Label>Holiday Date</Form.Label>
              <Form.Control
                value={editHolidayDate}
                type="date"
                onChange={(e) => {
                  setEditHolidayDate(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group
              className="mb-12"
              style={{ paddingBottom: "30px" }}
              controlId=""
            >
              <Form.Label>Year</Form.Label>
              <Form.Control
                value={editHolidayYear}
                type="text"
                placeholder="Enter Year"
                onChange={(e) => {
                  setEditHolidayYear(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                value={editHolidays}
                type="checkbox"
                label="is it static ?"
                onChange={(e) => {
                  setHolStatic(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group hidden className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                defaultValue={editHolidays.length > 0 ? editHolidays[0].id : ""}
                type="text"
                onChange={(e) => {
                  setHolidayID(e.target.value);
                }}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleUpdateClose}>
              Close
            </Button>
            <Button variant="primary" onClick={updateHoliday}>
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
            <Modal.Title>Add Official Hoilday </Modal.Title>
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
                placeholder="Holiday name"
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
              <Form.Label>Holiday date</Form.Label>
              <Form.Control
                value={holidayDate}
                type="date"
                placeholder="Enter Holiday date"
                onChange={(e) => {
                  setHolidayDate(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group
              className="mb-12"
              style={{ paddingBottom: "30px" }}
              controlId=""
            >
              <Form.Label>Year</Form.Label>
              <Form.Control
                value={holidayYear}
                type="text"
                placeholder="Enter Year"
                onChange={(e) => {
                  setHolidayYear(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="is it static ?"
                value={holStatic}
                onChange={(e) => {
                  setHolStatic(e.target.value);
                }}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={addOfficialHoliday}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </WideLayout>
    </React.Fragment>
  );
}

export default OfficialHolidays;

import React, { useState, useEffect } from "react";
import WideLayout from "./Layouts/wideLayout";
import Forms from "./Form";
import { Form, InputGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { Table } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import Axios from "axios";
import { Scrollbar } from "react-scrollbars-custom";
function Shifts() {
  //all variables

  const [allShifts, setAllShifts] = useState([]);
  const [shift, setShift] = useState("");
  const [updateShift, setUpdateShift] = useState("");
  const [startTimeInput, setStartTimeInput] = useState("");
  const [endTimeInput, setEndTimeInput] = useState("");
  const [lateTimeInput, setLateTimeInput] = useState("");
  const [shid, setShId] = useState("");
  const [times, setTimes] = useState([]);
  const [show, setShow] = useState(false);
  const [tShow, setTShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [updateShiftName, setUpdateShiftName] = useState("");
  const [msg, setMsg] = useState("");
  const user = localStorage.getItem("id");

  // modals functions
  const handleClose = () => setShow(false);
  const handleEditClose = () => setEditShow(false);
  const handleShow = (id) => {
    setShId(id);
    setShow(true);
  };
  // const handleEditShow = (id) => {
  //   setShId(id);
  //   setEditShow(true);
  // };

  const handleTimeClose = () => setTShow(false);
  const handleTimeShow = (id) => {
    setTShow(true);
    allTimes(id);
  };
  const handelDelete = (id) => {
    deleteShift(id);
  };

  const addNewShift = () => {
    Axios.post("http://localhost:3001/addShift", {
      shift: shift,
      user: user,
    }).then((response) => {
      if (response.data.msg) {
        setMsg(response.data.msg);
      } else {
      }
    });
    setShift("");
  };
  /**get Shifts Function */
  const getShifts = () => {
    Axios.get("http://localhost:3001/getshifts").then((response) => {
      setAllShifts(response.data);
    });
  };
  useEffect(() => {
    getShifts();
  });

  /**get Shift Function */
  const getShift = (id) => {
    setEditShow(true);
    console.log(id);
    Axios.get("http://localhost:3001/getshift/" + id, {
      shiftId: id,
    }).then((response) => {
      setUpdateShift(response.data);
      setUpdateShiftName(response.data.shifts[0].shift);
      setShId(response.data.shifts[0].id);
      console.log(shid);
    });
  };

  /** Edit Shift  Function */

  const EditShiftName = () => {
    Axios.post("http://localhost:3001/editShift", {
      id: shid,
      name: updateShiftName,
      user: user,
    }).then((response) => {});
    setEditShow(false);
  };

  const addTime = () => {
    Axios.post("http://localhost:3001/addtimes/" + shid, {
      startTime: startTimeInput,
      endTime: endTimeInput,
      lateTime: lateTimeInput,
    }).then((response) => {
      if (response.data.msg) {
        setMsg(response.data.msg);
      } else {
        setMsg("Time add Successfully");
      }
    });
    setShow(false);
  };

  const allTimes = (id) => {
    Axios.get("http://localhost:3001/getTimes/" + id).then((response) => {
      setTimes(response.data);
    });
  };
  let deleteShift = (id) => {
    Axios.get("http://localhost:3001/deleteShift/" + id, {
      user: user,
    }).then((response) => {});
  };
  return (
    <React.Fragment>
      <WideLayout title="Shifts">
        <Forms onSubmit={addNewShift}>
          <InputGroup size="lg">
            <InputGroup.Text id="inputGroup-sizing-lg" className="forminput">
              Shift Name
            </InputGroup.Text>
            <FormControl
              value={shift}
              aria-label="Large"
              aria-describedby="inputGroup-sizing-sm"
              onChange={(e) => {
                setShift(e.currentTarget.value);
              }}
            />
          </InputGroup>
          <button className="add-btn" onClick={addNewShift}>
            <FontAwesomeIcon
              className="collection-icon"
              icon={faPlus}
              size="xs"
            ></FontAwesomeIcon>
          </button>
        </Forms>
        <div className="msg">{msg != "" ? alert : ""}</div>
        <div className="report-main-container">
          <Scrollbar style={{ width: 1550, height: 600 }}>
            <div className="report-container">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Shift Name</th>
                    <th>Times</th>
                    <th>Add Time</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {allShifts && !!allShifts &&allShifts.map((shift) => {
                    return (
                      <tr value={shift.id}>
                        <td>{shift.id}</td>
                        <td>{shift.shift}</td>
                        <td>
                          <button
                            className="Time-btn"
                            onClick={() => {
                              handleTimeShow(shift.id);
                            }}
                          >
                            <FontAwesomeIcon
                              className="table-icon"
                              icon={faClock}
                              size="xs"
                            ></FontAwesomeIcon>
                          </button>
                        </td>
                        <td className="table-icon">
                          <a
                            onClick={() => {
                              handleShow(shift.id);
                            }}
                            className="modalBtn"
                          >
                            <FontAwesomeIcon
                              className="table-icon blue"
                              icon={faPlus}
                              size="xs"
                            ></FontAwesomeIcon>
                          </a>
                        </td>

                        <td className="table-icon">
                          <button
                            onClick={() => {
                              getShift(shift.id);
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
                              handelDelete(shift.id);
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
          </Scrollbar>
        </div>
        <Modal
          show={editShow}
          onHide={handleEditClose}
          animation={true}
          aria-labelledby="contained-modal-title-vcenter"
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Shift </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group
              className="mb-12 "
              style={{ paddingBottom: "30px" }}
              controlId="formBasicEmail"
            >
              <Form.Label>Shift Name</Form.Label>
              <Form.Control
                value={updateShiftName}
                type="text"
                placeholder="Shift Name"
                onChange={(e) => {
                  setUpdateShiftName(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                hidden
                value={shid}
                type="text"
                placeholder="Enter Username"
                onChange={(e) => {
                  setShId(e.target.value);
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
                EditShiftName();
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
            <Modal.Title>Add Time </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group
              className="mb-12 "
              style={{ paddingBottom: "30px" }}
              controlId="formBasicEmail"
            >
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                value={startTimeInput}
                type="time"
                placeholder="Enter Username"
                onChange={(e) => {
                  setStartTimeInput(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group
              className="mb-12"
              style={{ paddingBottom: "30px" }}
              controlId="formBasicEmail"
            >
              <Form.Label>Late Time</Form.Label>
              <Form.Control
                value={lateTimeInput}
                type="time"
                placeholder="Enter Username"
                onChange={(e) => {
                  setLateTimeInput(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group
              className="mb-12"
              style={{ paddingBottom: "30px" }}
              controlId="formBasicEmail"
            >
              <Form.Label>End Time</Form.Label>
              <Form.Control
                value={endTimeInput}
                type="time"
                placeholder="Enter Username"
                onChange={(e) => {
                  setEndTimeInput(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group
              className="mb-12"
              style={{ paddingBottom: "30px" }}
              controlId="formBasicEmail"
            >
              <Form.Control
                hidden
                value={shid}
                type="text"
                placeholder="Enter Username"
                onChange={(e) => {
                  setShId(e.target.value);
                }}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                addTime();
              }}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={tShow} onHide={handleTimeClose}>
          <Modal.Header closeButton>
            <Modal.Title>Shift Times</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ul>
              {times.map((time) => {
                return (
                  <li>
                    {" "}
                    Start Time : {time.start_time} - Leave Time :{" "}
                    {time.end_time}
                  </li>
                );
              })}
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleTimeClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </WideLayout>
    </React.Fragment>
  );
}

export default Shifts;

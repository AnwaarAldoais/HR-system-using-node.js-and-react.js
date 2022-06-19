import React, { useState, useEffect } from "react";
import WideLayout from "./Layouts/wideLayout";
import Forms from "./Form";
import { InputGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Table } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import Axios from "axios";

function HolidaysStoks() {
    const [userid, setUserId] = useState(1);
    const [holtype, setHolType] = useState(0);
    const [ename, setEname] = useState("");
    const [fdate, setFDate] = useState("");
    const [tdate, setTDate] = useState("");
    const [allhols, setAllHols] = useState([]);
    const [allrequests, setAllRequests] = useState([]);
    const [deptid, setDeptId] = useState(1);
    const [show, setShow] = useState(false);
    const [msg, setMsg] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const addHolReq = (e) => {
        e.preventDefault();
        Axios.post("http://localhost:3001/addholreq", {
            dept: deptid,
            user: userid,
            emp: ename,
            holtype: holtype,
            from: fdate,
            to: tdate,
        }).then((response) => {
            if (response.data.msg) {
                setMsg(response.data.msg);
            } else {
            }
        });
        setEname("");
        setFDate("");
        setTDate("");
        setHolType("");
    };
    const ReqState = (hol,e) => {
        e.preventDefault();
        Axios.post("http://localhost:3001/reqstate", {
            holid: hol.id,
            empid: hol.eid,
        }).then((response) => {
            if (response.data.msg) {
                setMsg(response.data.msg);
            } else {
            }
        });
   
    };
    useEffect(() => {
        Axios.get("http://localhost:3001/getholtype").then((response) => {
            setAllHols(response.data);
        });
    }, []);
    const ListHolidayes = allhols && !!allhols.length && allhols.map((hol, key) => (
        <option
            value={hol.id}
        >{hol.name}
        </option>
    ));
    useEffect(() => {
        Axios.get("http://localhost:3001/getHolReqs").then((response) => {
            setAllRequests(response.data);
        });

    }, []);

    return (
        <React.Fragment>
            <WideLayout title="Holidays Stoks">
                <Forms>

                    <a onClick={handleShow} className="add-btn">
                        <FontAwesomeIcon
                            // style={}
                            icon={faPlus}
                            size="xs"
                        ></FontAwesomeIcon>
                        Request Holiday
                    </a>
                </Forms>
                <div className="report-main-container">
                    <div className="msg">{msg ? alert : ""}</div>
                    <div className="report-container">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Holiday Type</th>                                
                                    <th>From Date</th>
                                    <th>To Date</th>
                                    <th>Holidays Total</th>
                                    <th>Total Rest</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allrequests && !!allrequests.length && allrequests.map((hol) => {
                                    return (
                                        <tr>
                                             <td>{hol.id}</td>
                                             <td>{hol.holtype}</td>                                         
                                            <td>{hol.fdate}</td>
                                            <td>{hol.tdate}</td>                                           
                                            <td>{hol.total}</td>
                                            <td>{hol.holrest}</td>                                           
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
                        <Modal.Title>Add New Section</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Employee Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Username"
                                    onChange={(e) => {
                                        setEname(e.target.value);
                                    }}
                                    value={ename}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Holiday Type</Form.Label>
                                <InputGroup size="lg">
                                    <Form.Select
                                        style={{ width: "8vw", marginRight: "17px" }}
                                        aria-label="Default select example"
                                        onChange={event => setHolType(event.target.value)}
                                        value={holtype}
                                    >
                                        <option >Choose Depts</option>
                                        {ListHolidayes}
                                    </Form.Select>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>From Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    onChange={(e) => {
                                        setFDate(e.target.value.toString());
                                    }}
                                    value={fdate}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>To Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    onChange={(e) => {
                                        setTDate(e.target.value.toString());
                                    }}
                                    value={tdate}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="success" onClick={addHolReq}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </WideLayout>
        </React.Fragment>
    );
}

export default HolidaysStoks;

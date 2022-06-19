import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import Axios from "axios";

function AddPublicActivity() {
  const [memberInput, setMemberInput] = useState("");
  const [msg, setMsg] = useState("");
  const [status, setStatus] = useState(false);
  const user = localStorage.getItem("id");

  const handelChange = (e) => {
    setMemberInput(e.currentTarget.value);
  };

  
  const addnewactivity = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/addNewActivity", {
      activity: memberInput,
      user: user,
    }).then((response) => {
      if (response.data.msg) {
        setMsg(response.data.msg);
        setStatus(!status)
      } else {
      }
    });
    setMemberInput("");
  };

  return (
    <React.Fragment>
      <div className="post-content">
        <Form onSubmit={addnewactivity}>
          <Form.Group
            controlId="exampleForm.ControlTextarea1"
            className="textarea"
          >
            <Form.Control
              as="textarea"
              placeholder="Hey ^^, what's your new ?"
              style={{ height: "150px" }}
              value={memberInput}
              onChange={handelChange}
            />
          </Form.Group>
          <button className="post-btn">
            <FontAwesomeIcon
              className="plus"
              icon={faPaperPlane}
              size=""
            ></FontAwesomeIcon>
          </button>
        </Form>
      </div>
    </React.Fragment>
  );
}

export default AddPublicActivity;

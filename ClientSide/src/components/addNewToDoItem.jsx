import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { FormGroup } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";

function AddNewToDoItem({ AddNewItem }) {
  const [userInput, setUserInput] = useState("");
  const [msg, setMsg] = useState("");
  const userId = localStorage.getItem("id");
  const handleChange = (e) => {
    setUserInput(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    AddNewItem(userInput);
    setUserInput("");
  };
  return (
    <div className="todo-inner-container">
      <Form className="d-flex" inline onSubmit={handleSubmit}>
        <FormGroup controlId="formInlineName">
          <FormControl
            type="text"
            value={userInput}
            onChange={handleChange}
            placeholder="Add new task"
          />
        </FormGroup>
        <button className="todo-btn">
          <FontAwesomeIcon
            className="plus"
            icon={faPlusSquare}
            size=""
          ></FontAwesomeIcon>
        </button>
      </Form>
    </div>
  );
}

export default AddNewToDoItem;

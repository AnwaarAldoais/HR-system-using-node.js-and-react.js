import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
function Todo({ todo, handleToggle, handleDelete }) {
  const [toggle, setToggle] = useState(true);
  const handleClick = (e) => {
    e.preventDefault();
    handleToggle(e.currentTarget.id);
  };

  const handleFilters = (e) => {
    e.preventDefault();
    handleDelete(e.currentTarget.id);
  };

  return (
    <div className="todo-list">
      <div className="list-item">
        <p className={todo.status == 1 ? "item-txt done" : "item-txt"}>
          {todo.todo}
        </p>
        <div className="todo-icons">
          <a
            className="check-icon"
            value={todo.id}
            id={todo.id}
            onClick={handleClick}
          >
            <FontAwesomeIcon icon={faCheckCircle} />
          </a>
          <a
            className="times-icon d"
            value={todo.id}
            id={todo.id}
            onClick={handleFilters}
          >
            <FontAwesomeIcon icon={faTimesCircle} />
          </a>{" "}
        </div>
      </div>
    </div>
  );
}

export default Todo;

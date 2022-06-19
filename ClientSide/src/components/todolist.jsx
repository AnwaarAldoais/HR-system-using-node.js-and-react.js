import React from "react";
import Todo from "./todo";

function ToDoList({ toDoList, handleToggle, handleDelete }) {
  return (
    <React.Fragment>
      {toDoList
        .slice(-3)
        .reverse()
        .map((todo) => {
          return (
            <Todo
              todo={todo}
              handleToggle={handleToggle}
              handleDelete={handleDelete}
            />
          );
        })}
    </React.Fragment>
  );
}

export default ToDoList;

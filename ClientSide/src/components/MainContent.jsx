import React, { useState, useEffect } from "react";
import ToDoList from "./todolist";
import AddNewToDoItem from "./addNewToDoItem";
import AddPublicActivity from "./addPublicActivity";
import Posts from "./posts";
import { Scrollbar } from "react-scrollbars-custom";
import Axios from "axios";

function MainContent() {
  const auth = () => {
    Axios.get("http://localhost:3001/isAuth", {
      token: localStorage.getItem("token"),
    }).then((response) => {
      if (response) {
        console.log("u r authorized");
      } else {
        console.log("u r not authorized");
      }
    });
  };

  const [toDoList, setToDoList] = useState([]);
  const userId = localStorage.getItem("id");
  useEffect(() => {
    Axios.get("http://localhost:3001/getTodoList/" + userId).then(
      (response) => {
        setToDoList(response.data);
      }
    );
  });

  const handleToggle = (e, id) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/doneItem/" + id).then((response) => {
      if (response.data.msg) {
        console.log(response.data.msg);
      } else {
      }
    });
  };
  const AddNewItem = (userInput) => {
    Axios.post("http://localhost:3001/addTodoItem/" + userId, {
      todo: userInput,
    }).then((response) => {
      if (response.data.msg) {
        console.log("add successfully !!");
      } else {
      }
    });
  };
  const handleDelete = (id) => {
    Axios.post("http://localhost:3001/deleteItem/" + id).then((response) => {
      if (response.data.msg) {
        console.log(response.data.msg);
      } else {
      }
    });
  };

  return (
    <React.Fragment>
      <div className="personal-container">
        <h2 className="p-title">Personal Information</h2>
        <div className="p-info">
          <div className="p-inner-container">
            <div className="p-img"></div>
            <div className="p-data">
              <p className="p-name">{localStorage.getItem("user")}</p>
              <p className="p-job">Programmer and Designer</p>
              <p className="p-bio">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
          </div>
        </div>
        <h2 className="p-title">
          Add new <span className="turkuaz">TODO</span> list
        </h2>
        <div className="todo-list-container">
          <AddNewToDoItem AddNewItem={AddNewItem} />
          <Scrollbar style={{ width: 550, height: 200 }}>
            <ToDoList
              toDoList={toDoList}
              handleDelete={handleDelete}
              handleToggle={handleToggle}
            />
          </Scrollbar>
        </div>
      </div>

      <div className="posts-container">
        <Scrollbar style={{ width: `100%`, height: `100%` }}>
          <div className="p-inner-container">
            <h2 className="posts-title">Last public activities</h2>
            <button onClick={auth} className="posts-title">
              Last public activities
            </button>
            <AddPublicActivity />

            <Posts />
          </div>
        </Scrollbar>
      </div>
    </React.Fragment>
  );
}

export default MainContent;

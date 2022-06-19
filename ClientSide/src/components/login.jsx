import background from "../imgs/login-illu.jpg";
import { Form } from "react-bootstrap";
import logins from "../imgs/login.png";
import "bootstrap/dist/css/bootstrap.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useState(false);
  const [loginStatus, setloginStatus] = useState(false);
  const [msg, setMsg] = useState("");
  Axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  //Axios.defaults.withCredentials = true;

  const login = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/login", {
      username: username,
      password: password,
    }).then((response) => {
      if (!response.data.auth) {
        setMsg(response.data.msg);
        setAuth(false);
      } else {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("user", response.data.user);
        setAuth(true);
        navigate("/Home");
      }
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (!auth) {
        navigate("/");
      } else {
        localStorage.setItem('token',)
        navigate("/Home");
      }
    });
  }, []);

  if (loginStatus) {
    navigate("/Home");
  }
  document.title = `Login`;
  return (
    <div className="main-div">
      <div className="login-container">
        <div
          className="login-img"
          style={{ backgroundImage: `url(${logins})` }}
        ></div>
        <div className="login-form">
          <h1 className="login-title">Login</h1>
          <div className="inner-container">
            <Form>
              <Form.Group
                className="mb-3 "
                style={{ paddingBottom: "30px" }}
                controlId="formBasicEmail"
              >
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Username"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group
                className="mb-3 extra-margin"
                controlId="formBasicPassword"
              >
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Form.Group>
              <button className="yellow-btn" onClick={login}>
                Login
              </button>
            </Form>
            <h1 className="loginmsg">{msg}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

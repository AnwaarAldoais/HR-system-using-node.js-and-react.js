import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("id");
    localStorage.removeItem("roles");
    navigate("/");
  };
  return (
    <React.Fragment>
      <div className="logout">
        <button className="logout-btn" onClick={logout}>
          <FontAwesomeIcon
            className="logout-icon"
            icon={faSignOutAlt}
            size="xs"
          ></FontAwesomeIcon>
        </button>
      </div>
    </React.Fragment>
  );
}

export default Logout;

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";
import Times from "./times";
function ShifstLists({ handleShow }) {
  const [allShifts, setAllShifts] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:3001/getshifts").then((response) => {
      setAllShifts(response.data);
    });
  });
  console.log(allShifts);
  return allShifts.map((shift) => {
    return (
      <tr value={shift.id}>
        <td>{shift.id}</td>
        <td>{shift.shift}</td>
        <td>
          <ul>
            <Times Shiftid={shift.id} />
          </ul>
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
          <a href="http://">
            <FontAwesomeIcon
              className="table-icon red"
              icon={faEdit}
              size="xs"
            ></FontAwesomeIcon>
          </a>
        </td>
        <td className="table-icon">
          <a href="http://">
            <FontAwesomeIcon
              className="table-icon red"
              icon={faTrash}
              size="xs"
            ></FontAwesomeIcon>
          </a>
        </td>
      </tr>
    );
  });
}

export default ShifstLists;

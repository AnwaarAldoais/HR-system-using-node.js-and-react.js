import React, { useEffect, useState } from "react";
import Axios from "axios";

function Times({ Shiftid }) {
  const [times, setTimes] = useState([]);
  const [id, setId] = useState("");
  setId(Shiftid);
  const allTimes = (id) => {
    Axios.get("http://localhost:3001/getTimes/" + id).then((response) => {
      setTimes(response.data);
    });
  };
  return (
    <React.Fragment>
      {times.map((time) => {
        return (
          <li>
            {time.start_time}+ " - " + {time.end_time}
          </li>
        );
      })}
    </React.Fragment>
  );
}

export default Times;

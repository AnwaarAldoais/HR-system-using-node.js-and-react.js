import React from "react";

function TotlaTakenStocks({
  takenExcuses,
  takenHol,
  totlaAttendance,
  totalAbsencs,
}) {
  return (
    <>
      <p className="total-txt">
        <span>Taken Holidays:</span> {takenHol}
      </p>
      <p className="total-txt">
        <span>Taken Excuses:</span> {takenExcuses}
      </p>
      <p className="total-txt">
        <span>Days of attendance:</span> {totlaAttendance}
      </p>
      <p className="total-txt">
        <span>Days of absence:</span> {totalAbsencs}
      </p>
    </>
  );
}

export default TotlaTakenStocks;

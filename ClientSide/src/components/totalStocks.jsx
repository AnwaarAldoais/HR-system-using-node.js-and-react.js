import React from "react";
import TotalTxt from "./totalsTxt";
import TotlaTakenStocks from "./totalTakenStocks";

function TotlaStocks({
  takenHol,
  takenExcuses,
  totlaAttendance,
  totalAbsencs,
}) {
  return (
    <>
      <div className="total-attend">
        <div className="total-container">
          <TotlaTakenStocks
            takenHol={takenHol}
            takenExcuses={takenExcuses}
            totlaAttendance={totlaAttendance}
            totalAbsencs={totalAbsencs}
          />
        </div>
      </div>
      {/* <div className="total-attend">
        <div className="total-container">
          {totalStocks.map((stock) => {
            return <TotalTxt stock={stock} />;
          })}
        </div>
      </div> */}
    </>
  );
}

export default TotlaStocks;

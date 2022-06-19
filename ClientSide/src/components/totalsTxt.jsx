import React from "react";

function TotalTxt({ stock }) {
  return (
    <React.Fragment>
      <p className="total-txt">
        <span>Total avl. Holidays:</span> {stock.Holidays}
      </p>
      <p className="total-txt">
        <span>Total avl. Excuses:</span> {stock.Excuses}
      </p>
    </React.Fragment>
  );
}

export default TotalTxt;

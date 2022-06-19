import React from "react";
import { Form } from "react-bootstrap";

function Forms({ children }) {
  return (
    <React.Fragment>
      <div className="report-form">
        <Form className="d-flex" inline>
          {children}
        </Form>
      </div>
    </React.Fragment>
  );
}

export default Forms;

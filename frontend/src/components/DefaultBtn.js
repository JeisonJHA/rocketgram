import React from "react";

import "./DefaultBtn.css";

const Defaultbtn = props => (
  <button className="defaultBtn" {...props}>
    {props && props.children}
  </button>
);

export default Defaultbtn;

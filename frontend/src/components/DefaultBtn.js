import React from 'react';

const Defaultbtn = (props) => (
  <button className="defaultBtn" {...props}>
    {props && props.children}
  </button>);

export default Defaultbtn;
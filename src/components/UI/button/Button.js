import React from "react";

import "./button.css";

const Button = props => {
  return (
    <button className={`button ${props.btnType}`} onClick={props.clicked}>
      {props.children}
    </button>
  );
};

export default Button;

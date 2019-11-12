import React from "react";

import "./backDrop.css";

const BackDrop = props =>
    props.show ? <div className="BackDrop" onClick={props.clicked}></div> : null;

export default BackDrop;

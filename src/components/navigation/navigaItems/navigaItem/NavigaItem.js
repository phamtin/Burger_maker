import React from "react";

import "./navigaItem.css";

const NavigaItem = props => {
  return (
    <li className="NavigationItem">
      <a href={props.link} className={props.active ? "active" : null}>
        {props.children}
      </a>
    </li>
  );
};

export default NavigaItem;

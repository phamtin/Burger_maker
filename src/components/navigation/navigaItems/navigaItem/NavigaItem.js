import React from "react";
import { NavLink } from "react-router-dom";

import "./navigaItem.css";

const NavigaItem = props => {
  return (
    <li className="NavigationItem">
      <NavLink to={props.link} activeClassName="active" exact>
        {props.children}
      </NavLink>
    </li>
  );
};

export default NavigaItem;

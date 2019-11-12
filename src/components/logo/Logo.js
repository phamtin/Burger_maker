import React from "react";

import "./logo.css";
import logo from "asset/images/logo.png";

const Logo = props => {
    return (
        <div className="Logo">
            <img src={logo} alt="logo" />
        </div>
    );
};
export default Logo;

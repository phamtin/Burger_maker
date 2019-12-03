import React from "react";

import "./toolbar.css";
import Logo from "components/logo/Logo";
import NavigaItems from "../navigaItems/NavigaItems";

const Toolbar = props => {
  return (
    <header className="Toolbar">
      <div className="welcome">Hello, Tin</div>
      <div className="logo-toolbar" onClick={props.toggleDrawer}>
        <Logo />
      </div>
      <nav className="desktop-only">
        <NavigaItems isAuth={props.isAuthenticated} />
      </nav>
    </header>
  );
};

export default Toolbar;

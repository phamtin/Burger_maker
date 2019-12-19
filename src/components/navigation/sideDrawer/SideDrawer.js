import React from "react";

import Logo from "components/logo/Logo";
import NavigaItems from "../navigaItems/NavigaItems";
import "./sideDrawer.css";
import BackDrop from "components/UI/backDrop/BackDrop";

const SideDrawer = props => {
  return (
    <>
      <div className={`SideDrawer ${props.show ? "Open" : "Close"}`}>
        <div className="logo-drawer">
          <Logo />
        </div>
        <nav>
          <NavigaItems isAuth={props.isAuthenticated} />
        </nav>
      </div>
      <BackDrop show={props.show} clicked={props.closeDrawer} />
    </>
  );
};

export default SideDrawer;

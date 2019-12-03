import React from "react";

import NavigaItem from "./navigaItem/NavigaItem";

const style = {
  display: "flex",
  alignItems: "center",
  height: "100%",
  margin: 0,
  padding: 0,
  listStyle: "none"
};

const NavigaItems = props => {
  return (
    <ul style={style}>
      <NavigaItem link="/">Burger Builder</NavigaItem>
      {props.isAuth ? <NavigaItem link="/orders">Orders</NavigaItem> : null}
      {!props.isAuth ? (
        <NavigaItem link="/auth">Signup/in</NavigaItem>
      ) : (
        <NavigaItem link="/logout">Logout</NavigaItem>
      )}
    </ul>
  );
};

export default NavigaItems;

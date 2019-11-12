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
      <NavigaItem link="/" active>
        Burger Builder
      </NavigaItem>
      <NavigaItem link="/">Checkout</NavigaItem>
    </ul>
  );
};

export default NavigaItems;

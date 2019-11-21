import React from "react";
import { withRouter } from "react-router-dom";

import "./burger.css";
import Ingredient from "./ingredient/Ingredient";

const Burger = props => {
  let arrayIngre = Object.keys(props.ingredients)
    .map(key => [key, props.ingredients[key]])
    .map(ingre => {
      return [...Array(ingre[1])].map((_, i) => {
        return <Ingredient key={ingre[0] + i} type={ingre[0]} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
  if (arrayIngre.length === 0) {
    arrayIngre = <p>More Ingredient !</p>;
  }

  return (
    <div className="Burger">
      <Ingredient type="bread-top" />
      {arrayIngre}
      <Ingredient type="bread-bottom" />
    </div>
  );
};

export default withRouter(Burger);

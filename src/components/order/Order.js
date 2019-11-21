import React from "react";

const style = {
  width: "80%",
  border: "1px solid #eee",
  boxShadow: "0 2px 3px #ccc",
  padding: "10px",
  margin: "10px auto",
  boxSizing: "border-box"
};

const span = {
  padding: "4px 6px",
  marginRight: "5px",
  border: "1px solid #9c4617"
};

const Order = props => {
  const orders = [];
  for (let ingredient in props.ingredients) {
    orders.push({
      name: ingredient,
      amount: props.ingredients[ingredient]
    });
  }

  const orderOutput = orders.map((ig, i) => {
    return (
      <span key={ig + i} style={span}>
        {ig.name}
        {": "}
        {ig.amount}
      </span>
    );
  });

  return (
    <div style={style}>
      <p>Ingredients: {orderOutput}</p>
      <p>
        price: <strong>{parseFloat(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Order;

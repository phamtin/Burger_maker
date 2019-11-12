import React from "react";

import "./orderSum.css";

class OrderSum extends React.Component {
  componentDidUpdate() {
    console.log("up!");
  }

  chosenIngredients = () => {
    return Object.keys(this.props.ingredients).map(ingre => {
      return this.props.ingredients[ingre] !== 0 ? (
        <li key={ingre}>
          <strong>{this.props.ingredients[ingre]}</strong> &nbsp;{ingre}
        </li>
      ) : null;
    });
  };

  render() {
    return (
      <>
        <h3>Your Ingredients:</h3>
        <p>Your Burger with these Ingredients</p>
        <ul style={{ listStyle: "none" }}>{this.chosenIngredients()}</ul>
        <p>Continue checkout?</p>
        <button
          className="Button Danger"
          onClick={this.props.cancelPurchaseHandler}
        >
          cancel
        </button>
        <button
          className="Button Success"
          onClick={this.props.continuePurchaseHandler}
        >
          continue
        </button>
      </>
    );
  }
}

export default OrderSum;

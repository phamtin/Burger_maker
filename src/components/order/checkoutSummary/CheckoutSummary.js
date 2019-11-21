import React from "react";

import "./checkoutSummary.css";
import Burger from "components/burger/Burger.js";
import Button from "components/UI/button/Button";

const CheckoutSummary = props => {
  return (
    <div className="checkout-summary">
      <h1>Hope tastes well !</h1>
      <div className="section-burger">
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="danger" clicked={props.cancelCheckout}>
        Cancel
      </Button>
      <Button btnType="success" clicked={props.continueCheckout}>
        Continue
      </Button>
    </div>
  );
};

export default CheckoutSummary;

import React, { Component } from "react";
import CheckoutSummary from "components/order/checkoutSummary/CheckoutSummary.js";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import ContactData from "./contactData/ContactData";

class Checkout extends Component {
  cancelCheckoutHandle = () => {
    this.props.history.goBack();
  };
  continueCheckoutHandle = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.ings}
          cancelCheckout={this.cancelCheckoutHandle}
          continueCheckout={this.continueCheckoutHandle}
        />
        <Route path="/checkout/contact-data" component={ContactData} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);

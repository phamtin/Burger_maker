import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import * as orderAction from "store/actions/index";
import "./contactData.css";
import Button from "components/UI/button/Button";
import Spinner from "components/UI/spinner/Spinner";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      city: "",
      postalCode: ""
    },
    redirect: false
  };

  submitContactData = e => {
    e.preventDefault();
    const order = {
      userId: this.props.userId,
      ingredients: this.props.ings,
      price: this.props.price,
      customer: {
        name: "Tin",
        address: {
          city: "Danang, Vietnam",
          street: "Thanh Hai"
        },
        email: "tinphamtp@gmail.com"
      }
    };
    this.setState({ redirect: true });
    this.props.onOrderBurger(order, this.props.token);
  };

  handleReDirect = () => {
    if (this.state.redirect) return <Redirect to="/" />;
  };

  render() {
    let form = (
      <form>
        <input type="text" name="name" placeholder="your name" />
        <input type="text" name="email" placeholder="your email" />
        <input type="text" name="city" placeholder="your city" />
        <input type="text" name="postal-code" placeholder="your postal code" />
        <Button clicked={this.submitContactData} btnType="success">
          Pay
        </Button>
      </form>
    );
    if (this.props.isLoading) {
      form = <Spinner />;
    }
    return (
      <div className="contact-data">
        {this.handleReDirect()}
        <h3>Enter your contact data:</h3>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    isLoading: state.order.isLoading,
    token: state.auth.token,
    userId: state.auth.idUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(orderAction.purchaseStart(orderData, token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);

import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import "./contactData.css";
import instance from "firebase/axios-order";
import Button from "components/UI/button/Button";
import Spinner from "components/UI/spinner/Spinner";

export default class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      city: "",
      postalCode: ""
    },
    isLoading: false,
    redireact: false
  };

  submitContactData = e => {
    e.preventDefault();
    this.setState({ isLoading: true });
    const order = {
      ingredients: this.props.ingredients,
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
    instance
      .post("/order.json", order)
      .then(res =>
        this.setState({
          isLoading: false,
          purchasing: false,
          ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
          },
          redireact: true
        })
      )
      .catch(error => this.setState({ isLoading: false, purchasing: false }));
  };

  handleReDirect = () => {
    if (this.state.redireact) return <Redirect to="/" />;
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
    if (this.state.isLoading) {
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

import React, { Component } from "react";

import "./orders.css";
import Order from "components/order/Order";
import instance from "firebase/axios-order";

export default class Orders extends Component {
  state = {
    orders: [],
    isLoading: true
  };

  componentDidMount() {
    instance
      .get("/order.json")
      .then(res => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({ id: key, ...res.data[key] });
        }
        this.setState({ isLoading: false, orders: fetchedOrders }, () => {
          console.log(this.state.orders);
        });
      })
      .catch(e => console.log(e));
  }

  render() {
    const renderOrders = this.state.orders.map(order => {
      return (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
        />
      );
    });
    return <div className="orders">{renderOrders}</div>;
  }
}

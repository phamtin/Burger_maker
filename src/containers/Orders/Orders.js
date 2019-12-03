import React, { Component } from "react";

import "./orders.css";
import Order from "components/order/Order";
import * as actions from "store/actions/index";
import { connect } from "react-redux";
import Spinner from "components/UI/spinner/Spinner";
import ErrorHandler from "HOC/ErrorHandler";
import instance from "firebase/axios-order";

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.idUser);
  }

  render() {
    let renderOrders = <Spinner />;
    if (!this.props.isLoading) {
      renderOrders = this.props.orders.map(order => {
        return (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
          />
        );
      });
    }
    return <div className="orders">{renderOrders}</div>;
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    isLoading: state.order.isLoading,
    token: state.auth.token,
    idUser: state.auth.idUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, idUser) =>
      dispatch(actions.fetchOrders(token, idUser))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorHandler(Orders, instance));

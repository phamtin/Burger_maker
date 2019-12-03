import React, { Component } from "react";
import { connect } from "react-redux";
import instance from "firebase/axios-order";

import Burger from "components/burger/Burger";
import Summary from "components/UI/Modal/Summary";
import OrderSum from "components/burger/orderSum/OrderSum";
import BuildControls from "components/buildControls/BuildControls";
import Spinner from "components/UI/spinner/Spinner";
import ErrorHandler from "HOC/ErrorHandler";
import * as burgerBuilderAction from "store/actions/index";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    isLoading: false
  };

  componentDidMount() {
    this.props.onInitIngredient();
  }

  openPurchase = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.setAuthRedirectPath("/checkout");
      this.props.history.push("/auth");
    }
  };
  closePurchasing = () => {
    this.setState({ purchasing: false });
  };
  continuePurchaseHandler = () => {
    this.props.history.push("/checkout");
  };
  updatePurchasableStatus = ingredient => {
    const ingredients = { ...ingredient };
    let sum = Object.keys(ingredients)
      .map(key => {
        return ingredients[key];
      })
      .reduce((summary, el) => {
        return summary + el;
      }, 0);
    return sum > 0;
  };

  render() {
    let orderSum = (
      <OrderSum
        ingredients={this.props.ings}
        cancelPurchaseHandler={this.closePurchasing}
        continuePurchaseHandler={this.continuePurchaseHandler}
      />
    );
    let burger = <Spinner />;
    if (this.props.ings) {
      burger = (
        <>
          <Summary
            show={this.state.purchasing}
            closeModal={this.closePurchasing}
          >
            {orderSum}
          </Summary>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ctrlAdd={this.props.onIngredientAdded}
            ctrlRemove={this.props.onIngredientRemoved}
            totalPrice={this.props.totalPrice}
            disabled="true"
            purchasable={this.updatePurchasableStatus(this.props.ings)}
            purchasing={this.openPurchase}
            isAuth={this.props.isAuthenticated}
          />
        </>
      );
    }
    if (this.state.isLoading) {
      orderSum = <Spinner />;
    }
    return <>{burger}</>;
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token != null
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName => {
      dispatch(burgerBuilderAction.addIngredient(ingName));
    },
    onIngredientRemoved: ingName => {
      dispatch(burgerBuilderAction.removeIngredient(ingName));
    },
    setAuthRedirectPath: path =>
      dispatch(burgerBuilderAction.setAuthRedirectPath(path)),
    onInitIngredient: () => dispatch(burgerBuilderAction.initalIngredients())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorHandler(BurgerBuilder, instance));

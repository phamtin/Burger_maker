import React, { Component } from "react";
import Burger from "components/burger/Burger";
import BuildControls from "components/buildControls/BuildControls";
import Summary from "components/UI/Modal/Summary";
import OrderSum from "components/burger/orderSum/OrderSum";

const PRICE_INGREDIENT = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.5,
  meat: 1.3
};

export default class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false
  };

  openPurchase = () => {
    this.setState({ purchasing: true });
  };
  closePurchasing = () => {
    this.setState({ purchasing: false });
  };
  continuePurchaseHandler = () => {
    this.closePurchasing();
    alert("Purchase Successfully!");
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
    this.setState({ purchasable: sum > 0 });
  };

  addIngredient = type => {
    const oldIngredient = this.state.ingredients[type];
    const updateIngredient = oldIngredient + 1;
    const updateState = { ...this.state.ingredients };
    updateState[type] = updateIngredient;
    this.setState({
      ingredients: updateState,
      totalPrice: this.state.totalPrice + PRICE_INGREDIENT[type]
    });
    this.updatePurchasableStatus(updateState);
  };
  removeIngredient = type => {
    const oldIngredient = this.state.ingredients[type];
    let updateIngredient = null;
    if (oldIngredient <= 0) {
      return;
    }
    updateIngredient = oldIngredient - 1;
    const updateState = { ...this.state.ingredients };
    updateState[type] = updateIngredient;
    this.setState({
      ingredients: updateState,
      totalPrice: this.state.totalPrice - PRICE_INGREDIENT[type]
    });
    this.updatePurchasableStatus(updateState);
  };

  render() {
    return (
      <>
        <Summary show={this.state.purchasing} closeModal={this.closePurchasing}>
          <OrderSum
            ingredients={this.state.ingredients}
            cancelPurchaseHandler={this.closePurchasing}
            continuePurchaseHandler={this.continuePurchaseHandler}
          />
        </Summary>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ctrlAdd={this.addIngredient}
          ctrlRemove={this.removeIngredient}
          totalPrice={this.state.totalPrice}
          disabled="true"
          purchasable={this.state.purchasable}
          purchasing={this.openPurchase}
        />
      </>
    );
  }
}

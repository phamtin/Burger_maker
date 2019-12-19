import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";

import LazyLoad from "HOC/lazyLoad";
import BurgerBuilder from "containers/BurgerBuilder/BurgerBuilder";
import Toolbar from "components/navigation/toolbar/Toolbar";
import SideDrawer from "components/navigation/sideDrawer/SideDrawer";
import Logout from "containers/Auth/Logout";
import * as actions from "store/actions/index";

const asyncCheckout = LazyLoad(() => {
  return import("containers/Checkout/Checkout");
});
const asyncOrders = LazyLoad(() => {
  return import("containers/Orders/Orders");
});
const asyncAuth = LazyLoad(() => {
  return import("containers/Auth/Auth");
});

class App extends React.Component {
  state = {
    showDrawer: false
  };

  componentDidMount() {
    this.props.onTryAutoSignin();
  }

  showDrawerHandle = () => {
    this.setState({ showDrawer: true });
  };

  closeDrawer = () => {
    this.setState({ showDrawer: false });
  };

  render() {
    let routers = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/auth" component={asyncAuth} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuth) {
      routers = (
        <Switch>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" component={Logout} />
        </Switch>
      );
    }
    return (
      <div className="App">
        <Toolbar
          toggleDrawer={this.showDrawerHandle}
          isAuthenticated={this.props.isAuth}
        />
        <SideDrawer
          show={this.state.showDrawer}
          closeDrawer={this.closeDrawer}
          isAuthenticated={this.props.isAuth}
        />
        {routers}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token != null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignin: () => dispatch(actions.checkAuthState())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

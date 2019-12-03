import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import BurgerBuilder from "containers/BurgerBuilder/BurgerBuilder";
import Toolbar from "components/navigation/toolbar/Toolbar";
import SideDrawer from "components/navigation/sideDrawer/SideDrawer";
import Checkout from "containers/Checkout/Checkout";
import Orders from "containers/Orders/Orders";
import Auth from "containers/Auth/Auth";
import Logout from "containers/Auth/Logout";
import * as actions from "store/actions/index";

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
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/orders" component={Orders} />
        <Route path="/auth" component={Auth} />
        <Route path="/logout" component={Logout} />
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

import React from "react";
import { Route } from "react-router-dom";

import BurgerBuilder from "containers/BurgerBuilder/BurgerBuilder";
import Toolbar from "components/navigation/toolbar/Toolbar";
import SideDrawer from "components/navigation/sideDrawer/SideDrawer";
import Checkout from "containers/Checkout/Checkout";
import Orders from "containers/Orders/Orders";

class App extends React.Component {
  state = {
    showDrawer: false
  };

  showDrawerHandle = () => {
    this.setState({ showDrawer: true });
  };

  closeDrawer = () => {
    this.setState({ showDrawer: false });
  };

  render() {
    return (
      <div className="App">
        <Toolbar toggleDrawer={this.showDrawerHandle} />
        <SideDrawer
          show={this.state.showDrawer}
          closeDrawer={this.closeDrawer}
        />
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/orders" component={Orders} />
      </div>
    );
  }
}

export default App;

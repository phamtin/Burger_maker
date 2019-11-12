import React from "react";
import BurgerBuilder from "containers/BurgerBuilder/BurgerBuilder";
import Toolbar from "components/navigation/toolbar/Toolbar";
import SideDrawer from "components/navigation/sideDrawer/SideDrawer";

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
        <BurgerBuilder />
      </div>
    );
  }
}

export default App;

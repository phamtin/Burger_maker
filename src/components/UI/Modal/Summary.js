import React from "react";

import "./summary.css";
import BackDrop from "../backDrop/BackDrop";

class Summary extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show;
  }

  render() {
    return (
      <>
        <div
          className="Modal"
          style={{ display: this.props.show ? "block" : "none" }}
        >
          {this.props.children}
        </div>
        <BackDrop show={this.props.show} clicked={this.props.closeModal} />
      </>
    );
  }
}

export default Summary;

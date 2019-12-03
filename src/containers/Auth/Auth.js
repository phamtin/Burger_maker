import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import "./auth.css";
import Button from "components/UI/button/Button";
import * as actions from "store/actions/index";
import Spinner from "components/UI/spinner/Spinner";

class Auth extends Component {
  state = { email: "", password: "", isSignup: true };

  componentDidMount() {
    if (!this.props.isBuildingBurger && this.props.authRedirectPath !== "/") {
      this.props.onSetAuthRedirectPath();
    }
  }
  submitAuth = e => {
    e.preventDefault();
    this.props.onAuth(
      this.state.email,
      this.state.password,
      this.state.isSignup
    );
  };
  handleSwitchModeAuth = e => {
    e.preventDefault();
    this.setState(prevState => ({
      isSignup: !prevState.isSignup
    }));
  };

  render() {
    let error = null;
    if (this.props.error) {
      error = this.props.error;
    }
    let redirect = null;
    if (this.props.isAuthenticated) {
      redirect = <Redirect to={this.props.authRedirectPath} />;
    }
    let form = (
      <form>
        {redirect}
        <p>{error}</p>
        <input
          type="text"
          name="email"
          placeholder="your email"
          onChange={e => this.setState({ email: e.target.value })}
        />
        <input
          type="password"
          name="password"
          placeholder="your password"
          onChange={e => this.setState({ password: e.target.value })}
        />
        <Button clicked={this.submitAuth} btnType="success">
          Submit
        </Button>
        <br />
        <br />
        <Button clicked={this.handleSwitchModeAuth} btnType="danger">
          switch to {this.state.isSignup ? "SIGNIN" : "SIGNUP"} mode
        </Button>
      </form>
    );
    if (this.props.isLoading) {
      form = <Spinner />;
    }
    return <div className="auth">{form}</div>;
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.auth.isLoading,
    error: state.auth.error,
    isAuthenticated: state.auth.token != null,
    isBuildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => {
      dispatch(actions.auth(email, password, isSignup));
    },
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/"))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);

import React from "react";

import Summary from "components/UI/Modal/Summary";

const ErrorHandler = (WrappedComponent, axios) => {
  return class extends React.Component {
    state = { error: null };

    componentDidMount() {
      axios.interceptors.request.use(res => {
        this.setState({ error: null });
        return res;
      });
      axios.interceptors.response.use(
        res => res,
        error => {
          this.setState({ error: error });
        }
      );
    }

    errorConfirmed = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <>
          <Summary show={this.state.error} closeModal={this.errorConfirmed}>
            {this.state.error ? this.state.error.message : null}
          </Summary>
          <WrappedComponent {...this.props} />
        </>
      );
    }
  };
};
export default ErrorHandler;

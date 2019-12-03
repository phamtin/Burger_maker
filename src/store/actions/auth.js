import * as actionType from "./actionType";
import axios from "axios";

export const authStart = () => {
  return {
    type: actionType.AUTH_START
  };
};

export const authSuccess = authData => {
  return {
    type: actionType.AUTH_SUCCESS,
    authData: authData
  };
};

export const authFail = error => {
  return {
    type: actionType.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  localStorage.removeItem("userId");
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  return {
    type: actionType.AUTH_LOGOUT
  };
};

export const checkLogout = timeOut => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, timeOut * 1000);
  };
};

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBZ3Y4wGaaMpi8SlGPwTy21Z5mnf1rXRi4";
    if (!isSignup) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBZ3Y4wGaaMpi8SlGPwTy21Z5mnf1rXRi4";
    }
    axios
      .post(url, authData)
      .then(res => {
        const expirationDate = new Date(
          new Date().getTime() + res.data.expiresIn * 1000
        );
        localStorage.setItem("token", res.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", res.data.localId);
        dispatch(authSuccess(res.data));
      })
      .catch(e => {
        dispatch(authFail(e.response.data.error.message));
      });
  };
};

export const setAuthRedirectPath = path => {
  return {
    type: actionType.SET_AUTH_REDIRECT_PATH,
    path: path
  };
};

export const checkAuthState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate < new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem("userId");
        const authData = { idToken: token, localId: userId };
        dispatch(authSuccess(authData));
        dispatch(
          checkLogout((expirationDate.getTime() - new Date().getTime()) / 1000)
        );
      }
    }
  };
};

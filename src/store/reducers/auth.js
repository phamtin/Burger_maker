import * as actionType from "store/actions/actionType";

const initialState = {
  token: null,
  idUser: null,
  error: null,
  isLoading: false,
  authRedirectPath: "/"
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.AUTH_START:
      return {
        ...state,
        isLoading: true
      };
    case actionType.AUTH_SUCCESS:
      return {
        ...state,
        token: action.authData.idToken,
        idUser: action.authData.localId,
        error: null,
        isLoading: false
      };
    case actionType.AUTH_FAIL:
      return {
        ...state,
        error: action.error,
        isLoading: false
      };
    case actionType.AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        idUser: null
      };
    case actionType.SET_AUTH_REDIRECT_PATH:
      return {
        ...state,
        authRedirectPath: action.path
      };
    default:
      return state;
  }
};

export default authReducer;

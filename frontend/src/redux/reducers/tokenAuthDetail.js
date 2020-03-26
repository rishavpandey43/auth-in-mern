import * as ActionTypes from "../actions/actionTypes";

const initialState = {
  isLoading: false,
  isAuthenticated: localStorage.getItem("auth_practice_token") ? true : false,
  userId: null,
  errMessage: null,
  successMessage: null,
  token: null
};

const tokenAuthDetail = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_REQUEST_TOKEN:
      return {
        ...state,
        isLoading: true,
        isAuthenticated: false,
        errMessage: ""
      };
    case ActionTypes.LOGIN_SUCCESS_TOKEN:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        errMessage: "",
        successMessage: action.successMessage,
        token: action.token
      };
    case ActionTypes.LOGIN_FAILURE_TOKEN:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        errMessage: action.errMessage
      };
    case ActionTypes.LOGOUT_REQUEST_TOKEN:
      return {
        ...state,
        isLoading: true
      };
    case ActionTypes.LOGOUT_SUCCESS_TOKEN:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        errMessage: "",
        successMessage: action.successMessage
      };
    case ActionTypes.LOGOUT_FAILURE_TOKEN:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        errMessage: action.errMessage,
        successMessage: ""
      };
    default:
      return state;
  }
};

export default tokenAuthDetail;

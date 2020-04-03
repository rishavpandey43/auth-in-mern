import * as ActionTypes from "../actions/actionTypes";

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  errMessage: null,
  successMessage: null,
  userCredentials: null,
  user: null
};

const basicAuthDetail = (state = initialState, action) => {
  switch (action.type) {
    // case ActionTypes.RESET_LOGIN_STATE1:
    //   return {
    //     ...state,
    //     isLoading: false,
    //     isAuthenticated: false,
    //     errMessage: null,
    //     successMessage: null
    //   };
    case ActionTypes.LOGIN_REQUEST_BASIC:
      return {
        ...state,
        isLoading: true,
        isAuthenticated: false,
        errMessage: null,
        userCredentials: action.userCredentials,
        user: null,
        successMessage: null
      };
    case ActionTypes.LOGIN_SUCCESS_BASIC:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        errMessage: null,
        user: action.user,
        successMessage: action.successMessage
      };
    case ActionTypes.LOGIN_FAILURE_BASIC:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        errMessage: action.errMessage,
        user: null,
        successMessage: null
      };
    case ActionTypes.LOGOUT_REQUEST_BASIC:
      return {
        ...state,
        isLoading: true
      };
    case ActionTypes.LOGOUT_SUCCESS_BASIC:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        errMessage: null,
        user: null,
        successMessage: null
      };
    case ActionTypes.LOGOUT_FAILURE_BASIC:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};

export default basicAuthDetail;

import * as ActionTypes from "../actions/actionTypes";

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  errMessage: null,
  successMessage: null
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
    case ActionTypes.LOGIN_REQUEST1:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        errMessage: null,
        user: null,
        successMessage: null
      };
    case ActionTypes.LOGIN_SUCCESS1:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        errMessage: null,
        user: action.user,
        successMessage: action.successMessage
      };
    case ActionTypes.LOGIN_FAILURE1:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        errMessage: action.errMessage,
        user: null,
        successMessage: null
      };
    case ActionTypes.LOGOUT_REQUEST1:
      return {
        ...state,
        isLoading: true
      };
    case ActionTypes.LOGOUT_SUCCESS1:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        errMessage: null,
        user: null,
        successMessage: null
      };
    case ActionTypes.LOGOUT_FAILURE1:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};

export default basicAuthDetail;

import * as ActionTypes from "../actions/actionTypes";

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  errMessage: null
};

const basicAuthDetail = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        isAuthenticated: false,
        errMessage: null
      };
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        errMessage: null
      };
    case ActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        errMessage: action.errMessage
      };
    default:
      return state;
  }
};

export default basicAuthDetail;

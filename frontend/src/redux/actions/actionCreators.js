import axios from "axios";

import * as ActionTypes from "./actionTypes";

export const loginRequest1 = () => {
  return {
    type: ActionTypes.LOGIN_REQUEST1
  };
};

export const loginSuccess1 = response => {
  return {
    type: ActionTypes.LOGIN_SUCCESS1,
    user: response.user,
    successMessage: response.message
  };
};

export const loginFailure1 = response => {
  return {
    type: ActionTypes.LOGIN_FAILURE1,
    errMessage: response
  };
};

export const loginFetch1 = credentials => dispatch => {
  // dispatch the action
  dispatch(loginRequest1());

  // establish connection with server
  axios
    .post(
      process.env.REACT_APP_API_BASE_URL + "api/v1/users/login",
      JSON.stringify(credentials),
      {
        headers: { "Content-Type": "application/json" }
      }
    )
    .then(res => {
      dispatch(loginSuccess1(res.data));
    })
    .catch(err => {
      err.response
        ? dispatch(loginFailure1(err.response.data.message))
        : dispatch(
            loginFailure1(
              "Network Error, Connection to server couldn't be established. Please try again."
            )
          );
    });
};

export const logoutSuccess1 = () => {
  return {
    type: ActionTypes.LOGOUT_SUCCESS1
  };
};

export const logoutFetch1 = () => dispatch => {
  dispatch(logoutSuccess1());
};

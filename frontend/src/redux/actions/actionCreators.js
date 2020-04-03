import axios from "axios";

import * as ActionTypes from "./actionTypes";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

/* These helper actions are used for every other actions */

export const setUserDetail = response => {
  return {
    type: ActionTypes.SET_USER_DETAIL,
    user: response
  };
};

export const removeUserDetail = response => {
  return {
    type: ActionTypes.REMOVE_USER_DETAIL
  };
};

/* Below Actions are only for basic authentication, where browser doesn't remember any data. You need to send username, password for every request */

export const loginRequestBasic = response => {
  return {
    type: ActionTypes.LOGIN_REQUEST_BASIC,
    userCredentials: response
  };
};

export const loginSuccessBasic = response => {
  return {
    type: ActionTypes.LOGIN_SUCCESS_BASIC,
    successMessage: response.message
  };
};

export const loginFailureBasic = response => {
  return {
    type: ActionTypes.LOGIN_FAILURE_BASIC,
    errMessage: response.message
  };
};

export const loginFetchBasic = credentials => dispatch => {
  // dispatch the action
  dispatch(loginRequestBasic(credentials));

  // establish connection with server
  axios
    .post(baseUrl + "api/v1/users/login", JSON.stringify(credentials), {
      headers: { "Content-Type": "application/json" }
    })
    .then(response => {
      dispatch(loginSuccessBasic(response.data));
      dispatch(setUserDetail(response.data.user));
    })
    .catch(err => {
      err.response
        ? dispatch(loginFailureBasic(err.response.data))
        : dispatch(
            loginFailureBasic(
              "Network Error, Connection to server couldn't be established. Please try again."
            )
          );
    });
};

export const logoutSuccessBasic = () => {
  return {
    type: ActionTypes.LOGOUT_SUCCESS_BASIC
  };
};

export const logoutFetchBasic = () => dispatch => {
  dispatch(logoutSuccessBasic());
  dispatch(removeUserDetail());
};

/* Below Actions are only for token based authentication, where browser will remember necessary data in the form of cookie or local storage. */

export const loginRequestToken = () => {
  return {
    type: ActionTypes.LOGIN_REQUEST_TOKEN
  };
};

export const loginSuccessToken = response => {
  return {
    type: ActionTypes.LOGIN_SUCCESS_TOKEN,
    successMessage: response.message
  };
};

export const loginFailureToken = response => {
  return {
    type: ActionTypes.LOGIN_FAILURE_TOKEN,
    errMessage: response.message
  };
};

export const loginFetchToken = ({
  credentials,
  tokenStorageType
}) => dispatch => {
  const newCredentials = {
    email: credentials.email,
    password: credentials.password,
    storageType: tokenStorageType
  };
  // dispatch the action
  // dispatch(setLoginType("COOKIE"));
  dispatch(loginRequestToken());

  // establish connection with server
  axios
    .post(baseUrl + "api/v2/users/login", JSON.stringify(newCredentials), {
      headers: { "Content-Type": "application/json" },
      withCredentials: true
    })
    .then(response => {
      dispatch(loginSuccessToken(response.data));
      localStorage.setItem("auth_practice_token", response.data.token);
    })
    .catch(err => {
      err.response
        ? dispatch(loginFailureToken(err.response.data))
        : dispatch(
            loginFailureToken(
              "Network Error, Connection to server couldn't be established. Please try again."
            )
          );
    });
};

export const logoutRequestToken = () => {
  return {
    type: ActionTypes.LOGOUT_REQUEST_TOKEN
  };
};

export const logoutSuccessToken = response => {
  return {
    type: ActionTypes.LOGOUT_SUCCESS_TOKEN,
    successMessage: response.message
  };
};

export const logoutFailureToken = response => {
  return {
    type: ActionTypes.LOGOUT_FAILURE_TOKEN,
    errMessage: response.message
  };
};

export const logoutFetchToken = () => dispatch => {
  dispatch(logoutRequestToken());
  axios
    .get(baseUrl + "api/v2/users/logout", {
      headers: { "Content-Type": "application/json" },
      withCredentials: true
    })
    .then(response => {
      if (localStorage.getItem("auth_practice_token")) {
        localStorage.removeItem("auth_practice_token");
      }
      if (!localStorage.getItem("auth_practice_token")) {
        dispatch(logoutSuccessToken(response.data));
        dispatch(removeUserDetail());
      }
    })
    .catch(err => {
      dispatch(logoutFailureToken(err.response.data));
    });
};

/* Below Actions are only for session based authentication, where browser will remember necessary data in the form of cookie or local storage for persistent login. */

export const loginRequestSession = () => {
  return {
    type: ActionTypes.LOGIN_REQUEST_SESSION
  };
};

export const loginSuccessSession = response => {
  return {
    type: ActionTypes.LOGIN_SUCCESS_SESSION,
    successMessage: response.message
  };
};

export const loginFailureSession = response => {
  return {
    type: ActionTypes.LOGIN_FAILURE_SESSION,
    errMessage: response.message
  };
};

export const loginFetchSession = ({
  credentials,
  tokenStorageType
}) => dispatch => {
  const newCredentials = {
    email: credentials.email,
    password: credentials.password,
    storageType: tokenStorageType
  };
  // dispatch the action
  // dispatch(setLoginType("COOKIE"));
  dispatch(loginRequestSession());

  // establish connection with server
  axios
    .post(baseUrl + "api/v3/users/login", JSON.stringify(newCredentials), {
      headers: { "Content-Type": "application/json" },
      withCredentials: true
    })
    .then(response => {
      dispatch(loginSuccessSession(response.data));
      localStorage.setItem("auth_practice_session", "SESSION_ID");
    })
    .catch(err => {
      err.response
        ? dispatch(loginFailureSession(err.response.data))
        : dispatch(
            loginFailureSession(
              "Network Error, Connection to server couldn't be established. Please try again."
            )
          );
    });
};

export const logoutRequestSession = () => {
  return {
    type: ActionTypes.LOGOUT_REQUEST_SESSION
  };
};

export const logoutSuccessSession = response => {
  return {
    type: ActionTypes.LOGOUT_SUCCESS_SESSION,
    successMessage: response.message
  };
};

export const logoutFailureSession = response => {
  return {
    type: ActionTypes.LOGOUT_FAILURE_SESSION,
    errMessage: response.message
  };
};

export const logoutFetchSession = () => dispatch => {
  dispatch(logoutRequestSession());
  axios
    .get(baseUrl + "api/v3/users/logout", {
      headers: { "Content-Type": "application/json" },
      withCredentials: true
    })
    .then(response => {
      if (localStorage.getItem("auth_practice_session")) {
        localStorage.removeItem("auth_practice_session");
      }
      if (!localStorage.getItem("auth_practice_session")) {
        dispatch(logoutSuccessSession(response.data));
        dispatch(removeUserDetail());
      }
    })
    .catch(err => {
      dispatch(logoutFailureSession(err.response.data));
    });
};

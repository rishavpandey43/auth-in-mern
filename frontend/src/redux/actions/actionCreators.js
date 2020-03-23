import axios from "axios";

import * as ActionTypes from "./actionTypes";

/* Below Actions are only for basic authentication, where browser doesn't remember any data. You need to send username, password for every request */

// export const changeLoginType = response => {
//   return {
//     type: ActionTypes.CHANGE_LOGIN_TYPE,
//     loginType: response
//   };
// };

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const loginRequestBasic = response => {
  return {
    type: ActionTypes.LOGIN_REQUEST_BASIC,
    userCredentials: response
  };
};

export const loginSuccessBasic = response => {
  return {
    type: ActionTypes.LOGIN_SUCCESS_BASIC,
    user: response.user,
    successMessage: response.message
  };
};

export const loginFailureBasic = response => {
  return {
    type: ActionTypes.LOGIN_FAILURE_BASIC,
    errMessage: response
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
    .then(res => {
      dispatch(loginSuccessBasic(res.data));
    })
    .catch(err => {
      err.response
        ? dispatch(loginFailureBasic(err.response.data.message))
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
};

/* Below Actions are only for cookie based authentication, where browser will remember necessary data. */

export const loginRequestCookie = () => {
  return {
    type: ActionTypes.LOGIN_REQUEST_COOKIE
  };
};

export const loginSuccessCookie = response => {
  return {
    type: ActionTypes.LOGIN_SUCCESS_COOKIE,
    successMessage: response.message,
    token: response.token
  };
};

export const loginFailureCookie = response => {
  return {
    type: ActionTypes.LOGIN_FAILURE_COOKIE,
    errMessage: response
  };
};

export const validateCookieRequest = () => {
  return {
    type: ActionTypes.VALIDATE_COOKIE_REQUEST
  };
};

export const validateCookieSuccess = response => {
  return {
    type: ActionTypes.VALIDATE_COOKIE_SUCCESS,
    userId: response.userId
  };
};

export const validateCookieFailure = response => {
  return {
    type: ActionTypes.VALIDATE_COOKIE_FAILURE,
    errMessage: response
  };
};

export const loginFetchCookie = credentials => dispatch => {
  // dispatch the action
  dispatch(loginRequestCookie());

  // establish connection with server
  axios
    .post(baseUrl + "api/v2/users/login", JSON.stringify(credentials), {
      headers: { "Content-Type": "application/json" }
    })
    .then(res => {
      dispatch(loginSuccessCookie(res.data));
      document.cookie = `token = ${
        res.data.token
      }; path="/"; expires=${new Date(Date.now() + 90000)}`;
      dispatch(validateCookieFetch(document.cookie));
    })
    .catch(err => {
      err.response
        ? dispatch(loginFailureCookie(err.response.data.message))
        : dispatch(
            loginFailureCookie(
              "Network Error, Connection to server couldn't be established. Please try again."
            )
          );
    });
};

export const validateCookieFetch = token => dispatch => {
  dispatch(validateCookieRequest());

  axios
    .post(
      baseUrl + "api/v2/users/validate-cookie",
      JSON.stringify({ token: token.split("=")[1] }),
      {
        headers: { "Content-Type": "application/json" }
      }
    )
    .then(res => {
      dispatch(validateCookieSuccess(res.data));
    })
    .catch(err => {
      dispatch(validateCookieFailure(err.response.data.message));
    });
};

export const logoutRequestCookie = () => {
  return {
    type: ActionTypes.LOGIN_REQUEST_BASIC
  };
};

export const logoutSuccessCookie = () => {
  return {
    type: ActionTypes.LOGOUT_SUCCESS_BASIC
  };
};

export const logoutFailureCookie = response => {
  return {
    type: ActionTypes.LOGIN_FAILURE_BASIC,
    errMessage: response
  };
};

export const logoutFetchCookie = () => dispatch => {
  dispatch(logoutSuccessCookie());
};

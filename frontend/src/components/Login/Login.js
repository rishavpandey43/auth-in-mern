import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./login.css";

import Loading from "../Loading/Loading";

const Login = props => {
  useEffect(() => {
    const isAuthenticated =
      props.basicAuthDetail.isAuthenticated ||
      props.cookieAuthDetail.isAuthenticated ||
      props.sessionAuthDetail.isAuthenticated ||
      props.tokenAuthDetail.isAuthenticated;
    if (isAuthenticated) {
      props.history.push("/");
    }
  }, [
    props.basicAuthDetail.isAuthenticated,
    props.cookieAuthDetail.isAuthenticated,
    props.sessionAuthDetail.isAuthenticated,
    props.tokenAuthDetail.isAuthenticated
  ]);
  useEffect(() => {
    setAlertMessage({
      successMessage: props.basicAuthDetail.successMessage,
      errMessage: props.basicAuthDetail.errMessage
    });
  }, [props.basicAuthDetail.successMessage, props.basicAuthDetail.errMessage]);

  const [state, setState] = useState({
    credentials: {
      email: "",
      password: ""
    },
    rememberUser: false,
    tokenStorageType: 1, // here 0 represents cookie and 1 represents local storage
    sessionStorageType: 0 // here 0 represents cookie and 1 represents local storage
  });

  const [alertMessage, setAlertMessage] = useState({
    successMessage: props.basicAuthDetail.successMessage,
    errMessage: props.basicAuthDetail.errMessage
  });

  const handleInputChange = e => {
    const value = e.target.value;
    let tempTarget = state.credentials;
    tempTarget[e.target.name] = value;
    setState({ ...state, credentials: tempTarget });
  };

  const handleSubmit = (type, e) => {
    e.preventDefault();
    const credentials = { ...state.credentials };
    if (type === "BASIC") {
      props.loginFetchBasic(credentials);
    }
    if (type === "TOKEN") {
      props.loginFetchToken({
        credentials,
        tokenStorageType: state.tokenStorageType
      });
    }
    if (type === "SESSION") {
      // props.loginFetchCookie({credentials, sessionStorageType: state.sessionStorageType});
    }
  };

  return (
    <div className="login-signup-wrapper">
      <div className="container">
        <div className="main-wrapper">
          <div className="wrapper">
            <div className="card col-12 col-sm-6 m-auto">
              <div className="card-head">
                <h3>Welcome Back</h3>
              </div>
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="johndoe@demo.com"
                      required
                      name="email"
                      value={state.credentials.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      required
                      name="password"
                      value={state.credentials.password}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      name="rememberUser"
                      checked={state.rememberUser ? true : false}
                      onChange={() =>
                        setState({
                          ...state,
                          rememberUser: state.rememberUser ? false : true
                        })
                      }
                    />
                    <label
                      className="custom-control-label"
                      onClick={() =>
                        setState({
                          ...state,
                          rememberUser: state.rememberUser ? false : true
                        })
                      }
                    >
                      Remember me (This will not work with default login)
                    </label>
                  </div>
                  <small className="form-text text-muted mb-4">
                    Not having a account,
                    <Link to="/signup" style={{ color: "blue" }}>
                      Sign up
                    </Link>
                  </small>
                  <div className="btn-main-wrapper">
                    <div className="btn-wrapper">
                      <button
                        type="submit"
                        className="btn mb-3 mt-1 btn-primary"
                        onClick={handleSubmit.bind(null, "BASIC")}
                      >
                        Default Login (Browser will not store login information)
                      </button>
                      <Loading isTrue={props.basicAuthDetail.isLoading} />
                    </div>
                  </div>
                  <div className="btn-main-wrapper">
                    <div className="custom-control custom-radio custom-control-inline">
                      <input
                        type="radio"
                        name="tokenBased"
                        className="custom-control-input"
                        checked={state.tokenStorageType === 0 ? true : false}
                        onChange={() =>
                          setState({ ...state, tokenStorageType: 0 })
                        }
                      />
                      <label
                        className="custom-control-label"
                        onClick={() =>
                          setState({ ...state, tokenStorageType: 0 })
                        }
                      >
                        Using Cookie
                      </label>
                    </div>
                    <div className="custom-control custom-radio custom-control-inline">
                      <input
                        type="radio"
                        name="tokenBased"
                        className="custom-control-input"
                        checked={state.tokenStorageType === 1 ? true : false}
                        onChange={e =>
                          setState({ ...state, tokenStorageType: 1 })
                        }
                      />
                      <label
                        className="custom-control-label"
                        onClick={() =>
                          setState({ ...state, tokenStorageType: 1 })
                        }
                      >
                        Using Local Storage
                      </label>
                    </div>
                    <div className="btn-wrapper">
                      <button
                        type="submit"
                        className="btn mb-3 mt-1 btn-primary"
                        onClick={handleSubmit.bind(null, "TOKEN")}
                      >
                        Token Based Authentication
                      </button>
                      <Loading isTrue={props.tokenAuthDetail.isLoading} />
                    </div>
                  </div>

                  <div className="btn-main-wrapper">
                    <div className="custom-control custom-radio custom-control-inline">
                      <input
                        type="radio"
                        name="sessionBased"
                        className="custom-control-input"
                        checked={state.sessionStorageType === 0 ? true : false}
                        onChange={e =>
                          setState({ ...state, sessionStorageType: 0 })
                        }
                      />
                      <label
                        className="custom-control-label"
                        onClick={() =>
                          setState({ ...state, sessionStorageType: 0 })
                        }
                      >
                        Using Cookie
                      </label>
                    </div>
                    <div className="custom-control custom-radio custom-control-inline">
                      <input
                        type="radio"
                        name="sessionBased"
                        className="custom-control-input"
                        checked={state.sessionStorageType === 1 ? true : false}
                        onChange={e =>
                          setState({ ...state, sessionStorageType: 1 })
                        }
                      />
                      <label
                        className="custom-control-label"
                        onClick={() =>
                          setState({ ...state, sessionStorageType: 1 })
                        }
                      >
                        Using Local Storage
                      </label>
                    </div>
                    <div className="btn-wrapper">
                      <button
                        type="submit"
                        className="btn mb-3 mt-1 btn-primary"
                        onClick={handleSubmit.bind(null, "SESSION")}
                      >
                        Session Based Authentication
                      </button>
                      <Loading isTrue={props.sessionAuthDetail.isLoading} />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;

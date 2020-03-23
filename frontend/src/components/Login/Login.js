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
      axios.get();
      props.history.push("/profile/" + props.basicAuthDetail.user.username);
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
    userDetail: {
      email: "",
      password: ""
    }
  });

  const [alertMessage, setAlertMessage] = useState({
    successMessage: props.basicAuthDetail.successMessage,
    errMessage: props.basicAuthDetail.errMessage
  });

  const handleInputChange = e => {
    const value = e.target.value;
    let tempTarget = state.userDetail;
    tempTarget[e.target.name] = value;
    setState({ ...state, userDetail: tempTarget });
  };

  const handleSubmit = (type, e) => {
    e.preventDefault();
    const userDetail = { ...state.userDetail };
    if (type === "BASIC") {
      props.loginFetchBasic(userDetail);
    }
    if (type === "COOKIE") {
      props.loginFetchCookie(userDetail);
    }
  };

  const isLoading =
    props.basicAuthDetail.isLoading ||
    props.cookieAuthDetail.isLoading ||
    props.sessionAuthDetail.isLoading ||
    props.tokenAuthDetail.isLoading;

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
                      value={state.userDetail.email}
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
                      value={state.userDetail.password}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group form-check">
                    <label className="form-check-label">
                      <input type="checkbox" className="form-check-input" />
                      Remember me
                    </label>
                  </div>
                  <small className="form-text text-muted mb-4">
                    Not having a account,
                    <Link to="/signup" style={{ color: "blue" }}>
                      Sign up
                    </Link>
                  </small>
                  <button
                    type="submit"
                    className="btn m-2 btn-primary"
                    onClick={handleSubmit.bind(null, "BASIC")}
                  >
                    Default Login (Browser will not store login information)
                  </button>
                  <br />
                  <button
                    type="submit"
                    className="btn m-2 btn-primary"
                    onClick={handleSubmit.bind(null, "COOKIE")}
                  >
                    Login with Cookie and JWT
                  </button>
                  <br />
                  <button
                    type="submit"
                    className="btn m-2 btn-primary"
                    onClick={handleSubmit}
                  >
                    Login with Session
                  </button>
                  <Loading isTrue={isLoading} />
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

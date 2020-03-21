import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./login.css";

import Loading from "../Loading/Loading";

const Login = props => {
  const [state, setState] = useState({
    userDetail: {
      email: "",
      password: ""
    }
  });

  const handleInputChange = e => {
    const value = e.target.value;
    let tempTarget = state.userDetail;
    tempTarget[e.target.name] = value;
    setState({ ...state, userDetail: tempTarget });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const userDetail = { ...state.userDetail };
    props.loginFetch(userDetail);
  };

  const isLoading =
    props.basicAuthDetail.isLoading ||
    props.cookieAuthDetail.isLoading ||
    props.sessionAuthDetail.isLoading ||
    props.tokenAuthDetail.isLoading;

  const errMessage =
    props.basicAuthDetail.errMessage ||
    props.cookieAuthDetail.errMessage ||
    props.sessionAuthDetail.errMessage ||
    props.tokenAuthDetail.errMessage;

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
                <form onSubmit={handleSubmit}>
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
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                  <Loading isTrue={isLoading} />
                  <div>
                    {errMessage ? (
                      <span className="text-danger">{errMessage}</span>
                    ) : (
                      ""
                    )}
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

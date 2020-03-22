import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./signup.css";

import Loading from "../Loading/Loading";

const Signup = props => {
  const [state, setState] = useState({
    userDetail: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      rePassword: ""
    },
    isLoading: false,
    responseData: {
      status: null,
      statusText: null,
      data: {}
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
    let isEmpty = true;
    for (const key in state.userDetail) {
      if (state.userDetail[key] === "") {
        isEmpty = true;
        break;
      } else isEmpty = false;
    }
    if (!isEmpty) {
      setState({ ...state, isLoading: true, responseData: {} });
      // CHECK VALIDATION OF USER DETAILS
      const newUser = JSON.stringify({ ...state.userDetail });
      if (/\s/g.test(newUser.username)) {
        let responseData = {
          status: 422,
          statusText: "Validation Error",
          data: {
            message:
              "username consist of whitespace, please avoid whitespace to continue."
          }
        };
        setState({
          ...state,
          isLoading: false,
          responseData
        });
        return;
      }
      if (state.userDetail.password !== state.userDetail.rePassword) {
        let responseData = {
          status: 422,
          statusText: "Validation Error",
          data: {
            message: "Both password should be same"
          }
        };
        setState({
          ...state,
          isLoading: false,
          responseData
        });
        return;
      }
      if (state.userDetail.password.length < 8) {
        let responseData = {
          status: 422,
          statusText: "Validation Error",
          data: {
            message: "password length should be greater than or equal to 8"
          }
        };
        setState({
          ...state,
          isLoading: false,
          responseData
        });
        return;
      }
      axios
        .post(
          process.env.REACT_APP_API_BASE_URL + "api/v1/users/signup",
          newUser,
          {
            headers: { "Content-Type": "application/json" }
          }
        )
        .then(res => {
          console.log(res.data);
          let responseData = {
            status: res.status,
            statusText: res.statusText,
            data: res.data
          };
          setState({
            ...state,
            isLoading: false,
            responseData,
            userDetail: {
              username: "",
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              rePassword: ""
            }
          });
          if (responseData.status) {
            setTimeout(() => {
              props.history.push("/login");
            }, 1000);
          }
        })
        .catch(err => {
          let responseData = {
            status: 500,
            data: {
              statusText: "Internal Server Error",
              message: "Internal Server Error, please try again."
            }
          };
          if (err.response) {
            responseData = {
              status: err.response.status,
              statusText: err.response.statusText,
              data: err.response.data
            };
          }
          setState({
            ...state,
            isLoading: false,
            responseData
          });
        });
    } else alert("Please fill all the details first to signup");
  };
  return (
    <div className="login-signup-wrapper">
      <div className="container">
        <div className="main-wrapper">
          <div className="wrapper">
            <div className="card col-12 col-sm-6 m-auto">
              <div className="card-head">
                <h3>Create your account now</h3>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-12 col-sm-6">
                      <div className="form-group">
                        <label>First name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="John"
                          required
                          name="firstName"
                          value={state.userDetail.firstName}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="form-group">
                        <label>Last name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Doe"
                          required
                          name="lastName"
                          value={state.userDetail.lastName}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-sm-6">
                      <div className="form-group">
                        <label>User Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="johndoe"
                          required
                          name="username"
                          value={state.userDetail.username}
                          onChange={handleInputChange}
                        />
                        <small className="form-text text-muted">
                          your username should be unique
                        </small>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="form-group">
                        <label>Email address</label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="johndoe@demo.com"
                          required
                          name="email"
                          value={state.userDetail.email}
                          onChange={handleInputChange}
                        />
                        <small className="form-text text-muted">
                          We'll never share your email with anyone else.
                        </small>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-sm-6">
                      <div className="form-group">
                        <label>Choose a strong Password</label>
                        <input
                          type="password"
                          className="form-control"
                          required
                          name="password"
                          value={state.userDetail.password}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="form-group">
                        <label>Confirm your Password</label>
                        <input
                          type="password"
                          className="form-control"
                          required
                          name="rePassword"
                          value={state.userDetail.rePassword}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  <small className="form-text text-muted mb-4">
                    Already have a account,
                    <Link to="/login" style={{ color: "blue" }}>
                      Sign in
                    </Link>
                  </small>
                  <button type="submit" className="btn btn-primary">
                    Sign Up
                  </button>
                  <Loading isTrue={state.isLoading} />
                  <div>
                    {state.responseData.status ? (
                      state.responseData.status === 200 ? (
                        <span className="text-success">
                          {state.responseData.data.message}
                        </span>
                      ) : (
                        <span className="text-danger">
                          {state.responseData.data.message}
                        </span>
                      )
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

export default Signup;

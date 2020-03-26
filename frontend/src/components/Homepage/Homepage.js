import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./homepage.css";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const HomePage = props => {
  useEffect(() => {
    const isAuthenticated =
      props.basicAuthDetail.isAuthenticated ||
      props.sessionAuthDetail.isAuthenticated ||
      props.tokenAuthDetail.isAuthenticated;
    if (isAuthenticated) {
      if (props.userDetail) {
        props.history.push(`/profile/${props.userDetail.username}`);
      } else if (!props.userDetail) {
        axios
          .get(baseUrl + "api/v2/users/get-username", {
            withCredentials: true,
            headers: { "Content-Type": "application/json" }
          })
          .then(res => {
            props.history.push(`/profile/${res.data.user.username}`);
          })
          .catch(err => console.log(err));
      }
    }
  }, []);

  return (
    <div className="container">
      <div className="col-12 col-sm-6 m-auto">
        <h1>Click below to start</h1>
        <Link to="/signup">
          <button className="btn btn-primary m-2">Signup</button>
        </Link>
        <Link to="/login">
          <button className="btn btn-primary m-2">Login</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;

import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import "./homepage.css";

const HomePage = props => {
  useEffect(() => {
    if (props.basicAuthDetail.isAuthenticated) {
      props.history.push("/profile/" + props.basicAuthDetail.user.username);
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

import React from "react";
import { Link } from "react-router-dom";

const Header = props => {
  const handleSubmit = (type, e) => {
    if (type === "BASIC") {
      props.logoutFetchBasic();
    }
    if (type === "TOKEN") {
      props.logoutFetchToken();
    }
    if (type === "SESSION") {
      props.logoutFetchSession();
    }
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <div>
          <Link to="/">
            <span className="navbar-brand mb-0 h1">Auth Demo</span>
          </Link>
        </div>
        <div>
          <ul className="navbar-nav mr-auto">
            {props.basicAuthDetail.isAuthenticated ? (
              <li className="nav-item active">
                <span
                  onClick={handleSubmit.bind(null, "BASIC")}
                  className="btn"
                >
                  Logout
                </span>
              </li>
            ) : (
              ""
            )}
            {props.tokenAuthDetail.isAuthenticated ? (
              <li className="nav-item active">
                <span
                  onClick={handleSubmit.bind(null, "TOKEN")}
                  className="btn"
                >
                  Logout
                </span>
              </li>
            ) : (
              ""
            )}
            {props.sessionAuthDetail.isAuthenticated ? (
              <li className="nav-item active">
                <span
                  onClick={handleSubmit.bind(null, "SESSION")}
                  className="btn"
                >
                  Logout
                </span>
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;

import React from "react";
import { Link } from "react-router-dom";

const Header = props => {
  const isAuthenticated =
    props.basicAuthDetail.isAuthenticated ||
    props.cookieAuthDetail.isAuthenticated ||
    props.sessionAuthDetail.isAuthenticated ||
    props.tokenAuthDetail.isAuthenticated;

  const handleSubmit = (type, e) => {
    if (document.cookie.split("=")[1]) {
      props.logoutFetchCookie();
    }
    props.logoutFetchToken();

    // if (type === "COOKIE") {
    //   props.loginFetchCookie(userDetail);
    // }
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
            {isAuthenticated ? (
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
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;

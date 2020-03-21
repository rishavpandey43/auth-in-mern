import React from "react";
import { Link } from "react-router-dom";

const Header = props => {
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
            <li className="nav-item active">
              <span>Logout</span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;

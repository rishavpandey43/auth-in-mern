import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated =
    rest.basicAuthDetail.isAuthenticated ||
    rest.sessionAuthDetail.isAuthenticated ||
    rest.tokenAuthDetail.isAuthenticated;
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? <Component {...rest} /> : <Redirect to="/" />
      }
    />
  );
};

export default PrivateRoute;

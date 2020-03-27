/* This router aims to do authentication(signup and login) using basic authentication */

// import the required dependencies
const express = require("express");

// import cors for proper cross origin request
const cors = require("../utils/cors");
const { verifyUserToken } = require("../utils/tokenAuth");

// import controllers
const signupController = require("../controllers/v2/signup");
const loginController = require("../controllers/v2/login");
const getUsernameController = require("../controllers/v2/getUsername");
const userDetailController = require("../controllers/v2/userDetail");
const logoutController = require("../controllers/v2/logout");

const userRouterV2 = express.Router();

// Enabling CORS Pre-Flight
userRouterV2.options("*", cors.corsWithOptions, res => {
  res.sendStatus(200);
});

userRouterV2
  .post("/signup", cors.corsWithOptions, signupController)
  .post("/login", cors.corsWithOptions, loginController)
  .get(
    "/get-username",
    cors.corsWithOptions,
    verifyUserToken,
    getUsernameController
  )
  .get(
    "/user-detail",
    cors.corsWithOptions,
    verifyUserToken,
    userDetailController
  )
  .get("/logout", cors.corsWithOptions, verifyUserToken, logoutController);

module.exports = userRouterV2;

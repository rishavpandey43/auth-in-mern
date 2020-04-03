/* This router aims to do authentication(signup and login) using basic authentication */

// import the required dependencies
const express = require("express");

// import cors for proper cross origin request
const cors = require("../utils/cors");
const { verifyUser } = require("../utils/sessionAuth");

// import controllers
const signupController = require("../controllers/v3/signup.controller");
const loginController = require("../controllers/v3/login.controller");
const getUsernameController = require("../controllers/v3/getUsername.controller");
const userDetailController = require("../controllers/v3/userDetail.controller");
const logoutController = require("../controllers/v3/logout.controller");

const userRouterV2 = express.Router();

// Enabling CORS Pre-Flight
userRouterV2.options("*", cors.corsWithOptions, res => {
  res.sendStatus(200);
});

userRouterV2
  .post("/signup", cors.corsWithOptions, signupController)
  .post("/login", cors.corsWithOptions, loginController)
  .get("/get-username", cors.corsWithOptions, verifyUser, getUsernameController)
  .get("/user-detail", cors.corsWithOptions, verifyUser, userDetailController)
  .get("/logout", cors.corsWithOptions, logoutController);

module.exports = userRouterV2;
